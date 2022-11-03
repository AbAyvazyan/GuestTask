import './App.css';

import uuid from 'react-uuid'
import {useContext,useEffect,useState,useReducer} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import User from './Components/User'
import SingleUser from "./Components/singleUser";
import Tasks from "./Components/tasks";

function reducer(state,action){
  switch (action.type){
    case 'add' :
      return [...state,{
      userId:uuid(),
      name:action.payload.name,
      boards: []
    }];
    case 'addBoard':
      return state.map(statment=>{
        return statment.userId === action.payload.id ? action.payload.newObj : statment
      })
  }

}

function App() {

  const [inputValue,setInputValue] = useState('')
  const [isAddingUser,setUserAdding] = useState(false)


  const [users,dispatch] = useReducer(reducer,[{
    userId:'47cf5e8f-ee51-9ef3-43ec-f63ca5db05d9',
    name:'Vardges',
    boards: [{
      boardId:'d532f56b-919b-ec6d-e05e-e177162f3e02',
      boardName:'English',
      tasks:{
        todo:[{taskId:'945c1257-c9c0-9d31-af5d-1584aa58f588',taskName:'grammer'}],
        doing:[{taskId:'ee82711e-7f28-1e0a-4b42-5747b077f67a',taskName:'readeing'}],
        done:[{taskId:'55c3b31e-b477-5287-4689-94980ad70c80',taskName:'listening'}]
      }
    }]
  }])

  function getInputValue(e){
     return setInputValue(e.target.value)
  }

  function addUserHandler(nameValue){
    if (nameValue !== ''){
      dispatch({
        type:'add',
        payload:{
          name:nameValue
        }
      })
    }
    setUserAdding(false)
  }


  return (

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<>
            <button className={'addButton'} onClick={()=>setUserAdding(true)}>Add User</button>
            <main className={'userMain'}>
              {users.map((user,index)=>{
                return  <User key={index} {...user}/>
              })}
            </main>

            {isAddingUser ?
                <div className={'userAdding'}>
              <h2>Add user</h2>
              <input type="text" className={'addUserInput'} onChange={getInputValue}/>
              <button className={'addButton'} onClick={()=>addUserHandler(inputValue)}>Enter</button>
            </div>
                :<></>}
          </>}>
          </Route>
          <Route path={'/user:id'} element={<SingleUser usersObj={users} changeUsersState={dispatch}/>}></Route>
          <Route path={'/user:id/task:boardId'} element={<Tasks objectOfUsers={users} />}></Route>
        </Routes>
      </BrowserRouter>



  );
}

export default App;
