import { Tooltip, TooltipTrigger,TooltipContent } from "./ui/tooltip"
import { SidebarTrigger } from "./ui/sidebar"
import Kbd from "@/components/Kbd"
// import { title } from "process"
// import { useState } from "react"

import {useState, useEffect} from 'react';
import { cn } from "@/lib/utils"
type TopAppBarProps = {
    title: string;
    taskCount?: number;
}
const TopAppBar:React.FC<TopAppBarProps> = ({title, taskCount}) => {
    const [showTitle, setShowTitle] = useState(false);
    
    useEffect(()=>{
         const listener = () => setShowTitle(window.scrollY > 70);
        listener();
        window.addEventListener('scroll', listener);
        return () => window.removeEventListener('scroll',listener);
    }, []);
  return (
    <div className={cn('sticky z-40 bg-background top-0 h-14 grid grid-col-[40px,minmax(0,1fr), 40px] items-center px-4 ', 
    showTitle && 'border-b',
    )}>
        <Tooltip>
            <TooltipTrigger asChild>
                <SidebarTrigger></SidebarTrigger>
            </TooltipTrigger>

            <TooltipContent className="flex item-center">
                <p>Toggle sidebar</p>
                <Kbd kbdList={['Ctrl','B']}></Kbd>
            </TooltipContent>
        </Tooltip>

        <div className={cn("max-w-[480px] mx-auto text-center transition-[transform,opacity]",
            showTitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        )}>
            <h1 className="font-semibold truncate">{title}</h1>
                {Boolean(taskCount) && (
                    <div className="text-xs text-muted-foreground">{
                        taskCount} tasks
                    </div>
                )}
                
            
        </div>
    </div>
  )
}

export default TopAppBar