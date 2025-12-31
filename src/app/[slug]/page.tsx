import { defineQuery, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;

const PAGE_QUERY = defineQuery(`*[
  _type == "page" &&
  slug.current == $slug
][0]{
  _id,
  title,
  pageBuilder
}`);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await client.fetch(PAGE_QUERY, await params);

  if (!page) {
    notFound();
  }

  const { title, pageBuilder } = page;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          {title}
        </h1>

        {/* Render flexible content blocks */}
        {pageBuilder?.map((block: any, index: number) => {
          switch (block._type) {
            case 'textBlock':
              return (
                <div key={block._key || index} className="mb-12 max-w-4xl">
                  {block.heading && (
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      {block.heading}
                    </h2>
                  )}
                  {block.text && (
                    <div className="prose dark:prose-invert max-w-none">
                      <PortableText value={block.text} />
                    </div>
                  )}
                </div>
              );

            case 'imageBlock':
              const imageUrl = block.image?.asset
                ? urlFor(block.image).width(1200).quality(80).url()
                : null;

              if (!imageUrl) return null;

              const layoutClass = 
                block.layout === 'full' ? 'w-full' :
                block.layout === 'left' ? 'w-full md:w-1/2 md:float-left md:mr-8' :
                'w-full md:w-1/2 md:float-right md:ml-8';

              return (
                <figure key={block._key || index} className={`mb-8 ${layoutClass}`}>
                  <Image
                    src={imageUrl}
                    alt={block.caption || ''}
                    width={180}
                    height={80}
                    className="rounded-lg"
                  />
                  {block.caption && (
                    <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case 'hero':
              const heroImageUrl = block.backgroundImage?.asset
                ? urlFor(block.backgroundImage).width(1920).quality(80).url()
                : null;

              return (
                <div
                  key={block._key || index}
                  className="relative h-96 md:h-125 mb-12 rounded-lg overflow-hidden border-2 border-amber-300"
                  style={heroImageUrl ? {
                    backgroundImage: `url(${heroImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : {}}
                >
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      {block.heading && (
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                          {block.heading}
                        </h2>
                      )}
                      {block.subheading && (
                        <p className="text-xl md:text-2xl mb-8">
                          {block.subheading}
                        </p>
                      )}
                      {block.ctaText && block.ctaLink && (
                        <Link
                          href={block.ctaLink}
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                        >
                          {block.ctaText}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );

            case 'twoColumn':
              return (
                <div key={block._key || index} className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="prose dark:prose-invert">
                    {block.leftColumn && <PortableText value={block.leftColumn} />}
                  </div>
                  <div className="prose dark:prose-invert">
                    {block.rightColumn && <PortableText value={block.rightColumn} />}
                  </div>
                </div>
              );

            case 'cta':
              const bgColor = 
                block.backgroundColor === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                block.backgroundColor === 'green' ? 'bg-green-100 dark:bg-green-900' :
                'bg-gray-100 dark:bg-gray-800';

              return (
                <div key={block._key || index} className={`${bgColor} rounded-lg p-8 md:p-12 mb-12 text-center`}>
                  {block.heading && (
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      {block.heading}
                    </h2>
                  )}
                  {block.text && (
                    <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                      {block.text}
                    </p>
                  )}
                  {block.buttonText && block.buttonLink && (
                    <Link
                      href={block.buttonLink}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    >
                      {block.buttonText}
                    </Link>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}