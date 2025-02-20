import { Toaster } from "@/components/ui/toaster"
export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}