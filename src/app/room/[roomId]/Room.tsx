"use client";

import { ReactNode } from "react";
import { RoomProvider, useEventListener } from "@/liveblocks.config";
import { useParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@/components/Loading";
import { revalidateTagServerAction } from "@/database/utils";

export default function Room({ children }: { children: ReactNode }) {
  const { roomId } = useParams();

  return (
    <RoomProvider
      id={roomId as string}
      initialPresence={{}}
      initialStorage={{}}
    >
      <Listener />
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

function Listener() {
  // Listen for revalidateTag events that have been broadcast
  useEventListener(({ event }) => {
    if (event.type === "revalidateTag") {
      revalidateTagServerAction(event.tag);
    }
  });

  return null;
}
