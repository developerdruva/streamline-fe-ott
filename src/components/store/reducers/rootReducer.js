import { combineReducers } from "redux";
import userInfo from "./userInfo";
import auth from "./auth";

const rootReducer = combineReducers({
    userinfo : userInfo,
    isLogged : auth
})

export default rootReducer;