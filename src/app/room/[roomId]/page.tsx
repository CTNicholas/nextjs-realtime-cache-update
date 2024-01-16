import Room from "@/app/room/[roomId]/Room";
import { CollaborativeApp } from "@/components/CollaborativeApp";
import { getDocumentName, updateDocumentName } from "@/database/utils";

export default async function Page({ params }: { params: { roomId: string } }) {
  async function onSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    await updateDocumentName(params.roomId, name);
  }

  const documentName = await getDocumentName();

  return (
    <Room>
      <main className="max-w-sm mx-auto">
        <h1 className="mt-16 text-3xl font-bold tracking-tight">
          {documentName}
        </h1>
        <div className="opacity-70 pt-2 mt-3 mb-8 border-t">
          <CollaborativeApp />
        </div>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Document name
            </label>
            <input
              className="border rounded shadow-sm px-3 py-2 w-full outline-black focus:outline-2 focus:outline"
              placeholder=""
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              required
            />
          </div>
          <button className="px-3.5 py-2.5 bg-black hover:bg-gray-800 active:bg-black text-white rounded font-medium flex justify-center items-center">
            Revalidate Next.js cache + Liveblocks
          </button>
        </form>
      </main>
    </Room>
  );
}
