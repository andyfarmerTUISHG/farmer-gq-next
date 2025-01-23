import { PortableText } from "@portabletext/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const serializers = {
  types: {
    code: (props) => (
      <div className="my-2">
        <SyntaxHighlighter
          // language={language}
          style={nightOwl}
          showLineNumbers={true}
          customStyle={{
            width: "80%",
            margin: "0 auto",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          {props.value?.code}
        </SyntaxHighlighter>
      </div>
    ),
  },
};

export default function ArticlePage({ data }) {
  // Default to an empty object to allow previews on non-existent documents
  const { name, slug, createddate, bodycopy, author } = data ?? {};

  return (
    <div className={slug}>
      <h1>{name}</h1>
      <p>{createddate}</p>
      <p>Author: {author}</p>
      <PortableText value={bodycopy} components={serializers} />
    </div>
  );
}
