import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { User, Session, getServerSession } from "next-auth";

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export async function getCurrentUser() {
  const session = (await getServerSession(authOption)) as SessionInterface;

  return session;
}
