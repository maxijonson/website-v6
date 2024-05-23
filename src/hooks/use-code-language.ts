import { useState, useEffect } from "react";
import { hasLanguage, registerLanguage } from "react-refractor";
import type { Syntax } from "refractor";

export const useCodeLanguage = (language: string = "text") => {
  const [finalLanguage, setFinalLanguage] = useState(
    hasLanguage(language) ? language : "text",
  );

  useEffect(() => {
    if (language === "text" || hasLanguage(language)) {
      if (language !== finalLanguage) {
        setFinalLanguage(language);
      }
      return;
    }

    (async () => {
      try {
        let syntax: Syntax | null = null;
        switch (language) {
          case "tsx":
            const { default: tsx } = await import("refractor/lang/tsx");
            syntax = tsx;
            break;
          case "typescript":
            const { default: typescript } = await import(
              "refractor/lang/typescript"
            );
            syntax = typescript;
            break;
          case "sh":
            const { default: shell } = await import(
              "refractor/lang/shell-session"
            );
            syntax = shell;
            break;
          case "json":
            const { default: json } = await import("refractor/lang/json");
            syntax = json;
            break;
        }
        if (syntax) {
          registerLanguage(syntax);
          setFinalLanguage(language);
        } else {
          console.error("[CodeSnippet] Language not supported:", language);
        }
      } catch (error) {
        console.error("[CodeSnippet] Failed to load language:", language);
        console.error(error);
      }
    })();
  }, [finalLanguage, language]);

  return finalLanguage;
};
