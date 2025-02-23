"use client";
import {
    Sidebar,
    SidebarContent,
    
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { User } from 'lucide-react';
import { Video } from 'lucide-react';
import { Clapperboard } from 'lucide-react';
import React from "react";
import NavContent from "./ui/nav.content";


export function AppSidebar() {
  
   const data={ 
    navcontent:  [{
        title: "Film",
        url: "/flim",
        icon: Clapperboard,

      },
      {
        title: "Showtimes",
        url: "/showtime",
        icon: Video,
      },
      {
        title: "Customer",
        url: "/customer",
        icon: User,

      }
      ]}
    return (
        <Sidebar>
            <SidebarContent className="bg-gradient-to-r from-[#1230AE] to-[#C68FE6]  text-white shadow-lg">
                <NavContent items={data.navcontent}/>
            </SidebarContent>
        </Sidebar>
    );
}
