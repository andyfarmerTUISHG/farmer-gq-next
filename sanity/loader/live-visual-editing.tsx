"use client";

import type { SanityClient } from "@sanity/client";
import { useLiveMode } from "@sanity/react-loader";
import { VisualEditing } from "next-sanity";

import { client } from "@/sanity/lib/client";

// Always enable stega in Live Mode
const stegaClient = client.withConfig({
  stega: {
    enabled: true,
    studioUrl:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? "https://your-production-studio-url.com"
        : "http://localhost:3000",
  },
}) as unknown as SanityClient;

export default function LiveVisualEditing() {
  useLiveMode({
    client: stegaClient,
    // Add these options to prevent potential issues
    allowStudioOrigin:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? "https://your-production-studio-url.com"
        : "http://localhost:3000",
  });

  return <VisualEditing />;
}
