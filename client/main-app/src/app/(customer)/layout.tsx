import Header from "@/components/Header";
import Footer  from "@/components/Footer";
// import { SessionProvider } from "next-auth/react";
// import CustomerLayout from "@/components/Customerlayout";
export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    
        <html lang="en">
          <body>
            <Header />
            <div className="">{children}</div>
            <Footer />
          </body>
        </html>
    
    );
  }