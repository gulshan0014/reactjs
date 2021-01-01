import axios from "axios";
import {server} from '../config'; 
import {
    GET_ERRORS,
    USER_ADD,
    USER_UPDATE
} from "./types";

const serverApi = {
    "user-add" : server.api + '/users/user-add',
    "user-update" : server.api + '/users/user-update'
}


export const addUser = (userData, history) => dispatch => {
    axios
        .post(serverApi["user-add"], userData)
        .then(res =>
            dispatch({
                type: USER_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateUser = (userData) => dispatch => {
    axios
        .post(serverApi["user-update"], userData)
        .then(res =>
            dispatch({
                type: USER_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
