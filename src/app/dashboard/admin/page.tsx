import { authOptions } from "@/lib/auth";
import { Divide } from "lucide-react";
import { getServerSession } from "next-auth/next";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return <div>admin{session.user.username}</div>;
};

export default AdminPage;
