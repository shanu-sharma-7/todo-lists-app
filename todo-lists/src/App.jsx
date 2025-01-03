import React, {useState , useEffect } from "react";
import "./index.css";

const App = () =>{
const [tasks , setTasks] = useState(() =>{
const savedTasks = localStorage.getItem("tasks");
return savedTasks ? JSON.parse(savedTasks) : [];
});
const [taskInput , setTaskInput] = useState("");
const [dateInput , setDateInput] = useState("");
const [editingIndex , setEditingIndex] = useState(null);

useEffect(() => {
localStorage.setItem("tasks" , JSON.stringify(tasks));
},[tasks]);

const handleAddTask = () =>{
  if (taskInput.trim() === "" || dateInput.trim() ==="") return;

const newTask = {
  text : taskInput,
  date : dateInput ,
};

if (editingIndex !==null){
  const updatedTasks = [...tasks];
  updatedTasks[editingIndex] = newTask;
  setTasks (updatedTasks);
  setEditingIndex(null);
}
else {
setTasks([...tasks , newTask]);
}
setTaskInput("");
setDateInput("");
};

const handleEditTask = (index) =>{
  setTaskInput (tasks[index].text);
  setDateInput (tasks[index].date);
  setEditingIndex (index);
};

const handleRemoveTask = (index) => {
  setTasks(tasks.filter((_, i) => i !== index ));
};

return (
  <div className="min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 flex item-center justify-center p-8">
<div className="bg-white shadow-2xl rounded-xl p-6 max-w-md w-full">
<h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Todo-List-App</h1>
<div className="flex flex-col gap-3 mb-6 ">
  <input 
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
  placeholder="Enter a new task"
  value = {taskInput}
  onChange = {(e) => setTaskInput(e.target.value)}
  />
 
 <input 
 type = "datetime-local"
 className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 "
 value = {dateInput}
  onChange = {(e) => setDateInput(e.target.value)}
  />

<button 
  onClick={handleAddTask}
  className="px-5 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
  >
    {editingIndex !==null ? "update" : "Add"}
    </button>
    </div>
    <ul className="space-y-4">
      {tasks.map((task ,index ) => (
        <li 
           key = {index}
           className=" flex flex-col bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg shadow-md"
    >
   <spam className = "text-gray-800 font-medium mb-2" > {task.text} </spam>
   <spam className = "text-gray-500 text-sm mb-2 block" > {task.date} </spam>
   <div className="flex items-center gap-3 mt-2">
    <button
    onClick={() => handleEditTask (index)}
    className="text-purple-500 hover:text-purple-700 font-semibold transition"
    > 
    Edit
    </button>
    <button 
    onClick={() => handleRemoveTask (index)}
    className="text-red-500 hover:text-red-700 font-semibold transition"
    >
      Delete
      </button>
      </div>
      </li>
      ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-6">  YOU HAVE NO TASKS.   </p>
      )}
      </div>
      </div>
);
};

export default App;


