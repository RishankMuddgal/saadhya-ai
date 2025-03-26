import { Card     , CardContent,CardFooter} from '@/components/ui/card'
import { Button                           } from '@/components/ui/button'
import { Textarea                         } from './ui/textarea'
import { Separator                        } from '@/components/ui/separator'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { Command, CommandInput,CommandList, CommandItem, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { ScrollArea } from './ui/scroll-area'
import type { ClassValue } from 'clsx'
import type { TaskForm } from '@/types'
// import type { Models} from '/'
import { CalendarIcon, X, Inbox, ChevronDown, Hash, SendHorizonal, Check} from 'lucide-react'
import {useState, useEffect, useCallback} from 'react';
import * as chrono from 'chrono-node';
import { formatCustomDate, getTaskDueDateColorClass,cn } from '@/lib/utils'
import { useProjects } from '@/contexts/ProjectContext'
import {  Models } from 'appwrite'

// import { cn } from '@/lib/utils'
type TaskFormProps = {
    defaultFormData?: TaskForm;
    className?: ClassValue;
    mode?: 'create' | 'edit';
    onCancel?: () => void;
    onSubmit?: (formData: TaskForm) => void;
}
const DEFAULT_FORM_DATA : TaskForm = {
    content: '',
    due_date: null,
    project: null
}
const TaskForm: React.FC<TaskFormProps> = ({
    defaultFormData = DEFAULT_FORM_DATA,
    className,
    mode,
    onCancel,
    onSubmit
}) => {
    const projects = useProjects();

    const [taskContent, setTaskContent] = useState(defaultFormData.content);
    const [dueDate, setDueDate] = useState(defaultFormData.due_date);
    // const [taskDueDate, setTaskDueDate] = useState(defaultFormData.due_date);
    const [projectId, setProjectId] = useState(defaultFormData.project);
    const [projectName, setProjectName] = useState('');
    const [projectColorHex, setProjectColorHex] = useState('');
    const [dueDateOpen, setDueDateOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(()=>{
        if(projectId){
            const {name, color_hex} = projects?.documents.find(
                ({$id}) => projectId === $id
            ) as Models.Document
            setProjectName(name);
            setProjectColorHex(color_hex);
        }
    }, [projects, projectId]);

    useEffect(() => {
        setFormData((prevFormData)=>({
            ...prevFormData,
            content: taskContent,
            due_date: dueDate,
            project: projectId
        }));
    }, [taskContent, dueDate, projectId]);
    useEffect(() => {
            const chronoParsed = chrono.parse(taskContent);
            if(chronoParsed.length ) {
                const lastdate = chronoParsed[chronoParsed.length - 1];
                setDueDate(lastdate.date());
            }
            console.log(chronoParsed);
    },[taskContent])
    const handleSubmit = useCallback(() => {
            if(!taskContent) return;
            console.log(formData);
            if(onSubmit) onSubmit(formData);
            setTaskContent('');
    },[taskContent, onSubmit, formData]);
    // console.log(dueDate);
  return (
    
    <Card className={cn('focus-within:border-foreground/30', className)}>
        <CardContent className='p-2'>
            <Textarea className='!border-0 !ring-0 mb-2 p-1' 
                        placeholder='Reward Awaits after project completion 🎉'
                        autoFocus
                        value = {taskContent}
                        onInput={(e) => setTaskContent(e.currentTarget.value)}
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                e.preventDefault();

                                handleSubmit();
                            }
                        }}>


            </Textarea>

            <div className="ring-1 ring-border rounded-md max-w-max">
                <Popover open = {dueDateOpen}
                    onOpenChange={setDueDateOpen}>
                    <PopoverTrigger>
                        <Button type='button' variant='ghost' size='sm'
                            className={cn(getTaskDueDateColorClass(dueDate,false))}>
                            <CalendarIcon></CalendarIcon>{dueDate ? formatCustomDate(dueDate) : 'Due date'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single'
                        initialFocus  disabled={{before : new Date()}}
                        selected={dueDate ? new Date(dueDate): undefined}
                        onSelect={(selected)=>{
                            setDueDate(selected || null);
                            setDueDateOpen(false); 
                        }}></Calendar>
                    </PopoverContent>
                </Popover>
                {dueDate && (
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button type='button' variant='ghost' size='sm' onClick={() => setDueDate(null)}>
                            <X></X>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove due date</p>
                    </TooltipContent>
                </Tooltip>

                )}
                

            </div>
        </CardContent>


        <Separator></Separator>

        <CardFooter className='grid grid-cols-[minmax(0,1fr),max-content] gap-10 p-2'>
            <Popover open={projectOpen} onOpenChange={setProjectOpen} modal>
                <PopoverTrigger asChild>
                    <Button variant='ghost' size='sm' role='combobox' aria-expanded={projectOpen} className='max-w-max' >

                        {projectName? <Hash color={projectColorHex}></Hash> : <Inbox></Inbox>}
                        <span className='truncate'>{projectName || 'Inbox'}</span>
                         <ChevronDown></ChevronDown>
                        
                        </Button>
                </PopoverTrigger>

                <PopoverContent className='w-[240px] p-0 ' align='start'>
                    <Command>
                        <CommandInput placeholder='Search project....'>

                        </CommandInput>
                        <CommandList>
                            <ScrollArea>
                                <CommandEmpty>No project found.</CommandEmpty>
                                <CommandGroup>
                                    {projects?.documents.map(({$id, name, color_hex})=>(
                                        <CommandItem key={$id}
                                                    onSelect={(selectedValue)=>{
                                                        setProjectName(selectedValue === projectName ? '' : name);

                                                        setProjectId(selectedValue === projectName ? null : $id)

                                                        setProjectColorHex(selectedValue === projectName ? undefined : color_hex)

                                                        setProjectOpen(false)
                                                    }}>
                                            <Hash color={color_hex}></Hash>{name}
                                            {projectName === name && <Check className='ms-auto'></Check>}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
                <Button variant='secondary' onClick={onCancel}>
                    <span className='max-md:hidden'>Cancel</span>
                    <X className='md:hidden'> </X>
                </Button>
                <Button disabled={!taskContent}>
                    <span className='max-md:hidden' onClick={handleSubmit}>
                        {mode === 'create' ? 'Add task' : 'Save changes'}</span>
                    <SendHorizonal className='md:hidden'></SendHorizonal>
                </Button>
            </div>
        </CardFooter>
    </Card>
  )
}

export default TaskForm