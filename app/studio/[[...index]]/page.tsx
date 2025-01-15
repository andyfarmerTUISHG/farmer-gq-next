// app/studio/[[...index]]/page.tsx

"use client";

import { NextStudio } from "next-sanity/studio";
// import config from "../@/sanity.config";
import config from "../../../sanity.config"

export default function Studio() {
  return <NextStudio config={config} />;
}