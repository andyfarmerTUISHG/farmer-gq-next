// types/index.ts
import type { PortableTextBlock } from "sanity";

export type ProfileType = {
    _id: string;
    fullName: string;
    headline: PortableTextBlock[];
};