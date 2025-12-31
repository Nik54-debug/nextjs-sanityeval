import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
//import { sanityFetch } from "@/sanity/live";

import EventsSearch from "../components/EventsSearch";
import { urlFor } from "@/sanity/image";

export const revalidate = 30;

const EVENTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
  && date > now()
] | order(date asc) {
  _id,
  name,
  slug,
  date,
  eventType,
  image
}`);

export default async function EventsPage() {
  //const { data: events } = await sanityFetch({ query: EVENTS_QUERY });
  const events = await client.fetch(EVENTS_QUERY);

  // Generate image URLs on the server
  const eventsWithImages = events.map((event: any) => ({
    ...event,
    imageUrl: event.image?.asset
      ? urlFor(event.image)
          .width(550)
          .height(310)
          .quality(80)
          .auto('format')
          .url()
      : 'https://placehold.co/550x310/png'
  }));

   return (
    <main className="min-h-dvh w-full p-8">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 my-4 dark:text-white">
        Events
      </h1>
      <EventsSearch events={eventsWithImages} />
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((event: SanityDocument) => (
          <li
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/20"
            key={event._id}
          >
            <Link
              className="hover:underline block"
              href={`/events/${event?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {event?.name}
              </h2>
              {event?.date && (
                <p className="text-gray-500 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}