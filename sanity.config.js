/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId, studioUrl, title } from "@/sanity/lib/api";

import { pageStructure, singletonPlugin } from "./sanity/plugin/settings";
import article from "./schema/articles";
import person from "./schema/person";
import profile from "./schema/profile";
import schemas from "./schema/schema";
import settings from "./schema/singleton/settings";
import tags from "./schema/tags";


export default defineConfig({
  title,
	basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
	schema: {
		types: [
			article,
			tags,
			person,
			profile,
			settings,
		],
	},
  plugins: [
    structureTool({
			structure: pageStructure([settings]),
		}),
    codeInput(),
    visionTool(),
		// Configures the global "new document" button, and document actions, to suit the Settings document singleton
		singletonPlugin([ schemas.settings]),
  ],
  // tools: (prev) => {
  //   // 👇 Uses environment variables set by Vite in development mode
  //   console.log(import.meta.env.DEV)
  //   if (import.meta.env.DEV) {
  //     return prev
  //   }
  //   return prev.filter((tool) => tool.name !== 'vision')
  // },
  // document: {
  //   newDocumentOptions: (prev, { creationContext }) => {
  //     if (creationContext.type === "global") {
  //       return prev.filter((templateItem) => templateItem.templateId != "settings");
  //     }
  //     return prev;
  //   },
  //   actions: (prev, { schemaType }) => {
  //     if (schemaType === "settings") {
  //       return prev.filter(({ action }) => !["unpublish", "delete","duplicate"].includes(action));
  //     }
  //     return prev;
  //   },
  // },
});
