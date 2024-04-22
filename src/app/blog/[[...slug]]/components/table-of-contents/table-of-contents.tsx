import type { getPostHeadings } from "@/utils/getPostHeadings";
import TableOfContentsEntry from "./table-of-contents-entry";

export interface BlogPostTOCProps {
  headings: ReturnType<typeof getPostHeadings>;
}

const TableOfContents = ({ headings }: BlogPostTOCProps) => {
  return (
    <nav>
      <ul className="group flex flex-col gap-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <TableOfContentsEntry {...heading} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
