import { draftMode } from "next/headers";

import config from "@payload-config";
import { getPayload } from "payload";

import { User } from "@/payload-types";

const payload = await getPayload({ config });

export const fetchUserBySlug = async (slug: string): Promise<User> => {
  const { isEnabled: draft } = await draftMode();
  const data = await payload.find({
    collection: "users",
    depth: 1,
    draft,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }],
    },
  });

  return data.docs[0];
};
