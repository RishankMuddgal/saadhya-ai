import type { ActionFunction } from "react-router";
import type { ProjectForm, Project } from "@/types";
import type { Models } from "appwrite";

import {databases} from '@/lib/appwrite'
import { generateId, getUserId } from "@/lib/utils";
import { generateProjectTasks } from "@/api/googleAi";

import { redirect } from "react-router";

type aiGenTask = {
    content: string;
    due_date: Date| null;
}

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const createProject = async (data:ProjectForm) =>{
    let project: Models.Document | null = null;
    const aiTaskGen = data.ai_task_gen;
    const taskGenPromt = data.task_gen_prompt;

    let aiGeneratedTasks : aiGenTask[] = [];
    try {
        project = await databases.createDocument(
            VITE_APPWRITE_DATABASE_ID,
            'projects',
            generateId(),
            {
                name: data.name,
                color_name: data.color_name,
                color_hex: data.color_hex,
                userId: getUserId()
            }
        )
    }catch(err){
        console.log('Error creating project', err);
    }

    if(aiTaskGen){
        try{
            aiGeneratedTasks = JSON.parse(await generateProjectTasks(taskGenPromt) || '');
             console.log(aiGeneratedTasks);
        }catch(err){
            console.log('Error creating project tasks', err);
        }
    }

    if(aiGeneratedTasks.length){
        const promises = aiGeneratedTasks.map((task)=>{
            return databases.createDocument(
                VITE_APPWRITE_DATABASE_ID,
                'tasks',
                generateId(),
                {
                    ...task,
                    project: project?.$id,
                    userId: getUserId()
                }
            );
        })

        try{
            await Promise.all(promises);
        }catch(err){
            console.log('Error creating project tasks', err);
        }
    }
    
    return redirect(`/app/projects/${project?.$id}`);
}   

const deleteProject = async(data:Project) =>{
    const documentId = data.id;

    if(!documentId) throw new Error('No project found with this id .');

    try{
        await databases.deleteDocument(
            VITE_APPWRITE_DATABASE_ID,
            'projects',
            documentId
        )
    }catch(err){
        console.log('Error in deleting the project ', err);
    }
}

const updateProject = async(data:Project) =>{
    const documentId = data.id;

    if(!documentId) throw new Error('Project id not found !');

    try{
        return await databases.updateDocument(
            VITE_APPWRITE_DATABASE_ID,
            'projects',
            documentId,
            {
                name:data.name,
                color_name: data.color_name,
                color_hex: data.color_hex
            }
        )
    }catch(err){
        console.log('Error updating the project ', err);
    }
}
const projectAction:ActionFunction = async ({request})=>{
    const method = request.method;
    const data = await request.json() as ProjectForm

    if(method === 'POST'){
        return await createProject(data);
    }
    if(method === 'PUT'){
        return await updateProject(data);
    }
    if(method === 'DELETE'){
        return await deleteProject(data);
    }
        

    throw new Error('Invalid method');
}
export default projectAction;