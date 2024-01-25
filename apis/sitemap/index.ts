import { MetadataRoute } from "next";

export async function fetchSitemap() {
  const res = await fetch(`https://api.alphaquest.io/api/app/blog/sitemap`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<MetadataRoute.Sitemap>
}
