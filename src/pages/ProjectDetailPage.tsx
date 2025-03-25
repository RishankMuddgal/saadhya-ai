import { useState } from "react"
import { useFetcher, useLoaderData } from "react-router" 
import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Button } from "@/components/ui/button"
import TaskForm from "@/components/TaskForm"
import TaskCardSkeleton from "@/components/TaskCardSkeleton"
import ProjectActionMenu from "@/components/ProjectActionMenu"
import TaskCreateButton from "@/components/TaskCreateButton"
import TaskEmptyState from "@/components/TaskEmptyState"
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page"

import { MoreHorizontal } from "lucide-react"
import type { Models } from "appwrite"
import TaskCard from "@/components/TaskCard"


const ProjectDetailPage = () => {
    const fetcher = useFetcher();
    const { project} = useLoaderData<{project:Models.Document}>()
    const projectTasks = project.tasks.filter(
        (i:Models.Document)=> !i.completed,
    ) as Models.Document[];

    projectTasks.sort((a,b) =>{
        return a.due_date < b.due_date ? -1: 1;
    })

    const [taskFormShow, setTaskFormShow] = useState<boolean>(false);

  return (
    <>
        <Head title={project.name + '- Saadhya AI'}></Head>
        <TopAppBar title={project.name}></TopAppBar>

        <Page>
            <PageHeader>
                <div className="flex items-center gap-2">
                    <PageTitle>{project.name}</PageTitle>
                    <ProjectActionMenu
                        defaultFormData={{
                            id: project.$id,
                            name: project.name,
                            color_name: project.color_name,
                            color_hex: project.color_hex
                        }}>
                            <Button
                                variant='ghost'
                                size='icon'
                                className="w-8 h-8 shrink-0"
                                aria-label="More action">
                                    <MoreHorizontal></MoreHorizontal>
                                </Button>
                    </ProjectActionMenu>
                </div>
            </PageHeader>

            <PageList>
                {
                    projectTasks.map(({$id, content, completed, due_date})=>(
                        <TaskCard
                            key={$id}
                            id={$id}
                            content={content}
                            comlpeted={completed}
                            dueDate={due_date}
                            project={project}></TaskCard>
                    ))
                }

                {fetcher.state !== 'idle' && <TaskCardSkeleton></TaskCardSkeleton>}
                {!taskFormShow && (
                    <TaskCreateButton onClick={()=> setTaskFormShow(true)}></TaskCreateButton>
                )}
                {!projectTasks.length && !taskFormShow && (
                    <TaskEmptyState type="project"></TaskEmptyState>
                )}

                {taskFormShow &&  (
                <TaskForm className='mt-1' mode="create"
                onCancel={()=>setTaskFormShow(false)}
                defaultFormData={{
                    content: '',
                    due_date: null,
                    project: project.$id
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

export default ProjectDetailPage