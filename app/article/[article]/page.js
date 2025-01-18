import { PortableText } from "@portabletext/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { getSingleArticle } from "@/sanity/queries";

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
export default async function Article({ params }) {
  const slug = params.article;

  const article = await getSingleArticle(slug);
  const { name, bodycopy } = article;

  return (
    <div>
      <h1>{name}</h1>

      <PortableText value={bodycopy} components={serializers} />
    </div>
  );
}
