import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";

import {server} from '../../config';

class WebRTC extends Component {

    constructor(props) {
        super(props);


        this.state = {
            title: "Web RTC",
            record: false,
            recordedBlob : {},
            convertFileToBase64 : {}
        };

        this.getData = this.getData.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    componentDidMount() {
        // this.getData()
    };

    componentWillReceiveProps(nextProps) {
        // this.getData()
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


    // pageChange(pageData) {
    //     console.log("OnPageChange", pageData);
    // }

    convertFileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();

        axios({
            method: 'get',
            url: file.blobURL,
            responseType: 'blob'
          })
            .then(function (response) {
            //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
                // console.log("response : ", response);
                reader.readAsDataURL(response.data);
    
                reader.onload = () => resolve({
                    fileName: file.title,
                    base64: reader.result
                });
                reader.onerror = reject;
            });


        // reader.readAsDataURL(file.blobURL);
    
        // reader.onload = () => resolve({
        //     fileName: file.title,
        //     base64: reader.result
        // });
        // reader.onerror = reject;
    });

    startRecording = () => {
        this.setState({ record: true });
    }
    
    stopRecording = () => {
        this.setState({ record: false });
    }
    
    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }
    
    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState({
            recordedBlob : recordedBlob
        });
        // console.log(this.convertFileToBase64(recordedBlob));
        this.convertFileToBase64(recordedBlob)
        .then(x=>{
            console.log(x);
            this.setState({convertFileToBase64 : x});
        })
        .catch(err=>{console.log(err)})
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
                            https://dev.to/arjhun777/video-chatting-and-screen-sharing-with-react-node-webrtc-peerjs-18fg
                        </div>
                    </div>

                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

WebRTC.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(WebRTC);
