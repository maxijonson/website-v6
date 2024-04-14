import type { FilteredResponseQueryOptions } from "next-sanity";
import { client } from "./client";

export interface SanityQueryOrder {
  field: string;
  direction?: "asc" | "desc";
}

export type SanityField =
  | "_id"
  | "_type"
  | "_createdAt"
  | "_updatedAt"
  | "_ref"
  | "_rev"
  | "_weak"
  | (string & NonNullable<unknown>);

class SanityQuery<TDoc extends Record<string, any> = Record<string, any>> {
  private filters: string[] = [];
  private amount: number | null = null;
  private offset: number | null = null;
  private orders: SanityQueryOrder[] = [
    { field: "_createdAt", direction: "desc" },
  ];
  private projections: string[] = [];

  constructor(private target = "*") {}

  /**
   * Adds one or more query filters to the query.
   * Each filter is joined with OR.
   * For AND, chain multiple where calls.
   *
   * **🔗 Can be chained:** Calling this method multiple times will add another filter (with an AND operator (&&))
   *
   * @param filters the filters to join with OR. For AND, chain multiple where calls.
   * @example
   * ```
   * // _type == "author" && (slug.current == "tristan-chin" || slug.current == "maxijonson")
   * query
   *    .where(`_type == "author"`)
   *    .where(`slug.current == "tristan-chin"`, `slug.current == "maxijonson"`)
   * ```
   */
  public where(...filters: string[]) {
    this.filters.push(`(${filters.join(" || ")})`);
    return this;
  }

  public getGroqFilter() {
    return ["[", this.filters.map((f) => `\t${f}`).join(" &&\n"), "]"].join(
      "\n",
    );
  }

  /**
   * Sets the offset of the results to return from the query.
   *
   * **⚠ Cannot be chained:** Calling this method multiple times will overwrite the previous offset.
   *
   * @param offset the offset of the results to return
   */
  public from(offset: number) {
    this.offset = offset;
    return this;
  }

  /**
   * Sets the maximum number of results to return from the query.
   *
   * **⚠ Cannot be chained:** Calling this method multiple times will overwrite the previous limit.
   *
   * @param amount the maximum number of results to return
   */
  public limit(amount: number) {
    this.amount = amount;
    return this;
  }

  /**
   * Shorthand for `offset` and `limit` methods to set both the offset and amount of the query.
   *
   * **⚠ Cannot be chained:** Calling this method multiple times will overwrite the previous offset and limit.
   *
   * @param offset the offset of the results to return
   * @param amount the maximum number of results to return
   */
  public slice(offset: number, amount: number) {
    this.offset = offset;
    this.amount = amount;
    return this;
  }

  public getGroqSlice() {
    if (this.amount !== null && this.offset !== null) {
      return `[${this.offset}...${this.offset + this.amount}]`;
    }
    if (this.amount !== null) {
      return `[0...${this.amount}]`;
    }
    if (this.offset !== null) {
      return `[${this.offset}...999999]`;
    }
    return "";
  }

  /**
   * Orders the results of the query by one or more fields.
   *
   * **Note:** The default order is by `_createdAt` in descending order.
   * If you don't want this, call this method with no arguments.
   *
   * **⚠ Cannot be chained:** Calling this method multiple times will overwrite the previous order.
   *
   * @param orders the fields and directions to order by
   * @example
   * ```
   * // order by name ascending, then by age descending. Order the results by _createdAt after offset and limit.
   * query
   *    .limit(10)
   *    .orderBy(["name"], ["age", "desc"], ["_createdAt", "desc", true])
   * ```
   */
  public orderBy(
    ...orders: (
      | [SanityQueryOrder["field"], SanityQueryOrder["direction"]?]
      | string
    )[]
  ) {
    this.orders = orders.map((order) => {
      const [field, direction = "asc", afterSlice = false] =
        typeof order === "string" ? [order] : order;
      return {
        field,
        direction,
        afterSlice,
      };
    });
    return this;
  }

  public getGroqOrder() {
    if (this.orders.length === 0) {
      return "";
    }
    return [
      " | order(",
      this.orders
        .map(({ field, direction }) => `\t${field} ${direction}`)
        .join(",\n"),
      ")",
    ].join("\n");
  }

  /**
   * Projects the results of the query to only return the specified fields.
   *
   * **Note:** You should only use this method if:
   * - You want to pick a specific set of fields without any transformations. (e.g. `.pick("name", "age")`)
   * - There isn't already a helper method that does what you want. Check out the other methods in this class.
   *   - `alias`: Rename a field in the result
   *   - `pickAll`: Pick all fields
   *
   * **🔗 Can be chained:** Calling this method multiple times will add more projections
   *
   * @param fields the fields to project
   * @example
   * ```
   * // only return the name and age fields
   * query.pick("name", "age")
   * ```
   */
  public pick(...fields: SanityField[]) {
    this.projections.push(...fields);
    return this;
  }

  /**
   * Helper for the `pick` method to rename a field in the result.
   *
   * **🔗 Can be chained:** Calling this method multiple times will add more projections
   *
   * @param alias The alias to rename the field to in the result
   * @param fieldOrValue The value of the alias. Can be a field name or any arbitrary value (like a subquery)
   */
  public alias(alias: string, fieldOrValue: SanityField) {
    return this.pick(`'${alias}': ${fieldOrValue}`);
  }

  /**
   * Helper for the `pick` method to define multiple possible values when one of them is null.
   *
   * **🔗 Can be chained:** Calling this method multiple times will add more projections
   *
   * @param alias The alias to rename the field to in the result
   * @param fieldOrValues The fields or values to coalesce
   */
  public coalesce(alias: string, ...fieldOrValues: SanityField[]) {
    return this.alias(alias, `coalesce(${fieldOrValues.join(", ")})`);
  }

  /**
   * Helper for the `pick` method to retrieve an image field with metadata.
   *
   * **🔗 Can be chained:** Calling this method multiple times will add more projections
   *
   * @param name the name of the image field
   */
  public pickImage(
    name: string,
    options: {
      metadata?: ("palette" | "lqip" | "blurHash" | "dimensions")[];
    } = {},
  ) {
    const { metadata: _m = [] } = options;
    const metadata = Array.from(new Set(_m));
    return this.pick(
      [
        `${name} {`,
        "...,",
        metadata?.length && [
          `'metadata': {`,
          metadata.map((m) => `"${m}": asset->metadata.${m}`).join(","),
          "}",
        ],
        "}",
      ]
        .flat()
        .filter((s) => typeof s === "string" && !!s)
        .join(" "),
    );
  }

  public getGroqProjections() {
    if (this.projections.length === 0) {
      return "";
    }
    return ["{", this.projections.map((p) => `\t${p}`).join(",\n"), "}"].join(
      "\n",
    );
  }

  public toGroq() {
    return [
      this.target,
      this.getGroqFilter(),
      this.getGroqProjections(),
      this.getGroqOrder(),
      this.getGroqSlice(),
    ].join("\n");
  }

  public async get<TResult extends TDoc[] = TDoc[]>(
    params: Record<string, any> = {},
    options: FilteredResponseQueryOptions = {},
  ) {
    return client.fetch<TResult>(this.toGroq(), params, options);
  }

  public toGroqCount() {
    const body = [this.getGroqFilter()].map((s) => s.split("\n").join("\n\t"));
    return ["count(", `\t${this.target}`, ...body, ")"].join("\n");
  }

  public async count(): Promise<number> {
    return client.fetch(this.toGroqCount());
  }

  /**
   * Chains another query to the current query.
   *
   * **⚠ Calling this method will return the subsequent query instance.
   * The next chained methods will be applied on the subsequent query, not the one prior to this call.**
   */
  public then<TSubdoc extends Record<string, any> = TDoc>() {
    return new SanityQuery<TSubdoc>(this.toGroq());
  }
}

export default SanityQuery;
