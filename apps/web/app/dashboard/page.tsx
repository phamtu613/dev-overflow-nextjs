import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const session = await auth();
  const userId = session.userId;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User: {userId}</p>
    </div>
  );
}
