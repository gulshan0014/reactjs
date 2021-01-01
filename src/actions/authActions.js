import axios from "axios";
import {server} from '../config'; 
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

const serverApi = {
    "register" : server.api + '/auth/register',
    "login" : server.api + '/auth/login'
}

export const registerUser = (userData, history) => dispatch => {
    axios
        .post(serverApi.register, userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    axios
        .post(serverApi.login, userData)
        .then(res => {
            const { tokens } = res.data;
            let {access: {token} } =  tokens;
            token = "Bearer " + token;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
