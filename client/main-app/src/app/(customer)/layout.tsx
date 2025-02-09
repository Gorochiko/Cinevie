import Header from "@/components/Header";
import Footer  from "@/components/Footer";
export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
        
        <Header/>
          <div className="" >{children}</div>
        <Footer/>
        </body>
      </html>
    );
  }