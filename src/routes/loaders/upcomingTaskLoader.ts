import {databases, Query} from '@/lib/appwrite'
import { startOfToday } from 'date-fns';
import { getUserId } from '@/lib/utils'
import type { LoaderFunction } from 'react-router'
import { start } from 'repl';

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTask = async() =>{
    try{
        return await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'tasks',
            [
                Query.equal('completed',false),
                Query.isNotNull('due_date'),
                Query.greaterThan('due_date', startOfToday().toISOString()),
                Query.orderAsc('due_date'),
                Query.equal('userId', getUserId())
            ]
        )
    }catch(err){
        console.log(err);
        throw new Error('Error gwtting upcoming tasks !');
    }
}
const upcomingTaskLoader: LoaderFunction = async () =>{
    const tasks = await getTask();
    // console.log(tasks);
    return {tasks}
}


export default upcomingTaskLoader