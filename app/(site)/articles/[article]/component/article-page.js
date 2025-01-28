import { PortableText } from "@portabletext/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { urlForImage } from "@/sanity/lib/image";

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
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="relative w-full h-auto my-4">
          <img
            src={urlForImage(value)}
            alt={value.alt || " "}
            className="rounded-lg"
            loading="lazy"
          />
          
          {value.caption && (
            <div className="mt-2 text-sm text-gray-500 italic">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
};

export default function ArticlePage({ data }) {
  // Default to an empty object to allow previews on non-existent documents

  const { name, slug, createddate, bodycopy, authors } = data ?? {};

  return (
    <main className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
      <div className={slug}>
        <h1>{name}</h1>
        <p>{createddate}</p>
        <ul>
          {authors &&
            authors.map((author) => (
              <li key={author._id}>
                <a href={`/person/${author.slug}`}>
                  <span>{author.name}</span>
                </a>
              </li>
            ))}
        </ul>
        {/* <p>Author: {author}</p> */}
        <PortableText value={bodycopy} components={serializers} />
      </div>
    </main>
  );
}
