import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

const SEO = ({ title, description, schema }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    let scriptTag = document.getElementById("json-ld-schema") as HTMLScriptElement;
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.innerHTML = JSON.stringify(schema);
    } else if (scriptTag) {
      document.head.removeChild(scriptTag);
    }

    return () => {
      // Basic cleanup if needed
    };
  }, [title, description, schema]);

  return null;
};

export default SEO;
