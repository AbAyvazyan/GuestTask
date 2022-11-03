import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import uuid from "react-uuid";

function SingleUser({usersObj,changeUsersState}){
    const parametr = useParams()
    const navigation = useNavigate()

    const [thisUser,setUser] = useState({})
    const [addingBoardMode,setAddingBoard] = useState(false)
    const [inputValue,setInputValue] = useState('')

    useEffect(()=>{
        usersObj.map(singleObj=>{
            return singleObj.userId === parametr.id ? setUser(singleObj) : null
        })
    },[])



    function getInputValue(e){
        return setInputValue(e.target.value)
    }

    function addBoardButtonHandler(value){
        thisUser?.boards.push({
            boardId:uuid(),
            boardName:value,
            tasks:{
                todo:[],
                doing:[],
                done:[]
            }
        })

        changeUsersState({
            type:'addBoard',
            payload: {
                id:thisUser?.userId,
                newObj : thisUser
            }
        })
        setAddingBoard(false)
    }

    function goToTasks(boardId){
        navigation(`/user${thisUser?.userId}/task${boardId}`)
    }






    return(
        <>
            {thisUser ?<>
                <button onClick={()=>setAddingBoard(true)}>Add Board</button>
                <h2 align={'center'}>Username:{thisUser?.name}</h2>
                <main className={'singleMain'}>
                    {thisUser?.boards?.map((board,index)=>{
                        return <section className={'boardSection'}  key={index} onClick={(id)=>goToTasks(board.boardId)}>
                            <h3>{board.boardName}</h3>
                            <p>More Details...</p>
                        </section>
                    })}
                </main>
            </>:null
            }

            {addingBoardMode ?
                <div className={'userAdding'}>
                <h2>Add Board</h2>
                <input type="text" className={'addUserInput'} onChange={(e)=>getInputValue(e)}/>
                <button className={'addButton'} onClick={()=>addBoardButtonHandler(inputValue)}>Enter</button>
            </div>
                :<></>}

        </>
    )
}

export default SingleUser;