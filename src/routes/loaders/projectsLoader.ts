import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";

import type { LoaderFunction } from "react-router";

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getProjects = async (query:string)=>{
    try{
        return await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'projects',
            [
                Query.contains('name',query),
                Query.select(['$id', 'name','color_name','color_hex','$createdAt']),
                Query.equal('userId', getUserId()),
                Query.orderDesc('$createdAt')
            ]
        );
    }catch(err){
        console.log('Error in finding projects',err);
    }
}
const projectsLoader: LoaderFunction = async({request}) =>{
        const url = new URL(request.url);
        const query = url.searchParams.get('p') || '';
        

        const projects = await getProjects(query);
        return {projects}
}
export default projectsLoader;