import axios from "axios";
import React, { Component } from "react";
import axiosInstance from "../../utils/axiosInstance";
import shortid from 'shortid';
import { ReactNotifications, Store } from "react-notifications-component";
import tickIcon from "../../../public/images/icons/tick_success.svg"
import infoIcon from "../../../public/images/icons/info.svg"
import fileUpload from "../../../public/images/upload/file_upload.svg";
import 'react-notifications-component/dist/theme.css';
import Image from "next/image";
import {useRouter} from "next/router"; // Import the modal component

class Upload extends Component {
    state = {
        selectedFile: null,
        showModal: false,
        currentFile: null,
    };

    onFileChange = (event) => {
        if (event.target.files.length > 1) {
            Store.addNotification({
                title: "Error",
                message: "Please only upload one file or photo",
                type: "danger",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
        else {
            const updatedFile = {
                id: shortid.generate(),
                file: event.target.files[0],
                preview: URL.createObjectURL(event.target.files[0]),
            };
            this.setState({ selectedFile: updatedFile });
        }
    };

    onFileUpload = () => {
        const {router} = this.props;
        const userId = localStorage.getItem('userID');
        const formData = new FormData();
        formData.append("photo", this.state.selectedFile.file, this.state.selectedFile.file.name);
        formData.append("id", userId)

        axiosInstance.post("/authentication/upload", formData).then((resp) => {
            // add notification
            router.push("/verify")
        })
    };

    clearAllFiles = () => {
        this.setState({ selectedFile: null });
    };

    render() {
        return (
            <div className="flex flex-col h-full">
                <div className="md:pt-8 pt-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col w-full md:w-1/3">
                    {/* File Category Zone */}
                        <label className="flex flex-col items-center justify-center border border-[#4378DB] border-dashed rounded-3xl cursor-pointer bg-[#ECF8FF] bg-opacity-40">
                            {this.state.selectedFile === null ? (
                                <>
                                <div className="dropzone w-full flex flex-col items-center justify-center md:py-20 ">
                                    <Image className="w-[15vw] md:w-[6.5vw]" src={fileUpload} alt="file Upload" />
                                    <p className="mb-2 mt-2 text-xl md:text-2xl text-lightblue font-semibold">
                                        Upload a file
                                    </p>
                                    <p className="mb-2 text-[3.5vw] md:text-lg text-lightblue">
                                        Drag and drop to choose a file
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    onChange={this.onFileChange}
                                />
                                <h1 className="text-lightblue text-md md:text-[1.2vw]">
                                    Files Supported: JPEG or PNG
                                </h1>
                                </>
                                ) : (
                                <div className="dropzone w-full flex flex-col items-center justify-center">
                                    <img src={this.state.selectedFile.preview} alt={this.state.selectedFile.file.name} className='w-full h-fit object-contain rounded-3xl' />
                                </div>
                            )}
                        </label>

                        {/**Upload Notice */}
                        <div className="flex flex-col w-full mt-4">
                            <div className="flex items-center space-x-2 md:space-x-4 rounded-md bg-[#E3E3E3] w-full p-2">
                                <Image 
                                    className="w-[8vw] md:w-[2vw]" 
                                    src={this.state.selectedFile !== null ? tickIcon : infoIcon}
                                    alt="info icon"
                                />

                                {/* Dynamic message based on file upload status */}
                                <p className="flex-grow pt-0.75 font-semibold text-lightblue text-[3.5vw] sm:text-[3.5vw] md:text-lg lg:text-[1.1vw]">
                                    {this.state.selectedFile !== null
                                        ? `File Name: ${this.state.selectedFile.file.name}`
                                        : "No Image Uploaded"}
                                </p>

                                {this.state.selectedFile !== null && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent the label's onClick event
                                            this.clearAllFiles();
                                        }}
                                        className="border-radius-19px bg-[#4378DB] text-[3.5vw] sm:text-[3.5vw] md:text-lg lg:text-[1.1vw] px-5 py-2 text-white rounded-lg hover:bg-darkblue transition-all duration-200 ease-in-out"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className ="md:w-1/2 flex flex-col overflow-y-auto pt-4 ">
                        <p className='ml-auto text-[3.5vw] md:text-[1.3vw] my-3'>Please upload a clear image of your face. Ensure that all facial features are unobstructed.</p>
                        <p className='md:my-2 text-[3.5vw] md:text-[1.3vw] my-3'>This image will subsequently be compared to a face scan to speed up the verification process.</p>
                        <p className='md:my-2 text-[3.5vw] md:text-[1.3vw] my-3'>Please click proceed only after your image has been uploaded</p>
                        <div className="flex md:space-x-4 space-x-8 justify-end pt-5">
                        <button
                            onClick={this.onFileUpload}
                            className={`text-2md px-5 py-2  
                            border-radius-19px rounded-md ${this.state.selectedFile !== null ? "bg-[#4378DB] text-white hover:bg-darkblue transition-all duration-200 ease-in-out" : "bg-gray text-white cursor-not-allowed"
                            }`}
                        >
                            Proceed to Face Scan
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;