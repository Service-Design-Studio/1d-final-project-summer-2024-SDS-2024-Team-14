import axios from "axios";
import React, { Component } from "react";
import axiosInstance from "../../utils/axiosInstance";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Icon } from "@mui/material";
import shortid from 'shortid';
import {ReactNotifications, Store} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

const CustomFileUploadOutlinedIcon = () => {
    return (
        <FileUploadOutlinedIcon style={{ fontSize: '10vw', color: '#4378DB', opacity:'100%' }} />
    );
};

class UploadFile extends Component {
    state = {
        selectedFiles: []
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
        const { selectedCategory, router } = this.props;
        if (selectedCategory.name === "Select Category Here"){
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
        }
        else {
            const userId = localStorage.getItem('userID');
            // const category =
            const formData = new FormData();
            this.state.selectedFiles.forEach(fileObj => {
                formData.append("files[]", fileObj.file, fileObj.file.name);
            });
            formData.append("id", userId)
            formData.append("category", selectedCategory.name)

            axiosInstance.post("/document", formData).then((resp)=>{
                if (resp.status === 200 || resp.status === 201) {
                    localStorage.setItem('notificationMessage', 'You have successfully uploaded the file. Please check that the file is in your folder.');
                    localStorage.setItem('status', 'success')
                }
                else{
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
                <div className='bg-white rounded-lg shadow-md p-8 w-full'>
                    {this.state.selectedFiles.map(fileObj => (
                        <div key={fileObj.id} className="mt-4 text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] lg:text-[1vw] break-words">
                            <p>File Name: {fileObj.file.name}</p>
                            <p>File Type: {fileObj.file.type}</p>
                            <p className="mb-4">Last Modified: {fileObj.file.lastModifiedDate.toDateString()}</p>
                            <button 
                            onClick={() => this.deleteSelectedFile(fileObj.id)} 
                            className="mt-4 text-purpleblue rounded-md hover:underline">
                            Delete
                            </button>
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

    deleteSelectedFile = (id) => {
        const updatedFiles = this.state.selectedFiles.filter(fileObj => fileObj.id !== id);
        this.setState({ selectedFiles: updatedFiles });
    };

    clearAllFiles = () => {
        this.setState({ selectedFiles: [] });
    };

    render() {
        const uploadButtonClasses = (this.state.selectedFiles.length > 0)
            ? "text-lg px-5 py-2 text-white bg-purpleblue rounded-md hover:bg-purpleblue hover:text-white hover:underline"
            : "text-lg px-5 py-2 text-purpleblue bg-purpleblue bg-opacity-30 rounded-md cursor-not-allowed";
        return (
            <div className="flex flex-col ">
                <div className="justify-between items-between pt-4 md:pt-8 flex flex-col md:flex-row">
                    <label
                        className=" h-65 md:w-1/2 flex flex-col items-center justify-center border border-[#4378DB] border-dashed rounded-3xl cursor-pointer bg-[#ECF8FF] bg-opacity-40"
                    >
                        <div id="dropzone" className="w-full flex flex-col items-center justify-center py-16 lg:py-12 md:py-20">
                            <CustomFileUploadOutlinedIcon/>
                            <p className="mb-2 text-2xl md:text-2xl text-lightblue font-semibold">
                                Upload a file
                            </p>
                            <p className="mb-2 text-lg md:text-lg text-lightblue ">
                                Drag and drop or browse to choose a file
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            onChange={this.onFileChange}
                        />
                    </label>
                    <div className="font-bold rounded-xl">
                        {this.fileData()}
                    </div>
                    
                </div>
                <div className=" flex flex-col items-end md:justify-end justify-center mt-auto ">
                        <div className="flex md:space-x-4 space-x-8">
                        <button
                            onClick={this.clearAllFiles}
                            className="text-lg px-5 py-2 text-lightblue border-solid border-lightblue border-radius-19px rounded-md hover:bg-purpleblue hover:text-white">
                            Clear All
                        </button>
                        <button
                            id="upload"
                            onClick={this.onFileUpload}
                            className={uploadButtonClasses}
                            disabled={!this.state.selectedFiles}>
                            Upload
                        </button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default UploadFile;