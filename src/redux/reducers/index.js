import { combineReducers } from "redux";
import loginReducer from "../reducers/auth/login";
import signupReducer from "../reducers/auth/signup"

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer
});

export default rootReducer;
