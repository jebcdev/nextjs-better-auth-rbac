import { getSessionDetails } from "@/lib/auth/session-details";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getSessionDetails();

  if (!isAuthenticated) {
    redirect("/inicio");
  }

  return <>{children}</>;
}
