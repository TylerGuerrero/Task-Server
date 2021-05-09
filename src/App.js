import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer';
import About from './components/About'

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTask(); 
      setTasks(tasksFromServer);
    } 

    getTasks();
  }, [])

  const fetchTask = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json();
      return data;
  }

  const fetchSingleTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const addTask = async (task) => {
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(task)
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Server Error')
      }

      return res.json();
    }).then((task) => {
      setTasks([...tasks, task])
    }).catch((err) => {
      console.log(err);
    })
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    
    setTasks(tasks.filter((task) => (task.id !== id)))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? 
    {...task, reminder: data.reminder}: task))
  }

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" 
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
        { showAddTask && <AddTask onAdd={addTask} />}
        { (tasks && tasks.length) > 0 ? 
        (<Tasks 
        tasks={tasks} 
        onDelete={deleteTask} 
        onToggle={toggleReminder}/>)
        :(<h1>No Tasks available</h1>)}  
        <Route exact path="/" render={(props) => (
          <React.Fragment>
              { showAddTask && <AddTask onAdd={addTask} />}
              { (tasks && tasks.length) > 0 ? 
              (<Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder}/>)
              :(<h1>No Tasks available</h1>)}  
          </React.Fragment>
        )}/>
        <Route path="/about" component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;