// Then we give our schema to the builder and provide the result to Sanity
import article from "./articles";
import person from "./person";
import profile from "./profile";
import settings from "./singleton/settings";
import tags from "./tags";

export default [
  article,
  tags,
  person,
  profile,
	settings
];
