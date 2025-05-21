"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useIsTablet } from "@/hooks/use-tablet"

export function ConditionalSidebarTrigger() {
  const { state } = useSidebar()
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  // Only render the trigger when sidebar is collapsed
  
  if (state === "collapsed" ||  isMobile || isTablet) {
    return <SidebarTrigger />
  }

  // Return null when expanded to hide the trigger
  return null
}
