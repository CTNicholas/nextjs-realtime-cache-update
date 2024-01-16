import Room from "@/app/room/[roomId]/Room";
import { CollaborativeApp } from "@/components/CollaborativeApp";
import { getDocumentName, updateDocumentName } from "@/database/utils";

export default async function Page() {
  async function onSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name");
    if (!name) {
      return;
    }

    await updateDocumentName(name as string);
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
