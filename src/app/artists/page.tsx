import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { defineQuery } from "next-sanity";
//import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client";

export const revalidate = 30;

const ARTISTS_QUERY = defineQuery(`*[
  _type == "artist"
  && defined(slug.current)
]|order(name asc){_id, name, slug}`);

export default async function ArtistsPage() {
  //const { data: artists } = await sanityFetch({ query: ARTISTS_QUERY });
  const artists = await client.fetch(ARTISTS_QUERY);
   return (
    <main className="min-h-dvh w-full p-8">
<h1 className="text-4xl font-bold tracking-tighter text-gray-900 my-4 dark:text-white">
        Artists
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {artists.map((artist: SanityDocument) => (
          <li
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/20"
            key={artist._id}
          >
            <Link
              className="hover:underline block"
              href={`/artists/${artist?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {artist?.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}