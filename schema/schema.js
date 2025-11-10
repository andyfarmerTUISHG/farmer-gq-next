// Then we give our schema to the builder and provide the result to Sanity
import article from "./articles";
import book from "./book";
import chapter from "./chapter";
import person from "./person";
import profile from "./profile";
import quote from "./quote";
import settings from "./singleton/settings";
import tags from "./tags";

export default [article, book, chapter, quote, tags, person, profile, settings];
