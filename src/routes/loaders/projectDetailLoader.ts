import { databases } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import type { LoaderFunction } from "react-router";
const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const getProject = async (projectId : string)=>{
    try{
        const project = await databases.getDocument(
            VITE_APPWRITE_DATABASE_ID,
            'projects',
            projectId
        );
        if(project.userId !== getUserId()){
            throw new Error('Unauthorized !');
        }
        return project;
    }catch(err){
        console.log('Error getting the project : ', err);
        if(err instanceof Error){
            throw new Error(err.message);
        }
        throw new Error('Error getting project ');
    }
}
const projectDetailLoader: LoaderFunction = async ({params})=>{
    const {projectId} = params as {projectId: string}
    const project = await getProject(projectId);
    return {project}
}
export default projectDetailLoader;