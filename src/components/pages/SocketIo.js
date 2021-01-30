import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";

import socketIOClient from "socket.io-client";

import {server} from '../../config';
let socket;

class SocketIo extends Component {

    constructor(props) {
        super(props);


        this.state = {
            title: "Socket.io",
            name : "",
            nsp: "",
            nsp_current : "",
            room: '',
            room_current : "",
            message:"",
            data : ""

        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handle_nspSocketConnection = this.handle_nspSocketConnection.bind(this);
        this.handle_msg = this.handle_msg.bind(this);
        this.handle_joinRoom = this.handle_joinRoom.bind(this);
    }

    componentDidMount() {};

    componentWillReceiveProps(nextProps) {
        // this.getData()
    }

    componentWillUnmount() {
        if(socket) {
            socket.disconnect();
            this.setState({"nsp_current" : ""});
        }
    }

    getData() {
        // axios
        //     .get(server.api + "/users/")
        //     .then(res => {
        //         this.setState({ records: res.data.results});
        //         // console.log("state : ", this.state, this.columns)
        //     })
        //     .catch()
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handle_nspSocketConnection(event) {
        // alert('A room name was submitted: ' + this.state.roomName);
        console.log("room Id submit :",this.state.nsp);
        event.preventDefault();
        if(socket) socket.disconnect();

        socket = socketIOClient(server.ENDPOINT + "/" + this.state.nsp , { transport : ['websocket'] });


        socket.on("connect", () => {
            console.log("socket :",socket)
            console.log("socketId :",socket.id);
            this.setState({
                "nsp" : "",
                "nsp_current" : this.state.nsp,
                "room" : "",
                "room_current" : ""
            });
        });

        socket.on("FromAPI", data => { this.setState({data}) });

        socket.on("message", (data)=>{ toast(JSON.stringify(data)); console.log(" message => ",data) });

        socket.on("user connected", (data)=>{ toast(JSON.stringify(data)); console.log(" user connected => ",data) });

        socket.on("user disconnected", (data)=>{ toast(JSON.stringify(data)); console.log(" user disconnected => ",data) });

        socket.on("disconnected", (data)=>{ toast(JSON.stringify(data)); console.log(" disconnected => ",data) });

        socket.on("join room success", (data)=>{ toast(JSON.stringify(data)); console.log(" join room success => ",data) });

        socket.on("nsp client", (data)=>{ toast(JSON.stringify(data)); console.log(" nsp client => ",data) });
    }

    handle_joinRoom(event){
        event.preventDefault();
        if(socket) {
            socket.emit("join room", {
                    "room": this.state.room,
                    "name" : this.state.name
                }
            );

            this.setState({
                "room" : "",
                "room_current" : this.state.room
            });
        }
        else alert('No Socket connection yet');
    }

    handle_msg(event){
        event.preventDefault();
        if(socket) socket.emit("room message", {msg : this.state.message});
        else alert('Room is Not connected');
        this.setState({message : ""});
    }



    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>

                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h1 className="mt-2 text-primary">{this.state.title}</h1>
                            Timer {this.state.data}<br></br>
                            Name : {this.state.name} <br></br>
                            nsp : {this.state.nsp_current}<br></br>
                            room : {this.state.room_current}
                        </div>

                        <form onSubmit={this.handle_nspSocketConnection}>
                            <label>
                                Name Spaces :
                                <input type="text" id="nsp" value={this.state.nsp} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>

                        <form onSubmit={this.handle_joinRoom}>
                            <label>
                                User Name :
                                <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            <label>
                                Room Name :
                                <input type="text" id="room" value={this.state.room} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>

                        <form onSubmit={this.handle_msg}>
                            <label>
                                Msg in Room:
                                <input type="text" id="message" value={this.state.message} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Send" />
                        </form>

                    </div>

                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

SocketIo.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(SocketIo);
