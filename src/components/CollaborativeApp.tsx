"use client";

import { useOthers } from "@/liveblocks.config";

export function CollaborativeApp() {
  const others = useOthers();

  return (
    <div>
      {others.length + 1} user{others.length ? "s" : ""} online
    </div>
  );
}
