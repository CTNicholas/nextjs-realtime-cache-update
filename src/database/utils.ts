import { revalidateTag, unstable_cache } from "next/cache";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export const updateDocumentName = async (documentName: string) => {
  await liveblocks.updateRoom("z5sQ_c2Cep_9v4DwuQojg", {
    metadata: { documentName },
  });
  revalidateTag("documentName");
};

export const getDocumentName = unstable_cache(
  async (): Promise<string> => {
    const room = await liveblocks.getRoom("z5sQ_c2Cep_9v4DwuQojg");
    return room.metadata.documentName as string;
  },
  ["documentName"],
  { tags: ["documentName"] }
);
