import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

//import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

import BackButton from "@/app/components/BackButton";
import GalleryDisplay from "@/app/components/GalleryDisplay";

export const revalidate = 30;

const EVENT_QUERY = defineQuery(`*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
  "doorsOpen": coalesce(doorsOpen, 0),
  headline->,
  venue->,
  "artists": artists[]->{_id, name, slug},
  "scheduledContent": *[
    _type == "scheduledContent" &&
    references(^._id)  
    ]{
    _id,
    title,
    slug
  },
  gallery,
  galleryDisplayStyle,
  "galleryReference": galleryReference->{
    _id,
    title,
    description,
    images,
    displayStyle
  }
}`);

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
 
  const event = await client.fetch(EVENT_QUERY, await params);
  /*const { data: event } = await sanityFetch({
    query: EVENT_QUERY,
    params: await params,
  });*/
  if (!event) {
    notFound();
  }
  const {
    name,
    date,
    headline,
    details,
    eventType,
    doorsOpen,
    venue,
    tickets,
    artists
  } = event;
  const { scheduledContent } = event;
  const eventDate = new Date(date).toDateString();
  const eventTime = new Date(date).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

   const imageUrl = headline?.photo?.asset
    ? urlFor(headline.photo)
        .height(310)
        .width(550)
        .quality(80)
        .auto("format")
        .url()
    : "https://placehold.co/550x310/png";

    const { gallery, galleryReference, galleryDisplayStyle } = event;

    // Use referenced gallery if available, otherwise use inline gallery
  const gallerySource = galleryReference || { images: gallery }
  const displayStyle = galleryDisplayStyle || galleryReference?.displayStyle || 'carousel'

  // Process images
const galleryImages = gallerySource?.images?.map((img: any) => ({
  url: img.asset
    ? urlFor(img)
        .width(1200)
        .height(675)
        .quality(80)
        .auto('format')
        .url()
    : '',
  alt: img.alt || '',
  caption: img.caption || '',
})).filter((img: any) => img.url) || [];

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <BackButton fallbackUrl="/events" />
      </div>
      {scheduledContent && scheduledContent.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Special Offers & Announcements
          </h3>
          <ul className="space-y-2">
            {scheduledContent.map((content: any) => (
              <li key={content._id}>
                <Link
                  href={`/events/signups/${content.slug.current}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2"
                >
                  <span>{content.title}</span>
                  <span className="text-sm">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={imageUrl}
          alt={name || "Event"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
          priority
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {eventType ? (
              <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {eventType.replace("-", " ")}
              </div>
            ) : null}
            {name ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white">
                {name}
              </h1>
            ) : null}
            {headline?.name ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
                <dd className="font-semibold text-gray-900 dark:text-white">
                  Artist
                </dd>
                <dt>{headline?.name}</dt>
              </dl>
            ) : null}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
              <dd className="font-semibold text-gray-900 dark:text-white">
                Date
              </dd>
              <div>
                {eventDate && <dt>{eventDate}</dt>}
              </div>
            </dl>
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
              <dd className="font-semibold text-gray-900 dark:text-white">
                Time
              </dd>
              <div>
                {eventTime && <dt>{eventTime}</dt>}
              </div>
            </dl>
            {doorsOpen ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
                <dd className="font-semibold text-gray-900 dark:text-white">
                  Doors Open
                </dd>
                <div className="grid gap-1">
                  <dt>Doors Open</dt>
                  <dt>{doorsOpen}</dt>
                </div>
              </dl>
            ) : null}
            {venue?.name ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
                <div className="flex items-start">
                  <dd className="font-semibold text-gray-900 dark:text-white">
                    Venue
                  </dd>
                </div>
                <div className="grid gap-1">
                  <dt>{venue.name}</dt>
                </div>
              </dl>
            ) : null}
            {artists && artists.length > 0 ? (
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
              <dd className="font-semibold text-gray-900 dark:text-white">
                Artists
              </dd>
              <div className="grid gap-2">
                {artists.map((artist: any) => (
                  <dt key={artist._id}>
                    <Link 
                      href={`/artists/${artist.slug.current}`}
                      className="hover:underline text-blue-600 dark:text-blue-400"
                    >
                      {artist.name}
                    </Link>
                  </dt>
                ))}
              </div>
            </dl>
          ) : null}
          </div>
          {details && details.length > 0 && (
            <div className="prose max-w-none prose-gray dark:prose-invert">
              <PortableText value={details} />
            </div>
          )}
          {tickets && (
            <a
              className="flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 p-4 text-white transition-colors"
              href={tickets}
            >
              Buy Tickets
            </a>
          )}
          {galleryImages.length > 0 && (
            <GalleryDisplay
              images={galleryImages}
              displayStyle={displayStyle}
              title={galleryReference?.title || 'Gallery'}
              description={galleryReference?.description}
            />
          )}
        </div>
      </div>
    </main>
  );
}