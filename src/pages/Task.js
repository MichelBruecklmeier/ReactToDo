import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
function Task({task, onDelete, onToggle}){
    if(!task)return;
    return(
        <Card 
            className={`w-full max-w-sm transition-all duration-300 ${task.done ? `bg-green-900/50` : `bg-gray-900`}   text-white border-none rounded-xl shadow-md p-2 m-2`}
        >
            <CardHeader className="pb-2">
                <CardTitle 
                    className={`${task.done ? `text-white` : `text-white/50`}text-lg font-semibold decoration-red-600`}
                    style = {{textDecoration: task.done? 'line-through':'none'}}
                    >
                    {task.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                    {task.text}
                </CardDescription>
            </CardHeader>
            <CardFooter className='flex flex-col gap-2 px-4 pb-0'>
                <Button
                    variant='outline'
                    className={`w-full ${task.done? `text-white`: `text-white/50`} bg-grey-400 transition-all duration-300 hover:bg-green-600 hover:text-gray-700 border-gray-800`}
                    onClick={() => onToggle(task.id)}

                >
                    {task.done ? 'UnDo':'Done'}
                </Button>
                <Button 
                    variant='destructive'
                    className='w-full '
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </Button>
                

            </CardFooter>
        </Card>

        )
}


export default Task;