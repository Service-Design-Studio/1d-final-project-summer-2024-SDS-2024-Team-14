import axios from "axios";
import React, { Component } from "react";
import axiosInstance from "../../utils/axiosInstance";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Icon } from "@mui/material";
import shortid from 'shortid';

const CustomFileUploadOutlinedIcon = () => {
    return (
        <FileUploadOutlinedIcon style={{ fontSize: '14vw', color: '#526AFF', opacity:'80%' }} />
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
        const formData = new FormData();
        this.state.selectedFiles.forEach(fileObj => {
            formData.append("files[]", fileObj.file, fileObj.file.name);
        });

        axiosInstance.post("/document", formData);
    };

    fileData = () => {
        if (this.state.selectedFiles.length > 0) {
            return (
                <div>
                    {this.state.selectedFiles.map(fileObj => (
                        <div key={fileObj.id} className="mt-4 text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] lg:text-[1vw] break-words">
                            <p>File Name: {fileObj.file.name}</p>
                            <p>File Type: {fileObj.file.type}</p>
                            <p className="mb-4">Last Modified: {fileObj.file.lastModifiedDate.toDateString()}</p>
                            {fileObj.file.type.startsWith('image/') && (
                                <img src={fileObj.preview} alt={fileObj.file.name} className='h-[80vw] md:h-[40vw] w-full'/>
                            )}
                            {fileObj.file.type === 'application/pdf' && (
                                <embed src={fileObj.preview} type="application/pdf" className="h-[80vw] md:h-[40vw] w-full"/>
                            )}
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
            <div className="flex flex-col items-center justify-center">
                <div className="pt-4 w-full md:w-11/12 md:mt-4">
                    <label
                        htmlFor="dropzone-file"
                        className="w-full flex flex-col items-center justify-center border-2 border-purpleblue border-dashed rounded-3xl cursor-pointer bg-purpleblue bg-opacity-5"
                    >
                        <div className="w-full flex flex-col items-center justify-center py-16 lg:py-12 md:py-20">
                            <CustomFileUploadOutlinedIcon/>
                            <p className="mb-2 text-lg md:text-3xl text-purpleblue font-bold">
                                Upload a file
                            </p>
                            <p className="mb-2 text-md md:text-xl text-purpleblue font-semibold">
                                Drag and drop or browse to choose a file
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={this.onFileChange}
                        />
                    </label>
                    <div className="py-5 font-bold rounded-xl">
                        {this.fileData()}
                    </div>
                    <div className="w-full flex flex-row items-end md:justify-end justify-center mt-auto py-vw-2">
                        <div className="flex md:space-x-4 space-x-8">
                        <button
                            onClick={this.clearAllFiles}
                            className="text-lg px-5 py-2 text-purpleblue border-solid border-purpleblue border-radius-19px rounded-md hover:bg-purpleblue hover:text-white">
                            Clear All
                        </button>
                        <button
                            onClick={this.onFileUpload}
                            className={uploadButtonClasses}
                            disabled={!this.state.selectedFiles}>
                            Upload
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFile;