"use client"
import React from 'react'
import { ConditionalSidebarTrigger } from './conditional-sidebar-trigger'
import { ThemeSwitch } from './theme-switch'
import { Separator } from './ui/separator'
import { Bell, Globe, Mail, ShoppingBasket, SlidersVertical, } from 'lucide-react'
import { UserProfile } from './user-profile'

const Header = () => {
  const iconClassname = "h-5 w-5 text-gray-500 dark:text-gray-400"
  return (
    <div className=' w-full flex mt-4 '>
      <div className='flex items-center justify-between w-full p-4 rounded-md shadow-md bg-white dark:bg-zinc-900'>
        <div className=' flex  flex-col '>

          <div className="h-8 w-8 rounded-full flex justify-center items-center bg-primary text-primary-foreground sm:hidden "><ShoppingBasket /></div>
          <h1 className='text-lg font-bold hidden lg:flex '>Products</h1>
          <p className='text-[12px] text-gray-500 opacity-80  hidden lg:flex  '>Manage Your Products</p>


        </div>
        <div className=' items-center gap-4 h-10 flex justify-end w-full lg:w-fit  '>

          <div className='lg:flex items-center gap-4 h-10 pr-3 hidden'>
            <ThemeSwitch />
            <Separator orientation="vertical" />
            <Globe className={iconClassname} />
            <div className='relative'>
              <Bell className={iconClassname} />
              <div className='absolute -top-3 -right-2 bg-regal-green dark:text-black text-[10px] font-bold rounded-full w-3 h-3 flex items-center justify-center p-2.5'>12</div>
            </div>
            <Mail className={iconClassname} />
            <SlidersVertical className={iconClassname} />
          </div>
            <UserProfile />
            <ConditionalSidebarTrigger />
          
        </div>
      </div>
    </div>
  )
}

export default Header