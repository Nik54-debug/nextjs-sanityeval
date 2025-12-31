import { defineQuery, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
//import { client } from "@/sanity/client";
import { SanityLive } from "@/sanity/live";
import { sanityFetch } from "@/sanity/live";
import { 
  buildWeekSchedule, 
  shouldShowContent, 
  getNextOpeningTime, 
  getClosingTime 
} from "../../lib/scheduleHelper";
import ScheduledContentCountdown from "@/app/components/ScheduledContentCountdown";
import type { Metadata } from 'next';

//export const revalidate = 30;

const SCHEDULED_CONTENT_QUERY = defineQuery(`*[
  _type == "scheduledContent" &&
  slug.current == $slug
][0]{
  _id,
  title,
  content,
  ctaText,
  ctaLink,
  backgroundColor,
  isActive,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  "event": event->{
    _id,
    name,
    slug
  }
}`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  //const content = await client.fetch(SCHEDULED_CONTENT_QUERY, await params);

  const { data: content } = await sanityFetch({
    query: SCHEDULED_CONTENT_QUERY,
    params: await params,
  });
  
  if (!content) {
    return {
      title: 'Content Not Found',
    };
  }

  return {
    title: content.title,
    description: `Special content for ${content.event?.name || 'event'}`,
  };
}

export default async function ScheduledContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //const content = await client.fetch(SCHEDULED_CONTENT_QUERY, await params);

  const { data: content } = await sanityFetch({
    query: SCHEDULED_CONTENT_QUERY,
    params: await params,
  });

  if (!content) {
    notFound();
  }

  const weekSchedule = buildWeekSchedule(content)
  const showContent = shouldShowContent(weekSchedule)
  const nextOpeningTime = !showContent ? getNextOpeningTime(weekSchedule) : null
  const closingTime = showContent ? getClosingTime(weekSchedule) : null

  return (
    <>
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Back to Event Link */}
      {content.event && (
        <div className="mb-6">
          <Link
            href={`/events/${content.event.slug.current}`}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            ← Back to {content.event.name}
          </Link>
        </div>
      )}

      {showContent ? (
        /* Content is currently available */
        <article className="border-l-4 rounded-lg p-8 md:p-12">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {content.title}
            </h1>
            {closingTime && (
              <ScheduledContentCountdown 
                targetTime={closingTime.toISOString()} 
                type="closing"
              />
            )}
          </div>

          {content.content && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <PortableText value={content.content} />
            </div>
          )}
          {content.event && (
            <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Related to:
              </p>
              <Link
                href={`/events/${content.event.slug.current}`}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {content.event.name}
              </Link>
            </div>
          )}
        </article>
      ) : (
        /* Content is not currently available - show countdown */
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 md:p-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {content.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This content is not currently available.
          </p>

          {nextOpeningTime && (
            <ScheduledContentCountdown 
              targetTime={nextOpeningTime.toISOString()} 
              type="opening"
            />
          )}

          {/* Show schedule */}
          <div className="mt-12 text-left">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              📅 Availability Schedule:
            </h4>
            <div className="space-y-2">
              {weekSchedule.map((dayInfo) => (
                <div key={dayInfo.day} className="flex justify-between text-sm">
                  <strong className="text-gray-900 dark:text-white">{dayInfo.day}:</strong>
                  <span className="text-gray-600 dark:text-gray-400">
                    {dayInfo.isOpen && dayInfo.timeSlots && dayInfo.timeSlots.length > 0
                      ? dayInfo.timeSlots.map(slot => `${slot.start} - ${slot.end}`).join(', ')
                      : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {content.event && (
            <div className="mt-8">
              <Link
                href={`/events/${content.event.slug.current}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Return to {content.event.name}
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
    <SanityLive />
    </>
  );
}