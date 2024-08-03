import axios from "axios";
import React, { Component, createRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import FaceCamera from './face_camera.js'; // Import the CameraView component
import shortid from 'shortid';
import { ReactNotifications, Store } from "react-notifications-component";
import tickIcon from "../../../public/images/icons/tick_success.svg";
import infoIcon from "../../../public/images/icons/info.svg";
import fileIcon from "../../../public/images/icons/file_darkblue.svg";
import crossIcon from "../../../public/images/upload/cross_icon.svg";
import fileUpload from "../../../public/images/upload/file_upload.svg";
import 'react-notifications-component/dist/theme.css';
import Image from "next/image"; // Import the modal component

class UploadFile extends Component {
    state = {
        selectedFiles: [],
        showModal: false,
        currentFile: null,
        capturedImage: null // State to store the captured image
    };

    constructor(props) {
        super(props);
        this.cameraRef = createRef(); // Create a ref for the camera
    }
    
    handleCapture = (image) => {
        this.setState({ capturedImage: image });
        // You can also manage the captured image here, like uploading it, displaying in the UI, etc.
    }

    render() {
        return (
            <div className="flex flex-col h-full">
                <div className="md:pt-8 pt-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col w-full md:w-1/3">
                        <FaceCamera cameraRef={this.cameraRef} setImage={this.handleCapture} />
                        {/* Upload file taken out */}
                    </div>
                    <div className="md:w-1/2 flex flex-col overflow-y-auto pt-4">
                        <p className='ml-auto text-[3.5vw] md:text-[1.3vw] my-3'>
                            The face scanning allows us to expedite the verification of your identity.
                        </p>
                        <p className='md:my-2 text-[3.5vw] md:text-[1.3vw] my-3'>
                            Please enable your camera to proceed with the face scanning. Face forward and look directly into the camera. Please keep your face in the frame.
                        </p>
                        <div className="flex md:space-x-4 space-x-8 justify-end pt-5">
                            <button
                                onClick={() => { /* placeholder to start scan */ }}
                                className={`text-2mdd px-5 py-2 border-radius-19px rounded-md ${this.state.selectedFiles.length > 0 ? "bg-[#4378DB] text-white hover:bg-darkblue transition-all duration-200 ease-in-out" : "bg-gray text-white cursor-not-allowed"
                            }`}
                            >
                                Begin Face Scan
                            </button>
                        </div>
                        <div className="flex justify-end pt-5">
                            <button
                                onClick={() => { /* placeholder for next page */ }}
                                className={`text-2mdd text-semibold text-[#4378DB] underline py-2 border-radius-19px rounded-md`}
                            >
                                Skip Face Scan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFile;