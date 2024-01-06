import axios from 'axios';

export const loginCall = async(userCrendentials, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post("/api/auth/login", userCrendentials);
        dispatch({type: "LOGIN_SUCCESS", payload:  res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
};