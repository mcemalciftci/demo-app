"use client"

import * as React from "react"
import { type LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { menuData } from "@/data/sidebar-data"
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible"

const getIconByName = (iconName: string): LucideIcon => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon
    return Icon || LucideIcons.Circle
}


export function TabletSidebar() {

    return (
         <div className="w-24 flex-none">
        <Sidebar className="w-24 bg-white border-r shadow-sm flex-none">
            <SidebarHeader className="flex flex-col  ">
                <div className="flex items-center justify-center flex-col gap-y-2 mt-1 pr-3">
                    <div className="h-8 w-8 rounded-full flex justify-center items-center bg-primary text-primary-foreground "><LucideIcons.ShoppingBasket /></div>
                    <div className="p-2 flex justify-center items-center ">
                        <LucideIcons.Search  size={20}/>
                    </div>
                     <SidebarTrigger className="" />
                </div>


            </SidebarHeader>
            <SidebarContent>
                {menuData.map((section) => (
                    <SidebarGroup key={section.section}>

                        <SidebarGroupContent className="">
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.label} className="px-4">

                                        <Collapsible className="w-full">
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className={`w-full justify-center ${item.isActive && "bg-regal-blue text-white"}`}
                                                >
                                                    {item.icon && (() => {
                                                        const Icon = getIconByName(item.icon)
                                                        console.log('Icon: ', Icon);
                                                        return <Icon size={30} />
                                                    })()}

                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>

                                        </Collapsible>

                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
        </div>
    )
}
