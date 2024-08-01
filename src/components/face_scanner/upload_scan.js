// This file is imported as uploadFile in face-scanner

import axios from "axios";
import React, { Component } from "react";
import axiosInstance from "../../utils/axiosInstance";
import shortid from 'shortid';
import { ReactNotifications, Store } from "react-notifications-component";
import tickIcon from "../../../public/images/icons/tick_success.svg"
import infoIcon from "../../../public/images/icons/info.svg"
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
    };

    onFileChange = (event) => {
        const files = Array.from(event.target.files);
        const updatedFiles = files.map(file => ({
            id: shortid.generate(),
            file: file,
            preview: URL.createObjectURL(file)
        }));

        this.setState({
            selectedFiles: [...this.state.selectedFiles, ...updatedFiles]
        });
    };

    onFileUpload = () => {
        const { selectedCategory, router, selectedLanguage } = this.props;
        if (!selectedCategory){
            Store.addNotification({
                title: "Error",
                message: "Please choose a category first before uploading",
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
        } else {
            const userId = localStorage.getItem('userID');
            const formData = new FormData();
            this.state.selectedFiles.forEach(fileObj => {
                formData.append("files[]", fileObj.file, fileObj.file.name);
            });
            formData.append("id", userId)
            formData.append("category", selectedCategory)
            formData.append("language", selectedLanguage)

            axiosInstance.post("/document", formData).then((resp) => {
                if (resp.status === 200 || resp.status === 201) {
                    localStorage.setItem('notificationMessage', 'You have successfully uploaded the file. Please check that the file is in your folder.');
                    localStorage.setItem('status', 'success')
                } else {
                    localStorage.setItem('notificationMessage', 'There was an error uploading the file. Please contact your administrator for help.');
                    localStorage.setItem('status', 'error')
                }
                router.push("/documents")
            })
        }
    };

    fileData = () => {
        if (this.state.selectedFiles.length > 0) {
            return (
                <div className='w-full'>
                    {this.state.selectedFiles.map(fileObj => (
                        <div key={fileObj.id} className="mt-4 text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] lg:text-[1vw] break-words">
                            <div
                                className="bg-[#F3FBFF] rounded-lg shadow-md px-4 md:py-2 py-4 flex justify-start items-center cursor-pointer hover:bg-lightblue preview"
                                onClick={() => this.handleCardClick(fileObj)}
                            >
                                <Image className="md:w-[3vw] w-[7.5vw]" src={fileIcon} alt="file icon"/>
                                {/*<FontAwesomeIcon icon={faFileText} />*/}
                                <p className="pl-3 pr-5 font-semibold text-lightblue text-[3.5vw] sm:text-[3.5vw] md:text-lg lg:text-[1.1vw] flex-grow">File Name: {fileObj.file.name}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from bubbling to the card
                                        this.deleteSelectedFile(fileObj.id);
                                    }}
                                    className="text-darkblue rounded-md flex justify-end ml-auto hover:text-lightblue "
                                >
                                    <Image className="md:w-[1.7vw] w-[4.5vw]" src={crossIcon} alt="cross icon"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center">
                </div>
            );
        }
    };

    handleCardClick = (fileObj) => {
        this.setState({ showModal: true, currentFile: fileObj });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, currentFile: null });
    };

    deleteSelectedFile = (id) => {
        const updatedFiles = this.state.selectedFiles.filter(fileObj => fileObj.id !== id);
        this.setState({ selectedFiles: updatedFiles });
    };

    clearAllFiles = () => {
        this.setState({ selectedFiles: [] });
    };

    render() {
        const uploadButtonClasses = (this.state.selectedFiles.length > 0)
            ? "text-lg px-5 py-2 text-white bg-darkblue rounded-lg hover:bg-[#4378DB] hover:text-white hover:underline"
            : "text-lg px-5 py-2 text-darkblue bg-darkblue bg-opacity-30 rounded-md cursor-not-allowed";
    
        return (
            <div className="flex flex-col h-full">
                <div className="md:pt-8 pt-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col w-full md:w-1/3">
                    {/* File Category Zone */}
                        <label className="flex flex-col items-center justify-center border border-[#4378DB] border-dashed rounded-3xl cursor-pointer bg-[#ECF8FF] bg-opacity-40 py-4">
                            {this.state.selectedFiles.length === 0 ? (
                                <div className="dropzone w-full flex flex-col items-center justify-center md:py-20 ">
                                    <Image className="w-[15vw] md:w-[6.5vw]" src={fileUpload} alt="file Upload" />
                                    <p className="mb-2 mt-2 text-xl md:text-2xl text-lightblue font-semibold">
                                        Upload a file
                                    </p>
                                    <p className="mb-2 text-[3.5vw] md:text-lg text-lightblue">
                                        Drag and drop to choose a file
                                    </p>
                                </div>
                            ) : (
                                <div className="dropzone w-full flex flex-col items-center justify-center md:py-20">
                                    <img src={this.state.selectedFiles[0].preview} alt="file preview" className="w-full h-full object-cover rounded-3xl" />
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                onChange={this.onFileChange}
                            />
                            {this.state.selectedFiles.length === 0 && (
                                <h1 className="text-lightblue text-md md:text-[1.2vw]">
                                    Files Supported: JPEG or PNG
                                </h1>
                            )}
                        </label>

                        {/**Upload Notice */}
                        <div className="flex flex-col w-full mt-4">
                            <div className="flex items-center space-x-2 md:space-x-4 rounded-md bg-[#E3E3E3] w-full p-2">
                                <Image 
                                    className="w-[8vw] md:w-[2vw]" 
                                    src={this.state.selectedFiles.length > 0 ? tickIcon : infoIcon} 
                                    alt="info icon"
                                />

                                {/* Dynamic message based on file upload status */}
                                <p className="flex-grow pt-0.75 font-semibold text-lightblue text-[3.5vw] sm:text-[3.5vw] md:text-lg lg:text-[1.1vw]">
                                    {this.state.selectedFiles.length > 0 
                                        ? `File Name: ${this.state.selectedFiles[0].file.name}` 
                                        : "Your camera device is not enabled"}
                                </p>

                                {this.state.selectedFiles.length > 0 && (
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
                        <p className='ml-auto text-[3.5vw] md:text-[1.3vw] my-3'>The face scanning allows us to expedite the verification of your identity.</p>
                        <p className='md:my-2 text-[3.5vw] md:text-[1.3vw] my-3'>Please enable your camera to proceed with the face scanning. Face forward and look directly into the camera. Please keep your face in the frame.</p>
                        <div className="flex md:space-x-4 space-x-8 justify-end pt-5">
                        <button
                            onClick={() => {}}
                            className={`text-2mdd px-5 py-2  
                            border-radius-19px rounded-md ${this.state.selectedFiles.length > 0 ? "bg-[#4378DB] text-white hover:bg-darkblue transition-all duration-200 ease-in-out" : "bg-gray text-white cursor-not-allowed"
                            }`}
                        >
                            Begin Face Scan
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFile;