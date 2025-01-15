// sanity.config.js
import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from 'sanity/structure'

// import schemas from './schemas/schema'
import schemas from "./schema/schema"

export default defineConfig({
  title: "farmer.gq",
  projectId: "ix9xb2vm",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool(),
    codeInput(),
    visionTool()
  ],
  // tools: (prev) => {
  //   // 👇 Uses environment variables set by Vite in development mode
  //   console.log(import.meta.env.DEV)
  //   if (import.meta.env.DEV) {
  //     return prev
  //   }
  //   return prev.filter((tool) => tool.name !== 'vision')
  // },
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId != 'settings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
      }
      return prev
    },
  },
});
