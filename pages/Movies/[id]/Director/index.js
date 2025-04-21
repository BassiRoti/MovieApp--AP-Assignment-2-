import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;

  // Log the director ID for debugging
  console.log("Director ID:", id);

  // Use SWR to fetch the director details based on the passed ID
  const { data, error } = useSWR(
    id ? `/api/directors/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load director details.</div>;
  if (!data) return <div>Loading...</div>;

  // Render the director details
  return (
    <div>
      <h1>Director Details</h1>
      <ul>
        <li><strong>Name:</strong> {data.name || "Name not available"}</li>
        <li><strong>Biography:</strong> {data.biography || "Biography not available"}</li>
      </ul>
    </div>
  );
}
