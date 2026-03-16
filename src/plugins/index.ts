import { searchPlugin } from "@/collections/Search/config";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";
import { Plugin } from "payload";

const plugins: Plugin[] = [
  seoPlugin({}),
  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.CLOUDFLARE_R2_BUCKET!,
    config: {
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
      },
      region: "auto",
    },
  }),
  searchPlugin,
];

export default plugins;
