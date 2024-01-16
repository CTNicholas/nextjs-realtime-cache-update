import Room from "@/app/room/[roomId]/Room";
import { CollaborativeApp } from "@/components/CollaborativeApp";
import { getDocumentName, updateDocumentName } from "@/database/utils";

export default async function Page() {
  async function onSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    await updateDocumentName(name);
  }

  const documentName = await getDocumentName();

  return (
    <Room>
      <div>Document: {documentName}</div>
      <form action={onSubmit}>
        <input type="text" name="name" />
        <button>Update</button>
      </form>
      <CollaborativeApp />
    </Room>
  );
}
