import { cn } from "@/lib/utils"
import { Input } from "./ui/input"

import { Loader2, Search } from "lucide-react"

export type SearchingState = 'idle'|'loading'|'searching'

type ProjectSearchFieldProps = {
    handleChange : React.ChangeEventHandler<HTMLInputElement>
    searchingState : SearchingState
}
const ProjectSearchField:React.FC<ProjectSearchFieldProps> = ({handleChange,searchingState}) => {
  return (
    <div className="relative">
        <Search 
            size={18}
            className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none"></Search>
        <Input
            type="text"
            name='p'
            placeholder="Search project"
            className="px-8"
            onChange={handleChange}></Input>
        <Loader2
            size={18}
            className={cn("absolute top-2 right-2 text-muted-foreground pointer-events-none hidden",
                searchingState !== 'idle' && 'block animate-spin'
            )}></Loader2>
    </div>
  )
}

export default ProjectSearchField