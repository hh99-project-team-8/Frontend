import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import CreateForm from "../components/CreateForm";

const NewProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <main className="flex flex-col">
      <CreateForm />
    </main>
  );
};

export default NewProject;
