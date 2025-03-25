import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem

} from '@/components/ui/dropdown-menu'
import ProjectFormDialog from './ProjectFormDialog'
import { Button } from './ui/button'
import { Edit } from 'lucide-react'
import type { Project } from '@/types'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import ProjectDeleteButton from './ProjectDeleteButton'


interface ProjectActionMenuProps extends DropdownMenuContentProps{
    defaultFormData: Project;

}
const ProjectActionMenu:React.FC<ProjectActionMenuProps> = ({
    children,
    defaultFormData,
    ...props
}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent {...props}>
            <DropdownMenuItem asChild>
                <ProjectFormDialog method='PUT' defaultFormData={defaultFormData}>
                    <Button variant='ghost'
                            size='sm'
                            className='w-full justify-start px-2'>
                        <Edit></Edit>Edit
                    </Button>
                </ProjectFormDialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <ProjectDeleteButton defaultFormData={defaultFormData}></ProjectDeleteButton>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectActionMenu