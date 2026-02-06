import type { Metadata } from "next";

import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { wrappedYearsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Cinema Wrapped | Annual Film Statistics",
  description: "Annual cinema statistics and insights from films watched with Cineworld Unlimited pass.",
  openGraph: {
    title: "Cinema Wrapped | Annual Film Statistics",
    description: "Annual cinema statistics and insights from films watched with Cineworld Unlimited pass.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cinema Wrapped | Annual Film Statistics",
    description: "Annual cinema statistics and insights from films watched with Cineworld Unlimited pass.",
  },
};

export default async function WrappedIndexPage() {
  const { data: yearsData } = await sanityFetch({
    query: wrappedYearsQuery,
  });

  // Extract unique years from the simplified query result
  const years = yearsData
    ? [...new Set(yearsData.map((item: any) => item.year))].sort((a: number, b: number) => b - a)
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Cinema Wrapped</h1>
          <div className="flex gap-4">
            <Link
              href="/films"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              All Films
            </Link>
          </div>
        </div>
        <p className="text-gray-600">
          Annual cinema statistics and insights from your Cineworld Unlimited journey
        </p>
      </div>

      <div className="max-w-2xl mx-auto text-center">

        {years.length > 0
          ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-6">Select a Year</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {years.map((year: number) => (
                    <Link
                      key={year}
                      href={`/films/wrapped/${year}`}
                      className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="text-3xl font-bold text-blue-600 mb-2">{year}</div>
                      <div className="text-sm text-gray-600">Cinema Year</div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No cinema data available yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Start watching films to see your wrapped statistics!
                </p>
                <Link
                  href="/films"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View Films
                </Link>
              </div>
            )}

        <div className="mt-12 pt-8 border-t">
          <Link
            href="/films"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Films
          </Link>
        </div>
      </div>
    </div>
  );
}
