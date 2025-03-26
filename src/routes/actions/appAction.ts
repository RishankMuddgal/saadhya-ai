import type { ActionFunction } from "react-router"; 
import type {Task} from "@/types"

const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

import {databases} from '@/lib/appwrite'
import { generateId, getUserId } from "@/lib/utils";
const createTask = async (data : Task) => {
    try{
      return await databases.createDocument(VITE_APPWRITE_DATABASE_ID,
        'tasks',
        generateId(),
        {...data, userId: getUserId()}
      )
    }catch(err){
      console.log(err);
    }
}
const updateTask = async (data : Task) =>{
  const documentId = data.id;
  if(!documentId) throw new Error('Task id not found');

  delete data.id;

  try{
    return await databases.updateDocument(
      VITE_APPWRITE_DATABASE_ID,
      'tasks',
      documentId,
      data
    )
  }catch(err){
    console.log(err);
  }
}

const deleteTask = async (data: Task) => {
  const documentId = data.id;
  if(!documentId) throw new Error('Task is not found !');
  try{
    await databases.deleteDocument(
      VITE_APPWRITE_DATABASE_ID,
      'tasks',
      documentId
    )
  }catch(err){
    console.log(err);
  }
}
const appAction : ActionFunction = async ({request}) => {
    const data = await request.json() as Task;
    // console.log(data)
    if(request.method === "POST"){
        return await createTask(data);
    }
    if(request.method ==='PUT'){
      return await updateTask(data);
    }
    if(request.method === 'DELETE'){
      return await deleteTask(data);
    }
}
export default appAction;
