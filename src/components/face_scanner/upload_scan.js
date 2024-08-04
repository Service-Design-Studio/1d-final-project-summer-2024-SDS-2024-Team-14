import axiosInstance from "../../utils/axiosInstance";
import FaceCamera from './face_camera'; // Ensure the correct import path
import shortid from 'shortid';
import { ReactNotifications, Store } from "react-notifications-component";
import tickIcon from "../../../public/images/icons/tick_success.svg";
import infoIcon from "../../../public/images/icons/info.svg";
import fileIcon from "../../../public/images/icons/file_darkblue.svg";
import crossIcon from "../../../public/images/upload/cross_icon.svg";
import fileUpload from "../../../public/images/upload/file_upload.svg";
import 'react-notifications-component/dist/theme.css';
import Image from "next/image"; // Import the modal component
import { Component, createRef } from 'react';

class UploadFile extends Component {
    state = {
        selectedFiles: [],
        showModal: false,
        currentFile: null,
        capturedImage: null, // State to store the captured image
        isCameraOn: false, // State to control camera view
        isScanning: false, // State to control scanning
        capturedFrames: [], // State to store captured frames
    };

    constructor(props) {
        super(props);
        this.cameraRef = createRef(); // Create a ref for the camera
        this.intervalRef = null; // Ref for the interval
    }

    handleCapture = (image) => {
        this.setState(prevState => ({
            capturedFrames: [image, ...prevState.capturedFrames.slice(0, 4)] // Save the latest 5 frames
        }));
    }

    startScanning = () => {
        this.setState({ isScanning: true });
        // Start capturing and sending frames every second
        this.intervalRef = setInterval(() => {
            const photo = this.cameraRef.current.takePhoto(); // Capture the image from camera
            this.handleCapture(photo); // Handle the captured image
            console.log("Sending frame to backend", photo); // Placeholder for backend sending logic
        }, 1000); // 1 frame per second
    }

    stopScanning = () => {
        this.setState({ isScanning: false });
        if (this.intervalRef) {
            clearInterval(this.intervalRef); // Stop the interval
            this.intervalRef = null;
        }
    }

    toggleCamera = () => {
        this.setState((prevState) => ({ isCameraOn: !prevState.isCameraOn }), () => {
            if (this.state.isCameraOn) {
                this.startScanning(); // Start scanning if camera is turned on
            } else {
                this.stopScanning(); // Stop scanning if camera is turned off
            }
        });
    };

    render() {
        return (
            <div className="flex flex-col h-full">
                <div className="md:pt-8 pt-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col w-full md:w-1/3">
                        {/* Always render the CameraView container */}
                        <FaceCamera 
                            cameraRef={this.cameraRef} 
                            isCameraOn={this.state.isCameraOn} 
                        />

                        {/* Upload file UI taken out */}
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
                                        : "Press Begin Face Scan to start scanning"}
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

                        {/* Test to display frames -- can remove*/}
                        <div className="mt-4">
                            {this.state.capturedFrames.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold">Captured Frames:</h2>
                                    <div className="grid grid-cols-3 gap-2">
                                        {this.state.capturedFrames.map((frame, index) => (
                                            <img key={index} src={frame} alt={`Captured Frame ${index}`} className="rounded-lg border-2 border-darkblue" />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
                                onClick={this.toggleCamera}
                                className={`text-2mdd px-5 py-2 border-radius-19px rounded-md bg-[#4378DB] text-white `}
                            >
                                {this.state.isCameraOn ? (this.state.isScanning ? "Stop Face Scan" : "Begin Face Scan") : "Begin Face Scan"}
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

