import Room from "@/app/room/[roomId]/Room";
import { CollaborativeApp } from "@/components/CollaborativeApp";
import { addUser, listUsers } from "@/database/utils";

export default async function Page() {
  async function onSubmit(formData: FormData) {
    "use server";

    const name = formData.get("username");
    if (!name) {
      return;
    }
    await addUser(name as string);
  }

  const userList = await listUsers();

  return (
    <Room>
      <div>
        {userList.map((user) => (
          <div>{user.name}</div>
        ))}
      </div>
      <form action={onSubmit}>
        <input type="text" name="username" />
        <button>Increment</button>
      </form>
      <CollaborativeApp />
    </Room>
  );
}
