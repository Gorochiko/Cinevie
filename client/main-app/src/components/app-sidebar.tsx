
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link";
import Image from "next/image";



export function AppSidebar({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    return (
        <Sidebar >
            <SidebarContent className="bg-white ">
                <SidebarGroup >
                    <Link href="/dashboard" className="justify-items-center border-l-indigo-50 w-full rounde-2xl border-black">
                        <Image src="/logocinevie.svg"
                            width={50}
                            height={50}
                            className="w-[65px] h-[auto]"
                            alt="Icon"
                        />
                    </Link>
                    <SidebarGroupContent className="border-l-indigo-50 mt-2 p-2 rounded-2xl" >
                        <SidebarMenu className="">
                            {items.map((item, index) => item.items ? (
                                <Collapsible key={index} defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title} className="flex items-center text-base">
                                                {item.icon && <item.icon className="mr-2" />}
                                                <span className="font-medium">{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem: { title: string; url: string }) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.url}>
                                                                <span className="text-black text-sm">{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton tooltip={item.title} className="flex items-center text-base">
                                        {item.icon && <item.icon className="mr-2" />}
                                        <span className="font-medium">{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
