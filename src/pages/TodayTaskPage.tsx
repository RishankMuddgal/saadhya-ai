import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page,PageHeader,PageTitle,PageList } from "@/components/Page"
import TaskCreateButton from "@/components/TaskCreateButton"
import TaskEmptyState from "@/components/TaskEmptyState"
import TaskForm from "@/components/TaskForm"
import TaskCard from "@/components/TaskCard"
import TaskCardSkeleton from "@/components/TaskCardSkeleton"

import { useState } from "react"
import { useFetcher, useLoaderData } from "react-router"
import type { Models } from "appwrite"
import { startOfToday } from "date-fns"

import { CheckCircle2 } from "lucide-react"
const TodayTaskPage = () => {
    const fetcher = useFetcher();
    const {tasks} = useLoaderData<{tasks:Models.DocumentList<Models.Document> }>();
    const[taskFormShow, setTaskFormShow] = useState(false);
    console.log(tasks);
  return (
    <>
    <Head title="Today - Saadhya AI"></Head>
    <TopAppBar title='Today' taskCount={tasks.total}></TopAppBar>
    
    <Page>
        <PageHeader>
            <PageTitle>
                Today
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
            {tasks.documents.map(({$id, content, completed, due_date,  project})=> (
                <TaskCard key = {$id} id = {$id} content = {content} completed = {completed} dueDate={due_date} project = {project}></TaskCard>
            ),
            )}
            { fetcher.state !== 'idle' &&
                <TaskCardSkeleton></TaskCardSkeleton>
            }
            {!taskFormShow && <TaskCreateButton onClick={()=> setTaskFormShow(true)}></TaskCreateButton>}
            {!tasks.total && !taskFormShow && <TaskEmptyState ></TaskEmptyState>}
            
            {taskFormShow && (
                <TaskForm className='mt-1' mode="create"
                onCancel={()=>setTaskFormShow(false)}
                defaultFormData={{
                    content: '',
                    due_date: startOfToday(),
                    project: null
                }}
                onSubmit={(formData)=>{
                    fetcher.submit(JSON.stringify(formData), {
                        action: '/app',
                        method: 'POST',
                        encType: 'application/json'
                    });
                }}></TaskForm>
            )}
            
        </PageList>
    </Page>
    </>
  )
}

export default TodayTaskPage