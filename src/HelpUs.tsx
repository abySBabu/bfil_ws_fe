import React, { useEffect, useState } from "react";

const HelpUs: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    fetch(`${window.location.origin}/bfilreactdev/helpus.html`)
    .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load HelpUs page");
        }
        return response.text();
      })
      .then((data) => setHtmlContent(data))
      .catch((error) => setHtmlContent("Error loading page"));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HelpUs;
