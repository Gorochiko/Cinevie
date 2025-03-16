
export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="flex w-full items-center justify-center h-screen bg-gray-100 mx-auto">
            <div className="w-3/5" >{children}</div>
            <div className="w-2/5">
               cục phải
            </div>
        </div>
          
    );
  }