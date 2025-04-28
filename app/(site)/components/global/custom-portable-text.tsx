import type { PathSegment } from "@sanity/client/csm";
import {
  PortableText,
  type PortableTextBlock,
  PortableTextComponents,
} from "next-sanity";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { Image } from "sanity";

import ImageBox from "../image-box";
export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  id: string | null;
  type: string | null;
  path: PathSegment[];
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
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

  return <PortableText components={components} value={value} />;
}
