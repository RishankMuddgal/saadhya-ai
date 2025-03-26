import { Models } from "appwrite"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, CalendarDays, Hash, Inbox,Edit, Trash2 } from "lucide-react"

import { formatCustomDate, getTaskDueDateColorClass, truncateString } from "@/lib/utils"
// import { completedTaskEmptyState } from "@/assets"
import {Card, CardContent, CardFooter} from '@/components/ui/card'

import { Tooltip,TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

import  TaskForm  from "@/components/TaskForm"
import { useState, useCallback } from "react"
import type { Task } from "@/types"
import { useFetcher,useLocation } from "react-router"

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel
}from '@/components/ui/alert-dialog'
type TaskCardProps = {
    id: string;
    content: string;
    completed: boolean;
    dueDate: Date;
    project: Models.Document | null;
}
const TaskCard: React.FC<TaskCardProps> = ({id, content, completed,dueDate,project}) => {
    const fetcher = useFetcher();
    const location = useLocation();
    const {toast} = useToast();
    const[taskFormShow, setTaskFormShow] =  useState(false);
    const fetcherTask = fetcher.json as Task;
    
    const task : Task = Object.assign({
        id,
         content,
          completed,
          due_date: dueDate,
          project
    },
        fetcherTask,
        )
    const handleTaskComplete = useCallback(async(completed : boolean)=>{
        return await fetcher.submit(
            JSON.stringify({id:task.id, completed}),{
                action: '/app',
                method: 'PUT',
                encType: 'application/json'
            }
        );
    },[task.id, task.completed])
  return (
    <>
    {!taskFormShow && (
        <div className="group/card relative grid grid-cols-[max-content, minmax(0,1fr)] gap-3 border-b">
        <Button
            variant='outline'
            size='icon'
            className={cn('group/button rounded-full w-5 h-5 mt-2',
                task.completed && 'bg-border',
            )}
            role="checkbox"
            aria-checked = {task.completed}
            aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}aria-describedby="task-content"
                onClick={async ()=>{
                    await handleTaskComplete(!task.completed);

                    if(!task.completed){
                        toast({
                            title:'Another step closer to the finish line! 🎉💪',
                            action: (
                                <ToastAction 
                                    altText="Undo"
                                    onClick={handleTaskComplete.bind(null,false)}>Undo</ToastAction>
                            )
                        })
                    }
                    
                }}>
                <Check strokeWidth={4} className={cn('!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                    task.completed ? 'opacity-100' : 'opacity-0',
                )}></Check>
        </Button>
                
        <Card className="rounded-none py-2 space-y-1.5 border-none">
            <CardContent className="p-0">
                <p id='task-content'
                    className={cn('text-sm max-md:me-16', task.completed && 
                        'text-muted-foreground line-through'
                    )}>
                        {task.content}
                </p>
            </CardContent>
                    
            <CardFooter className="p-0 flex gap-4">
                {task.due_date && location.pathname!== '/app/today' && (
                    <div className={cn("flex items-center gap-1 text-xs text-muted-foreground",
                        getTaskDueDateColorClass(task.due_date,task.completed)
                    )}>
                        <CalendarDays size={14}></CalendarDays>
                        {formatCustomDate(task.due_date)}
                    </div>


                )}
                {location.pathname !== '/app/inbox' && 
                        location.pathname !== `/app/projects/${project?.id}}`
                        && (
                            <div className="grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground ms-auto">
                    <div className="truncate text-right">
                        {task.project ?.name || 'Inbox'}
                    </div>
                    {task.project ? <Hash size={14} color={task.project.color_hex}></Hash> : <Inbox size={14}
                                                        className="text-muted-foreground"></Inbox>}
                </div>
                        )}

                
                    
            </CardFooter>
        </Card>
        <div className="absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100">
            {!task.completed && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className="w-6 h-6 text-muted-foreground"
                            aria-label="Edit"
                            onClick={()=>setTaskFormShow(true)}
                            >
                                <Edit></Edit>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Edit task
                    </TooltipContent>
                </Tooltip>
                
            )}

            <AlertDialog>

            
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                            <Button
                            variant='ghost'
                            size='icon'
                            className="w-6 h-6 text-muted-foreground"
                            aria-label="Delete Task"
                            >
                                <Trash2></Trash2>
                            </Button>
                        </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                    Delete task
                    </TooltipContent>
                </Tooltip>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>🤔Final Confirmation: Do you wish to delete this task?</AlertDialogTitle>
                        <AlertDialogDescription>
                            The 🕳️<strong>{truncateString(task.content,48)}</strong>🕳️ task will be permanently deleted !
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={()=>{
                                fetcher.submit(JSON.stringify({id:task.id}),
                                {
                                    action:'/app',
                                    method:'DELETE',
                                    encType:'application/json'
                                }
                            )
                            }}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
    )}
    
    {taskFormShow && (
        <TaskForm className='my-1'
        defaultFormData={{
            ...task,
            project: project && project?.$id
        }}
        mode="edit"
        onCancel={()=> setTaskFormShow(false)}
        onSubmit={(formData)=>{
            fetcher.submit(JSON.stringify(formData),{
                action: '/app',
                method: 'PUT',
                encType: 'application/json'

            });
            setTaskFormShow(false);
        }}>

    </TaskForm>
    )}
    
    </>
    
  )
}

export default TaskCard