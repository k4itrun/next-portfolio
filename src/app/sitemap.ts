import { type MetadataRoute } from "next";
import { meta } from "@k4itrun/config";

function absoluteUrl(path: string) {
    return new URL(path, meta.url).href
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes = [""].map((route) => ({
        url: absoluteUrl(route),
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes];
}