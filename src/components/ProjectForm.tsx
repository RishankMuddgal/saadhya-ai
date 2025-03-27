import { cn } from "@/lib/utils"
import { useState , useEffect, useCallback } from "react"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter

} from '@/components/ui/card'
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@/components/ui/popover'

import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from '@/components/ui/command';
import { ScrollArea } from "./ui/scroll-area"
import { Switch } from "./ui/switch"
import { Textarea } from "./ui/textarea"

import { Circle,ChevronDown, Check, Bot } from "lucide-react"


import { PROJECT_COLORS } from "@/constants"

import type {Project, ProjectForm} from '@/types'
const DEFAULT_PROJECT_NAME = 'Untitled';
const DEFAULT_PROJECT_COLOR_NAME = 'Slate';
const DEFAULT_PROJECT_COLOR_HEX = '#64748b';

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX,
};
type ProjectFormProps = {
    defaultFormaData?:Project;
    mode:'create' | 'edit';
    onCancel?: ()=> void;
    onSubmit?: (formData : ProjectForm) => void;
}
const ProjectForm:React.FC<ProjectFormProps> = ({
    defaultFormaData = DEFAULT_FORM_DATA,
    mode,
    onCancel = ()=>{},
    onSubmit,
}) => {

    const [projectName, setProjectName] = useState<string>(defaultFormaData?.name); 
    const [projectNameCharCount,setProjectNameCharCount] = useState<number>(defaultFormaData.name.length);

    const [colorName, setColorName] = useState<string>(defaultFormaData.color_name); 
    const [colorHex, setColorHex] = useState<string>(defaultFormaData.color_hex);
    
    const [colorOpen, setColorOpen] = useState<boolean>(false);
    const [aiTaskGen, setAiTaskGen] = useState<boolean>(false);
    const [taskGenPrompt, setTaskGenPrompt] = useState<string>('');
    const [formData, setFormData] = useState<ProjectForm>({
        ...defaultFormaData,
        ai_task_gen: aiTaskGen,
        task_gen_prompt: taskGenPrompt
    })
    useEffect(()=>{
        setFormData((prevFormData)=>({
            ...prevFormData,
            name: projectName,
            color_name: colorName,
            color_hex: colorHex,
            ai_task_gen: aiTaskGen,
            task_gen_prompt: taskGenPrompt
        }))
    },[projectName,colorName,aiTaskGen,taskGenPrompt]);

    const handleSubmit = useCallback(
        ()=>{
            if(onSubmit) onSubmit(formData);
        },[onSubmit,formData])

    const handleKeySubmit = useCallback((e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        if(e.key === 'Enter' && !e.shiftKey){
            handleSubmit();
        }
    },[handleSubmit]);

  return (
    <Card>
        <CardHeader className="p-4">
            <CardTitle>
                {mode === 'create' ? 'Add project' : 'Edit'}
            </CardTitle>
        </CardHeader>

        <Separator></Separator>

        <CardContent className="p-4 grid grid-cols-1 gap-2">
            <div>
                <Label htmlFor="project_name">Name</Label>
                <Input type = 'text' id="project_name" 
                    className="mt-2 mb-1"
                    onInput={(e)=>{
                        setProjectName(e.currentTarget.value);
                        setProjectNameCharCount(e.currentTarget.value.length)
                    }}
                    value={projectName}
                    maxLength={120}
                    onKeyDown={handleKeySubmit}></Input>
                <div className= {cn("text-xs text-muted-foreground max-w-max ms-auto",projectNameCharCount >=110 && 'text-destructive')}>
                    {projectNameCharCount}/120</div>
            </div>

            <div className="">
                <Label htmlFor="color">Color</Label>
                <Popover modal={true} open = {colorOpen} onOpenChange={setColorOpen}>
                    <PopoverTrigger asChild>
                        <Button variant='outline'
                            className="w-full mt-2"
                            id="color">
                            <Circle fill={colorHex}> </Circle>{colorName}
                            <ChevronDown className="ms-auto"></ChevronDown>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0 w-[478px] max-sm:w-[360px]">
                        <Command >
                            <CommandInput ></CommandInput>
                            <CommandList>
                                <ScrollArea>
                                    <CommandEmpty>No color found !</CommandEmpty>
                                    <CommandGroup>
                                        {PROJECT_COLORS.map(({name,hex})=>(
                                            <CommandItem key = {name}
                                            value = {`${name}=${hex}`}
                                            onSelect = {(value)=>{
                                                const [name,hex] = value.split('=');
                                                setColorName(name);
                                                setColorHex(hex);
                                                setColorOpen(false);
                                            }}>
                                                <Circle fill={hex}>
                                                </Circle>
                                                {name}
                                                {colorName === name && <Check className="ms-auto"></Check>}
                                            </CommandItem>
                                        )
                                            
                                        )}
                                    </CommandGroup>
                                </ScrollArea>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {mode === 'create' && (
                <div className="border rounded-md mt-6">
                    <div className="flex items-center gap-3 py-2 px-3">
                        <Bot className="text-muted-foreground flex-shrink-0"></Bot>
                        <div className="space-y-0.5 me-auto">
                            <Label htmlFor="ai_generate" className="block text-sm">AI Task Generator</Label>
                            <p className="text-xs text-muted-foreground">
                            🎯 Simplify your workflow — generate tasks in seconds! ⏱️
                            </p>
                        </div>
                        <Switch id="ai_generate"
                            onCheckedChange={setAiTaskGen}></Switch>
                    </div>

                    {aiTaskGen && <Textarea autoFocus 
                                            placeholder="Tell me about your project. What do you want to accomplish ? Also let me know the due date (if any, write like 'set due date as')"
                                            className="border-none"
                                            value={taskGenPrompt}
                                            onKeyDown={handleKeySubmit}
                                            onChange={(e)=>setTaskGenPrompt(e.currentTarget.value)}></Textarea>}
                </div>
            )}
            
        </CardContent>

        <Separator></Separator>

        <CardFooter className="flex justify-end gap-3 p-4">
            <Button variant='secondary' onClick={onCancel}>Cancel</Button>
            <Button disabled={!projectName || (aiTaskGen && !taskGenPrompt)} onClick={handleSubmit}>{mode === 'create' ? 'Add' : 'Save'}</Button>
        </CardFooter>
    </Card>
  )
}

export default ProjectForm