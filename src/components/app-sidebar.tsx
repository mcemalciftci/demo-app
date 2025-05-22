"use client"

import * as React from "react"
import { ChevronDown, type LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { menuData } from "@/data/sidebar-data"
import { useIsTablet } from "@/hooks/use-tablet"
import { TabletSidebar } from "./app-tablet-sidebar"

// Helper function to get Lucide icons by name
const getIconByName = (iconName: string): LucideIcon => {
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon
  return Icon || LucideIcons.Circle
}

export function AppSidebar() {

















  const { state } = useSidebar()
  const isExpanded = state === "expanded"
  const isTablet = useIsTablet()
  return (<>
    {
      isTablet && isExpanded ? <TabletSidebar /> :
        <Sidebar >
          <SidebarHeader className="flex flex-col gap-2 py-4">
            <div className="flex items-center justify-between px-4 pb-2 border-b border-sidebar-border">
              {isExpanded && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Logo" />
                    <AvatarFallback className="bg-primary text-primary-foreground"><LucideIcons.ShoppingBasket/></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col leading-none">
                    <span className="font-bold">master</span>
                    <span className="font-bold text-regal-blue ">POS</span>
                  </div>

                </div>
              )}
              <SidebarTrigger />
            </div>
            {isExpanded && (
              <div className="px-2">
               <div className="relative   lg:flex hidden">
            <LucideIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform rotate-90 text-gray-400" />
            <Input
              placeholder="Search Here"
              className="pl-10 "
              
            />
          </div>
              </div>
            )}
          </SidebarHeader>

          <SidebarContent>
            {menuData.map((section) => (
              <SidebarGroup key={section.section}>
                <SidebarGroupLabel className="text-xs uppercase tracking-widest font-semibold text-muted-foreground opacity-60">
                  {section.section}
                </SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.label} className="">
                        {item.subItems ? (
                          <Collapsible className="w-full">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton className={`w-full justify-between ${item.isActive && "bg-regal-blue text-white"}`}
                              >
                                {item.icon && React.createElement(getIconByName(item.icon))}
                                <span>{item.label}</span>
                                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.subItems.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.label}>
                                    <SidebarMenuSubButton>{subItem.label}</SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <SidebarMenuButton>
                            {item.icon && React.createElement(getIconByName(item.icon))}
                            <span>{item.label}</span>
                            {item.badge && <SidebarMenuBadge className="rounded-full  bg-regal-green dark:text-black text-[10px]">{item.badge}</SidebarMenuBadge>}
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarRail />
        </Sidebar>
    }
  </>
  )
}
