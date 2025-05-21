import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function UserProfile() {
  return (
    <div className=" items-center gap-2 hidden md:flex mr-4">
       <Avatar className="h-12 w-12 ">
        <AvatarImage src="" alt="User avatar" />
        <AvatarFallback className="bg-gray-300" ></AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Patricia Peter</span>
        <span className="text-xs text-muted-foreground">Super Admin</span>
      </div>
      <Button variant="ghost" size="icon" className="ml-1 h-5 w-5">
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
