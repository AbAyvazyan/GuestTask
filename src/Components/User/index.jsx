import {useNavigate} from "react-router";

function User({...user}){
    const navigationHandler = useNavigate()
    return(
        <div className={'userCard'} onClick={()=>navigationHandler(`/user${user.userId}`)}>
            <h2>{user.name}</h2>
            <div>More Details...</div>
        </div>
    )
}

export default User;