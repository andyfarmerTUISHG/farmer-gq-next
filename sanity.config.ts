"use client";

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  title,
} from "@/sanity/lib/api";
import * as resolve from "@/sanity/plugin/resolve";
import { pageStructure, singletonPlugin } from "@/sanity/plugin/settings";

import article from "./schema/articles";
import siteLinks from "./schema/documents/site-links";
import person from "./schema/person";
import profile from "./schema/profile";
import settings from "./schema/singleton/settings";
import tags from "./schema/tags";

export default defineConfig({
  title,
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      settings,
      // Documents
      article,
      person,
      profile,
      siteLinks,
      // Objects
      tags,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([settings]),
    }),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
  ],
});
