import Logo from "../Logo"
import {Link,useLocation,useLoaderData} from 'react-router'
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarGroupAction, SidebarGroupLabel ,SidebarMenuAction } from "@/components/ui/sidebar"

import { SIDEBAR_LINKS } from "@/constants"
import { UserButton } from "@clerk/clerk-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible"
import { Tooltip,TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import TaskFormDialog from "../TaskFormDialog"
import ProjectFormDialog from "../ProjectFormDialog"
import ProjectActionMenu from "../ProjectActionMenu"


import { CirclePlus, Plus, ChevronRight, Hash, MoreHorizontal } from "lucide-react"

import { useSidebar } from "@/components/ui/sidebar"
import { useProjects } from "@/contexts/ProjectContext"

import type { AppLoaderData } from "@/routes/loaders/appLoader"

function AppSideBar() {

    const location = useLocation();
    const projects = useProjects();
    const {taskCounts} = useLoaderData() as AppLoaderData;
    const {isMobile, setOpenMobile} = useSidebar();
  return (
    <Sidebar>
        <SidebarHeader>
            <Link to='/app/inbox'>
                <Logo></Logo></Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {/* task create buttn */}
                        <SidebarMenuItem>
                            <TaskFormDialog>
                            <SidebarMenuButton className="!text-primary">
                                <CirclePlus></CirclePlus>AddTask
                            </SidebarMenuButton>
                            </TaskFormDialog>
                        </SidebarMenuItem>
                        {/* Sidebar links */}
                        {SIDEBAR_LINKS.map((item,index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild isActive = {location.pathname === item.href}
                                    onClick={()=>{
                                        if(isMobile) setOpenMobile(false);

                                    }}>
                                    <Link to={item.href}>
                                        <item.icon></item.icon>
                                    <span>{item.label}</span></Link>
                                </SidebarMenuButton>
                                {
                                    item.href === '/app/inbox' && Boolean(taskCounts.inboxTasks) && (
                                        <SidebarMenuBadge>
                                            {taskCounts.inboxTasks}
                                        </SidebarMenuBadge>
                                    )
                                }
                                {
                                    item.href === '/app/today' && Boolean(taskCounts.todayTasks) && (
                                        <SidebarMenuBadge>
                                            {taskCounts.todayTasks}
                                        </SidebarMenuBadge>
                                    )
                                }
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            
            <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild className="!text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:text-sidebar-accent-foreground">
                    <CollapsibleTrigger >
                        <ChevronRight className="me-2 transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90  "   ></ChevronRight> Project
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <Tooltip>
                    <ProjectFormDialog method="POST">
                    <TooltipTrigger>
                        <SidebarGroupAction aria-label="Add Project">
                            <Plus></Plus>
                        </SidebarGroupAction>
                    </TooltipTrigger>
                    </ProjectFormDialog>
                    <TooltipContent side="right">Add Project</TooltipContent>
                </Tooltip>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu> 

                            {projects?.documents.slice(0,5).map(({$id, name, color_name, color_hex})=>(
                                    <SidebarMenuItem key={$id}>
                                        <SidebarMenuButton asChild
                                                            isActive={
                                                                location.pathname === `/app/projects/${$id}`
                                                            }
                                                            onClick={()=>{
                                                                if(isMobile) setOpenMobile(false)
                                                            }}>
                                            <Link to={`/app/projects/${$id}`}>
                                                <Hash color={color_hex}></Hash><span>{name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        <ProjectActionMenu
                                        
                                            defaultFormData={{
                                                id:$id,
                                                name,
                                                color_name,
                                                color_hex
                                            }}
                                            side="right"
                                            align="start"
                                            >
                                        <SidebarMenuAction aria-label="More action" showOnHover
                                className="bg-slidebar-accent">
                                            <MoreHorizontal></MoreHorizontal>
                                        </SidebarMenuAction>
                                        </ProjectActionMenu>
                                        
                                    </SidebarMenuItem>
                            ))
                            }

                            {projects !== null && projects.total > 5 && (
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                                    className="text-muted-foreground"
                                                    isActive={location.pathname === '/app/projects'}
                                                    onClick={()=>{
                                                        if(isMobile) setOpenMobile(false);
                                                    }}>
                                        <Link to='/app/projects'>
                                            <MoreHorizontal></MoreHorizontal>All Projects
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}

                            {!projects?.total && (
                                <SidebarMenuItem  >
                                    <p className="text-muted-foreground text-sm p-2">Click + to add new projects</p>
                                </SidebarMenuItem>
                            )}
                            
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
                

            </SidebarGroup>
            </Collapsible>
        </SidebarContent>
        <SidebarFooter>
            <UserButton showName appearance={{
                elements: {
                    rootBox : 'w-full',
                    userButtonTrigger: '!shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground' 
                    ,userButtonBox: 'flex-row-reverse shadow-none gap-2',
                    userButtonOuterIdentifier:'ps-0',
                    popoverBox: 'pointer-events-auto' 
                }
            }} />
        </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar
