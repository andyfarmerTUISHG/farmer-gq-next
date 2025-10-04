"use client";
import { useRouter } from "next/router";

export default function SearchParams() {
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      search-params
      {query}
    </div>
  );
}
