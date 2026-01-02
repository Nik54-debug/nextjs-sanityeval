import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

// Import template components
import StandardTemplate from "../components/templates/StandardTemplate";
import LandingTemplate from "../components/templates/LandingTemplate";
import ContactTemplate from "../components/templates/ContactTemplate";
import GalleryTemplate from "../components/templates/GalleryTemplate";

export const revalidate = 60;

const PAGECONTENT_QUERY = defineQuery(`*[
  _type == "pagecontent" &&
  slug.current == $slug
][0]`);

export default async function PageContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await client.fetch(PAGECONTENT_QUERY, await params);

  if (!page) {
    notFound();
  }

  // Render different templates based on selection
  switch (page.template) {
    case 'standard':
      return <StandardTemplate page={page} />;
    case 'landing':
      return <LandingTemplate page={page} />;
    case 'contact':
      return <ContactTemplate page={page} />;
    case 'gallery':
      return <GalleryTemplate page={page} />;
    default:
      return <StandardTemplate page={page} />;
  }
}

// Optional: Generate static paths for better performance
export async function generateStaticParams() {
  const pages = await client.fetch(`
    *[_type == "pagecontent"]{ "slug": slug.current }
  `);
  
  return pages.map((page: { slug: string }) => ({
    slug: page.slug,
  }));
}