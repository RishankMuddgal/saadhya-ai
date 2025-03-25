import {databases, Query} from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import type { LoaderFunction } from 'react-router'
import { startOfToday,startOfTomorrow } from 'date-fns';

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTask = async() =>{
    try{
        return await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'tasks',
            [
                Query.equal('completed',false),
                Query.and([
                    Query.greaterThanEqual('due_date',startOfToday().toISOString()),
                    Query.lessThan('due_date', startOfTomorrow().toISOString())
                ]),
                Query.equal('userId', getUserId())
            ]
        )
    }catch(err){
        console.log(err);
        throw new Error('Error gwtting today tasks !');
    }
}
const todayTaskLoader: LoaderFunction = async () =>{
    const tasks = await getTask();
    console.log(tasks);
    return {tasks}
}


export default todayTaskLoader