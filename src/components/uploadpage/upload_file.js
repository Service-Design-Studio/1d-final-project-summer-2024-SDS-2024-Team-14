import axios from "axios";
import React, { Component } from "react";
import axiosInstance from "../../utils/axiosInstance";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Icon } from "@mui/material";

class UploadFile extends Component {
    state = {
        // Initially, no file is selected
        selectedFile: null,
    };

    // On file select (from the pop up)
    onFileChange = (event) => {
        // Update the state
        this.setState({
            selectedFile: event.target.files[0],
        });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);

    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center">
                </div>
            );
        }
    };

    render() {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-md p-4">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-purpleblue border-dashed rounded-lg cursor-pointer bg-purpleblue bg-opacity-10 z-0 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileUploadOutlinedIcon className="w-100 h-100 text-purpleblue"/>
                            <p className="mb-2 text-xl text-purpleblue">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-md text-purpleblue">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={this.onFileChange}
                        />
                    </label>
                    <div className="py-6"></div>
                    <button
                        onClick={this.onFileUpload}
                        className="w-full py-2 text-purpleblue border-2 border-solid border-purpleblue  border-radius-19px rounded-md hover:bg-purpleblue hover:text-white hover:underline"
                    >
                        Upload
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default UploadFile;