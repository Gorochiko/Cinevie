import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react";
export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <Toaster />
      <SessionProvider>
        <main>{children}</main>
      </SessionProvider>
      </body>
    </html>
  );
}