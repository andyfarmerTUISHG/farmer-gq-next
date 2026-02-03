import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import WrappedStats from "@/app/(site)/components/wrapped-stats";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { wrappedFilmsQuery, wrappedYearsQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateStaticParams() {
  // Use regular client for static generation (no draft mode)
  const yearsData = await client.fetch(wrappedYearsQuery);

  // Extract unique years from the simplified query result
  const years = yearsData
    ? [...new Set(yearsData.map((item: any) => item.year))]
    : [];

  return years.map((year: string) => ({ year: year.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const title = `${year} Cinema Wrapped | Annual Film Statistics`;
  const description = `Your ${year} cinema year in review - films watched, ratings, and cinema visits with Cineworld Unlimited.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function WrappedYearPage({ params }: Props) {
  const { year } = await params;
  const yearNumber = Number.parseInt(year, 10);

  if (Number.isNaN(yearNumber) || yearNumber < 2020 || yearNumber > new Date().getFullYear()) {
    notFound();
  }

  const { data: films } = await sanityFetch({
    query: wrappedFilmsQuery,
    params: { year }, // Pass as string since GROQ query expects string
  });

  if (!films || films.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              {year}
              {" "}
              Cinema Wrapped
            </h1>
            <div className="flex gap-4">
              <Link
                href="/films"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                All Films
              </Link>
              <Link
                href="/films/wrapped"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                All Years
              </Link>
            </div>
          </div>
          <p className="text-gray-600">
            No films watched in
            {year}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">
            {year}
            {" "}
            Cinema Wrapped
          </h1>
          <div className="flex gap-4">
            <Link
              href="/films"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              All Films
            </Link>
            <Link
              href="/films/wrapped"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              All Years
            </Link>
          </div>
        </div>
        <p className="text-gray-600">
          Your
          {year}
          {" "}
          year in cinema with Cineworld Unlimited
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Comprehensive Statistics */}
        <WrappedStats films={films} year={year} />
      </div>
    </div>
  );
}
