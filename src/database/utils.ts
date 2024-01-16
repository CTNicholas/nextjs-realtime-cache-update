"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

// Making revalidateTag into a server action
export async function revalidateTagServerAction(tag: string) {
  revalidateTag(tag);
}

// Update document name in your database and send revalidate event to every user
export const updateDocumentName = async (
  roomId: string,
  documentName: string
) => {
  await db.updateDocumentName(documentName);
  revalidateTag("documentName");

  // Broadcast a revalidate event to all connected users with Liveblocks
  liveblocks.broadcastEvent(roomId, {
    type: "revalidateTag",
    tag: "documentName",
  });
};

// Get document name and set
export const getDocumentName = unstable_cache(
  async (): Promise<string> => {
    return await db.getDocumentName();
  },
  ["documentName"],
  { tags: ["documentName"] }
);

// === Not important, just simulating database calls below ========================
const dbId = "a-random-room-to-use-as-a-store";

liveblocks.getRoom(dbId).catch(() => {
  liveblocks.createRoom(dbId, { defaultAccesses: ["room:write"] });
});

const db = {
  async updateDocumentName(documentName: string) {
    await liveblocks.updateRoom(dbId, {
      metadata: { documentName: documentName || null },
    });
  },

  async getDocumentName(): Promise<string> {
    const room = await liveblocks.getRoom(dbId);
    return room.metadata.documentName as string;
  },
};
