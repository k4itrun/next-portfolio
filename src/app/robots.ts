import type { MetadataRoute } from "next";
import { meta } from "@k4itrun/config";

export default function robots(): MetadataRoute.Robots {
 return {
  rules: [
   {
    userAgent: "*",
   },
  ],
  sitemap: `${meta.url}/sitemap.xml`,
  host: meta.url,
 };
}
