import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

//import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

import BackButton from "@/app/components/BackButton";

export const revalidate = 30;

const ARTIST_QUERY = defineQuery(`*[
    _type == "artist" &&
    slug.current == $slug
  ][0]{
  ...,
  "events": *[_type == "event" && (headline._ref == ^._id || ^._id in artists[]._ref)] | order(date asc) {
    _id,
    name,
    slug,
    date,
  }
}`);

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const artist = await client.fetch(ARTIST_QUERY, await params);
  /*const { data: artist } = await sanityFetch({
    query: ARTIST_QUERY,
    params: await params,
  });*/
  if (!artist) {
    notFound();
  }
  const {
    name,
    description,
    photo,
    events
  } = artist;

/*console.log('Full artist object:', artist);
console.log('Description value:', description);
console.log('Description type:', typeof description);*/

   const imageUrl = photo?.asset
    ? urlFor(photo)
        .height(310)
        .width(550)
        .quality(80)
        .auto("format")
        .url()
    : "https://placehold.co/550x310/png";

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <BackButton fallbackUrl="/artists" />
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={imageUrl}
          alt={name || "Artist"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
          priority
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {name ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white">
                {name}
              </h1>
            ) : null}
          {description && description.length > 0 && (
            <div className="prose max-w-none prose-gray dark:prose-invert border rounded-2xl p-6 whitespace-pre-wrap">
              <p>{description}</p>
            </div>
          )}
        </div>
        {events && events.length > 0 && (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Upcoming Events
        </h2>
        <div className="grid gap-4">
          {events.map((event: any) => (
            <Link
              key={event._id}
              href={`/events/${event.slug.current}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-1 last-of-type:mb-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {event.name}
                  </h3>
                </div>
                <time className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
)}
      </div>
    </div>
    </main>
  );
}