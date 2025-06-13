import {useState, useEffect } from 'react';
import TaskList from './TaskList.js';
import {toggleData, getData, addData,deleteData} from './DataBase.js';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function App(){
    //Task data
    const [tasks, setTask] = useState([]);
    const [input,setInput] = useState('');
    const [title,setTitle] = useState('');
    //Use effect to only make it run one time to load data
    useEffect(() => {
      //Recomended i wrote a async function within params so it wont return anything
      async function loadData(){
        const data = await getData();
        console.log(data.size);
        const taskList = [];
        data.forEach((d) => {taskList.push(d.data())});
        taskList.sort((a,b) => a.id-b.id)
        setTask(taskList);
      }
      loadData();
    },[]);

    //addTask
    const addTask = (e) => {
      //prevent default case
      e.preventDefault();
      //now we prevent empty string
      if (input.trim() === "") setInput('none');
      if (title.trim() === "") return;
      const task = { id: Date.now(),title:title, text: input, done: false };
      setTask([...tasks, task]);
      addData(task);
      setInput("");
      setTitle("");
    }
    //To handle deletion
    const deleteTask = (id) => {
        //just filters thru all tasks and sees if the id matches if it does then get rid of it
        setTask(tasks.filter(t => t.id !== id));
        deleteData(id);

    }
    const toggleTask = (id) => {
        console.log(`toggling task ${id}`)
        //Checks to see if the id matches if it does then just do not task.dome if its not the right id then just do the previous value or unchanged
        setTask(tasks.map(task => task.id === id ? {...task, done: !task.done} : task))
        toggleData(tasks.find(t => t.id===id));
    }

    return (
        <div className='mx-auto w-fit'>
            <h1 className='text-center text-6xl'>
              To do
              </h1><br/>
              <div className='flex justify-center'>
            <form onSubmit={(e)=> addTask(e)
                  }>
                    
                <Input
                  
                  type='text'
                  value={title}
                  onChange = { (e) => setTitle(e.target.value)}
                  placeholder = "Add Task Title"
                  className="text-4xl p-4"
                />
                <Input
                        
                       type='text'
                       value={input}
                       onChange ={ (e) => setInput(e.target.value)}
                       placeholder="Add Task Description"
                       />
                
                <Button 
                  className='flex justify-center'
                  type='submit'>
                  Add
                </Button>
            </form>
            </div>
            <br/>
            <TaskList tasks ={tasks} onDelete ={deleteTask} onToggle ={toggleTask}/>
        </div>
    );

}

export default App;
