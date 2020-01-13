import * as actionCreater from './../Action/actionCreater'
let initialState = {
    loggedInUser:{}
    //LoginUser:[]
}
const loginReducers = (state=initialState,action) =>  {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "LOGIN":
            newState.loggedInUser = action.payload.user;
            return newState;
            
    }
return state
}
export default loginReducers;