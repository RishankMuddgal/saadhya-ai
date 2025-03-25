import { databases,Query } from "@/lib/appwrite";
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";
import { getUserId } from "@/lib/utils";
import type { LoaderFunction } from "react-router";
import type { Models } from "appwrite";

type TaskCount = {
    inboxTasks: number,
    rodayTasks: number,

}

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export type AppLoaderData = {
    projects: Models.DocumentList<Models.Document>
    taskCounts: TaskCount
}

const getProjects = async ()=>{
    try{
        return await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'projects',
            [
                Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
                Query.orderDesc('$createdAt'),
                Query.limit(100),
                Query.equal('userId', getUserId())
            ]
        )
    }catch(err){
        console.log('Error getting project ',err);
        throw new Error('Error getting projects !')
    }
}
const getTaskCount = async()=>{
    const taskCounts: TaskCounts = {
        inboxTasks: 0 ,
        todayTasks: 0
    }

    try{
        const {total: totalInboxTasks} = await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'tasks',
            [
                Query.select(['$id']),
                Query.isNull('project'),
                Query.equal('completed',false),
                Query.limit(1),
                Query.equal('userId', getUserId())
            ]
        )

        taskCounts.inboxTasks = totalInboxTasks
    }catch(err){
        console.log(err);
        throw new Error('Error getting inbox task counts !');
    }

    try{
        const {total: totalTodayTasks} = await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            'tasks',
            [
                Query.select(['$id']),
                Query.and(
                    [
                        Query.greaterThanEqual('due_date',startOfToday().toISOString()),
                        Query.lessThan('due_date', startOfTomorrow().toISOString())
                    ]
                ),
                Query.equal('completed',false),
                Query.limit(1),
                Query.equal('userId', getUserId())
            ]
        )

        taskCounts.todayTasks = totalTodayTasks
    }catch(err){
        console.log(err);
        throw new Error('Error getting inbox task counts !');
    }

    // console.log(taskCounts)
    return taskCounts;
}
const appLoader: LoaderFunction = async()=>{
    const userId = getUserId();

    if(!userId)return redirect('/login');
    const projects = await getProjects();
    const taskCounts = await getTaskCount();
    return {projects, taskCounts};
}
export default appLoader;