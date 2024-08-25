import React, { useState } from "react";

function MyTodo(){

    const [list, setList] = useState([])
    const [todo, setTodo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if(todo.length>0){
            setList([...list,{id:list.length+1, task: todo, complete: false}])
        }
        setTodo('')
        // console.log(list);
    }
    const handleCheckBox = (index) => {
        setList( prevList => {
            return prevList.map((task, i) => 
                 i == index ? {...task, complete: !task.complete} : task
            );
        })
        console.log(list[index]);
    }
    const handleDelete = (index) => {
        setList( prevList => prevList.filter( (a,i) => i != index ));
    }

    const renderList = list.map( (task,index) => {
       return <li key={index} className="task" style={{backgroundColor: task.complete ? '#00ff80' : 'transparent'}}>
        
        <input type="checkbox" defaultChecked={task.complete} onClick={() => handleCheckBox(index)}/>
        <div className="taskContent1">
            {window.innerWidth > 592 ? task.task : task.task.length > 10 ? task.task.slice(0, 10) + '...' : task.task}
            {/* {task.task.length > 10 ? task.task.slice(0, 10) + '...' : task.task} */}
        </div>
        <button className="deleteBtn" onClick={() => handleDelete(index)}>-</button>

        </li>
    } )

    return(<div className="mainContainer">
        
        <h1>My Todo</h1>
        <form className="inputField">
            <input type="text" 
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>Add</button>
        </form>
        <div className="taskContainer">
            <h3>Task List</h3>
            <ul className="taskList">
                {renderList.reverse()}
                {list.length > 8 ? <li style={{border:'none'}}></li> : ''}  
                {/* ReasonToUse : whenevery list length = 9 the bottom element only half visible & scroll doens't work at this length */}
            </ul> 
        </div>
        <hr />
        <p className="taskCount"> Task Completed = {list.filter(task => task.complete).length}/{list.length}</p>
    </div>);
}

export default MyTodo;