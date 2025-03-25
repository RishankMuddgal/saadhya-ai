import { Outlet, useNavigation, useLoaderData } from "react-router"
import { SidebarProvider  } from "../components/ui/sidebar"
import AppSideBar from "@/components/ui/AppSideBar"
import {TooltipProvider} from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster"; 
import { cn } from "@/lib/utils";
// import { Toaster } from "@/components/ui/toaster";
import { AppLoaderData } from "@/routes/loaders/appLoader";

import { ProjectProvider } from "@/contexts/ProjectContext";

const AppLayout = () => {
  const navigation = useNavigation();
  const {projects} = useLoaderData<AppLoaderData>();
  const isLoading = navigation.state === 'loading' && !navigation.formData;
  return (
    
    <ProjectProvider projects={projects}>
    
    <SidebarProvider>
        <TooltipProvider delayDuration={500} disableHoverableContent>
        <AppSideBar/>
        <main className={cn("flex-1",
          isLoading && 'opacity-50 pointer-events-none',
        )}>
            <Outlet/>
        </main>
        </TooltipProvider>
    </SidebarProvider>

    <Toaster></Toaster>
    </ProjectProvider>
  )
}

export default AppLayout