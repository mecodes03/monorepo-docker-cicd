import { client } from "@repo/prisma/client";
export default async function Home() {
  const users = await client.user.findMany();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>name: {user.name}</div>
          <div>email: {user.email}</div>
        </div>
      ))}
    </div>
  );
}

export const revalidate = 3600
