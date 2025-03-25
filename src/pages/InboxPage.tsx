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
function InboxPage() {
    const fetcher = useFetcher();
    const {tasks} = useLoaderData<{tasks:Models.DocumentList<Models.Document> }>();
    const[taskFormShow, setTaskFormShow] = useState(false);
    console.log(tasks);
  return (
    <>
    <Head title="Inbox - Saadhya AI"></Head>
    <TopAppBar title='Inbox' ></TopAppBar>
    
    <Page>
        <PageHeader>
            <PageTitle>
                Inbox
            </PageTitle>
        </PageHeader>
        <PageList>
            {tasks.documents.map(({$id, content, completed, due_date,project})=> (
                <TaskCard key = {$id} id = {$id} content = {content} completed = {completed} dueDate={due_date} project = {project}></TaskCard>
            ),
            )}
            { fetcher.state !== 'idle' &&
                <TaskCardSkeleton></TaskCardSkeleton>
            }
            {!taskFormShow && <TaskCreateButton onClick={()=> setTaskFormShow(true)}></TaskCreateButton>}
            {!tasks.total && !taskFormShow && <TaskEmptyState type="inbox"></TaskEmptyState>}
            
            {taskFormShow &&  (
                <TaskForm className='mt-1' mode="create"
                onCancel={()=>setTaskFormShow(false)}
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

export default InboxPage