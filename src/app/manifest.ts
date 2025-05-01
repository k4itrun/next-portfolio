import type { MetadataRoute } from "next";
import { meta } from "@9ll-fun/config";

export default function manifest(): MetadataRoute.Manifest {
 return {
  scope: "/",
  display: "minimal-ui",
  start_url: "/?source=pwa",
  name: meta.title,
  short_name: meta.title,
  description: meta.description,
  background_color: "#fff",
  theme_color: "#FF00FF",
  icons: [
   {
    src: "/favicon.ico",
    sizes: "48x48",
    type: "image/x-icon",
   },
  ],
 };
}
