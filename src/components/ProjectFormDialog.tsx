import {Dialog, DialogTrigger, DialogContent} from '@/components/ui/dialog'
import ProjectForm from './ProjectForm'
import { useFetcher } from 'react-router'
import { truncateString } from '@/lib/utils'

import { useToast } from '@/hooks/use-toast'


import type { Project} from '@/types'

import { useState } from 'react'

type ProjectFormDialogProps = {
    defaultFormData?:Project;
    children: React.ReactNode;
    method: 'POST'|'PUT';
}
const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({defaultFormData,children,method}) => {
    const fetcher = useFetcher();
    const {toast} = useToast();
    const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>

        <DialogContent className='p-0 border-0 !rounded-xl'>
            <ProjectForm mode={method === 'POST' ? 'create' : 'edit'}
                defaultFormaData={defaultFormData}
                onCancel={()=> setOpen(false)}
                onSubmit={async (data)=>{setOpen(false);

                    const {id,update} = toast({
                        title: `${method === 'POST' ? 'Creating' : 'Updating'} project ...`,
                        duration: Infinity
                    });
                    await fetcher.submit(JSON.stringify(data),
                    {
                        action:'/app/projects',
                        method,
                        encType:'application/json'
                    })
                    update({
                        id,
                        title: `Project ${method === 'POST' ? 'created' : 'updated' }.`,
                        description:`The project ${truncateString(data.name,32)} ${data.ai_task_gen ? 'and its tasks' : ''} have been successfully ${method === 'POST' ? 'created' : 'updated'}.`,
                        duration: 5000
                    })
                }}></ProjectForm>
        </DialogContent>
    </Dialog>
  )
}

export default ProjectFormDialog