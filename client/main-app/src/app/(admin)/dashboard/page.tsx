import { AppSidebar } from "@/components/app-sidebar"
export default function Dashboard(){
    const img = () =>{
        Image
    }
    return (
        <AppSidebar items={
            [{
            title: "Film",
            url: "/dashboard/login",
            icon: undefined, 
            items: [
              { title: "Action", url: "/dashboard/action" },
              { title: "Comedy", url: "/dashboard/comedy" },
            ],
          },
          {
            title: "Booking",
            url: "/#",
            icon: undefined, 
            items: [
              { title: "Action", url: "/dashboard/action" },
              { title: "Comedy", url: "/dashboard/comedy" },
            ],
          }
        ]
    } />
       
       
       

    );
}