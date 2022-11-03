import {useEffect, useState} from "react";
import {useActionData, useParams} from "react-router";
import {logDOM} from "@testing-library/react";
import uuid from "react-uuid";


export default function Tasks({objectOfUsers}){
    const parametr = useParams()
    const [thisUser,setUser] = useState({})
    const [addingTaskMode,setAddingTask] = useState(false)
    const [thisBoard,setThisBoard] = useState({tasks:{}})
    const [taskName,setTaskName] = useState('')
    const [keys,setKeys] = useState([])
    const [isAddingSection,setSectionAdding] = useState(false)
    const [inputValue,setInputValue] = useState('')

    function getInputValue(e){
        return setInputValue(e.target.value)
    }

    function addSectionButtonHandler(value){
        setThisBoard({...thisBoard,tasks:{...thisBoard.tasks,[value]:[]}})
        setSectionAdding(false)
        setInputValue('')
    }

    function addingTask(taskSection){
        setAddingTask(true)
        setTaskName(taskSection)
    }

    function addTaskButtonHandler(inputValue){
        console.log({...thisBoard,tasks:{...thisBoard.tasks,[taskName]:[{taskName,inputValue:{}}]}})
        thisBoard.tasks[taskName].push({
            taskId:uuid(),
            taskName:inputValue
        })
        setAddingTask(false)
    }

    function deleteSectionHandler(val){
        delete thisBoard.tasks[val]
        setThisBoard({...thisBoard,tasks:{...thisBoard.tasks}})
    }


    useEffect(()=>{
        objectOfUsers.map(singleObj=>{
            return singleObj.userId === parametr.id ? setUser(singleObj) : null
        })
    },[])
    //
    useEffect( ()=>{
        thisUser?.boards?.map(singleUser=>{
            return singleUser?.boardId === parametr?.boardId ? setThisBoard(singleUser) : {}
        })

    },[thisUser])

    useEffect(()=>{
         setKeys(Object.keys(thisBoard.tasks))
    },[thisBoard.tasks])



    console.log(thisBoard.tasks)
    return(
        <>
            {thisUser ?<>
                <button onClick={()=>{setSectionAdding(true)}}>Add Task</button>
                <h2 align={'center'}>Board:{thisBoard.boardName}</h2>
                <main className={'singleMain'}>
                    {keys?.map((keyOf,index)=>{
                        return <section className={'keySection'} key={index}>
                            <h2>{keyOf}</h2>
                            {thisBoard.tasks[keyOf]?.map((task,index)=>{
                                return <div className={'taskName'} key={index}>
                                    {task.taskName}
                                    <div className={'buttonGroup'}>
                                        <span className={'editButton'}>&#9998;</span>
                                        <span className={'deleteButton'}>&#9003;</span>
                                    </div>
                                </div>
                            })}

                            <button onClick={()=>addingTask(keyOf)}>Add</button><br/>
                            <button onClick={()=>deleteSectionHandler(keyOf)}>Delete</button>
                        </section>
                    })}
                </main>
            </>:null
            }

            {addingTaskMode ?
                <div className={'userAdding'}>
                    <h2>Add New Task</h2>
                    <input type="text" className={'addUserInput'} onChange={(e)=>getInputValue(e)}/>
                    <button className={'addButton'} onClick={()=>addTaskButtonHandler(inputValue)}>Enter</button>
                </div>
                :<></>}

            {isAddingSection ?
                <div className={'userAdding'}>
                    <h2>Add New Section</h2>
                    <input type="text" className={'addUserInput'} onChange={(e)=>getInputValue(e)}/>
                    <button className={'addButton'} onClick={()=>addSectionButtonHandler(inputValue)}>Enter</button>
                </div>
                :<></>}
        </>
    )
}