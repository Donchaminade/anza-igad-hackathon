import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ANZA — From threshold to action",
    short_name: "ANZA",
    description:
      "Drought trigger-to-action briefs for Turkana field actors. Grounded explain + SMS.",
    start_url: "/",
    display: "standalone",
    background_color: "#e4ebe3",
    theme_color: "#b86b2e",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
