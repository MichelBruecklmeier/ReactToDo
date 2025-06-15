import {useState} from 'react';
import Task from './Task.js';
function TaskList({tasks, onDelete, onToggle}){
    if (!Array.isArray(tasks)) {
        return <div>No tasks to display</div>;
    }
    return(
        <ul class='list-disc list-inside'>
            {tasks.map((task) => (
                <Task
                    key = {task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    />
            ))}
        </ul>
    )
}


export default TaskList;