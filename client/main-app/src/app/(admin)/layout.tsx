
export default function MovieLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
        
          {children}

        </body>
      </html>
    );
  }