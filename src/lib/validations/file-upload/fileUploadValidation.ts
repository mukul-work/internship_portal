import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

export async function validateFileUpload() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    role: session.user.role,
    email: session.user.email,
    uploadAt: Date.now(),
  };
}
