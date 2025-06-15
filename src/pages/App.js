import {useState, useEffect } from 'react';
import TaskList from './TaskList.js';
import {toggleData, getData, addData,deleteData} from './DataBase.js';
import {LogOutBar} from './Login.js';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea} from "@/components/ui/textarea";
import Cookies from 'js-cookie';
function App({logOutAction}){
    //Task data
    const [tasks, setTask] = useState([]);
    const [input,setInput] = useState('');
    const [title,setTitle] = useState('');
    const [username, setUsername] = useState('null');
    //Load the username once mounted as we really only need to check once
    //We will have to do ascociated with a username
    //Use effect to only make it run one time to load data
    
      useEffect(() => {
        //Check what username we have
        const user = Cookies.get('user');
        setUsername(user);
        //Recomended i wrote a async function within params so it wont return anything
        async function loadData() {
          const data = await getData(user);
          console.log(data.size);
          const taskList = [];
          data.forEach((d) => {
            taskList.push(d.data());
          });
          taskList.sort((a, b) => a.id - b.id);
          setTask(taskList);
        }
        //If the username is 'null' it means they are logged out and nothing will save
        if (user !== "null") loadData();
      }, []);
    
    //addTask
    const addTask = (e) => {
      //prevent default case
      e.preventDefault();
      //now we prevent empty string
      if (title.trim() === "") return;
      if (input.trim() === "") setInput('none');
      const task = { id: Date.now(),title:title, text: input, done: false };
      setTask([...tasks, task]);
      addData(username,task);
      setInput("");
      setTitle("");
    }
    //To handle deletion
    const deleteTask = (id) => {
        //just filters thru all tasks and sees if the id matches if it does then get rid of it
        setTask(tasks.filter(t => t.id !== id));
        deleteData(username,id);

    }
    const toggleTask = (id) => {
        console.log(`toggling task ${id}`)
        //Checks to see if the id matches if it does then just do not task.dome if its not the right id then just do the previous value or unchanged
        setTask(tasks.map(task => task.id === id ? {...task, done: !task.done} : task));
        //TODO: Add local storage as to when the site is unloaded it submits the minor things
        toggleData(username,tasks.find(t => t.id===id));
    }

    return (
        
        <div className='mx-auto w-fit p-0'>
            <h1 className='text-center text-6xl pt-6 pb-1'>
              ToDo📋
              </h1>
              <LogOutBar logOutAction={logOutAction}/>
              <div className='flex justify-center'>
                <form className ='flex flex-col items-center'onSubmit={(e)=> addTask(e)
                      }>
                        
                    <Input
                      
                      type='text'
                      value={title}
                      onChange = { (e) => setTitle(e.target.value)}
                      className="!text-xl p-4 h-10"
                      placeholder = "Add Task Title"
                      
                    />
                    <Textarea
                            
                          type='text'
                          value={input}
                          onChange ={ (e) => setInput(e.target.value)}
                          placeholder="Add Task Description"
                          className = "mt-2"
                          />
                    
                    <Button 
                      //Make the background green only if it has avalid card/has a title
                      className={`w-full transition-all duration-300 hover:${title?`bg-green-600`:'none'}`}
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
