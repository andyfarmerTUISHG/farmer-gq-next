import { CustomPortableText } from "@/app/(site)/components/global/custom-portable-text";

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
              <li key={author.name}>
                <a href={`/person/${author.slug}`}>
                  <span>{author.name}</span>
                </a>
              </li>
            ))}
        </ul>
        {bodycopy && (
          <>
            <CustomPortableText
              id={data?._id || null}
              type={data?._type || null}
              path={["bodycopy"]}
              paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
              // value={bodycopy as unknown as PortableTextBlock[]}
              value={bodycopy}
            />
          </>
        )}
      </div>
    </main>
  );
}
