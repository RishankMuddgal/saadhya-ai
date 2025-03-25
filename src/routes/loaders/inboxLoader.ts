import {databases, Query} from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import type { LoaderFunction } from 'react-router'

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTask = async() =>{
    try{
        return await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'tasks',
            [
                Query.equal('completed',false),
                Query.isNull('project'),
                Query.equal('userId', getUserId())
            ]
        )
    }catch(err){
        console.log(err);
        throw new Error('Error gwtting inbox tasks !');
    }
}
const inboxTaskLoader: LoaderFunction = async () =>{
    const tasks = await getTask();
    console.log(tasks);
    return {tasks}
}


export default inboxTaskLoader