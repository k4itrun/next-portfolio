import type { MetadataRoute } from "next";
import { meta } from "@9ll-fun/config";

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
