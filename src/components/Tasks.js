import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

// child elements of a list needs a key
// state is immutable
// so when adding you would have to make a copy 
// then add extra data, it will create a brand new state
// with setTasks()
const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <React.Fragment>
            {tasks.map((task) => {
                return (
                    <Task key={task.id} 
                    task={task} 
                    onDelete={onDelete}
                    onToggle={onToggle}/>
                );
            })}
        </React.Fragment>
    )
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
}

export default Tasks
