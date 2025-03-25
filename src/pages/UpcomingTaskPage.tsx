import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page,PageHeader,PageTitle,PageList } from "@/components/Page"
// import TaskCreateButton from "@/components/TaskCreateButton"
import TaskEmptyState from "@/components/TaskEmptyState"
// import TaskForm from "@/components/TaskForm"
import TaskCard from "@/components/TaskCard"
// import TaskCardSkeleton from "@/components/TaskCardSkeleton"
import { CheckCircle2 } from "lucide-react"

import {  useLoaderData } from "react-router"
import type { Models } from "appwrite"
const UpcomingTaskPage = () => {
    const {tasks} = useLoaderData<{tasks:Models.DocumentList<Models.Document> }>();

    
  return (
    <>
    <Head title="Upcoming - Saadhya AI"></Head>
    <TopAppBar title='Upcoming' taskCount={tasks.total}></TopAppBar>
    
    <Page>
        <PageHeader>
            <PageTitle>
                Upcoming
            </PageTitle>
            {
                tasks.total > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CheckCircle2 size={16}></CheckCircle2>{tasks.total} tasks 
                    </div>
                )
            }
        </PageHeader>
        <PageList>
            {tasks.documents.map(({$id, content, completed, due_date,project})=> (
                <TaskCard key = {$id} id = {$id} content = {content} completed = {completed} dueDate={due_date} project = {project}></TaskCard>
            ),
            )}
            
            {!tasks.total &&  <TaskEmptyState type="upcoming"></TaskEmptyState>}
            
            
            
        </PageList>
    </Page>
    </>
  )
}

export default UpcomingTaskPage