import axiosInstance from "../../utils/axiosInstance";
import FaceCamera from './face_camera'; // Ensure the correct import path
import { ReactNotifications, Store } from "react-notifications-component";
import tickIcon from "../../../public/images/icons/tick_success.svg";
import infoIcon from "../../../public/images/icons/info.svg";
import 'react-notifications-component/dist/theme.css';
import Image from "next/image"; // Import the modal component
import { Component, createRef } from 'react';
import { withRouter } from 'next/router';

class UploadScan extends Component {
    state = {
        selectedFiles: [],
        showModal: false, // State for showing the modal
        currentFile: null,
        capturedImage: null, 
        isCameraOn: false,
        isMatched: false, // State to store verification result
        scanningText: "Please enable your camera to proceed with the face scanning. Face forward and look directly into the camera. Please keep your face in the frame.", 
        countdown: 15, // State for the countdown timer
        showSuccessUI: false // State to toggle the success UI
    };

    constructor(props) {
        super(props);
        this.cameraRef = createRef(); // Create a ref for the camera
        this.intervalRef = null;
        this.timeoutRef = null;
        this.countdownRef = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isMatched !== this.state.isMatched) {
            if (this.state.isMatched) {
                console.log("User verified, showing success UI.");
                if (this.intervalRef) {
                    clearInterval(this.intervalRef);
                    this.intervalRef = null;
                }
                if (this.timeoutRef) {
                    clearTimeout(this.timeoutRef);
                    this.timeoutRef = null;
                }
                if (this.countdownRef) {
                    clearInterval(this.countdownRef);
                    this.countdownRef = null;
                }
                this.setState({ showSuccessUI: true }); // Show success UI
            }
        }
    }

    handleCapture = async (image) => {
        const userID = localStorage.getItem("userID");
        try {
            const resp = await axiosInstance.post(`/authentication/verify`, { frame: image, id: userID });
            this.setState({ isMatched: resp.data.matched });
        } catch (error) {
            console.error(error.message);
        }
    }

    startScanning = () => {
        this.setState({ 
            isCameraOn: true,
            scanningText: "Please do not move while face scanning is in progress. The scan will be completed soon.", 
            countdown: 15
        });
    
        this.intervalRef = setInterval(() => {
            const photo = this.cameraRef.current.takePhoto(); // Capture the image from camera
            this.handleCapture(photo); // Handle the captured image
        }, 3000); 
    
        this.timeoutRef = setTimeout(() => {
            this.stopScanning(
                        <div className="flex items-start">
                            <Image src={infoIcon} alt="Failed Icon" className="w-9 h-9 mr-2" />
                            <div className="flex-col">
                                <p>Face verification failed. Your face did not match the submitted passport photo.</p>
                                <p className="pt-4">Please try again or skip Face Scan for now.</p>
                            </div>
                        </div>
                    ); // Stop scanning with no match after the timeout
        }, 15000); 
    
        this.countdownRef = setInterval(() => {
            this.setState(prevState => ({ countdown: prevState.countdown - 1 }));
        }, 1000);
    }

    stopScanning = (text) => {
    
        this.setState({
            scanningText: text,
            countdown: 15,
            isCameraOn: false // Turn off the camera
        });
    
        if (this.intervalRef) {
            clearInterval(this.intervalRef);
            this.intervalRef = null;
        }
        if (this.timeoutRef) {
            clearTimeout(this.timeoutRef);
            this.timeoutRef = null;
        }
        if (this.countdownRef) {
            clearInterval(this.countdownRef);
            this.countdownRef = null;
        }
    }

    toggleCamera = () => {
        this.setState((prevState) => ({ isCameraOn: !prevState.isCameraOn }), () => {
            if (this.state.isCameraOn) {
                this.startScanning(); // Start scanning if camera is turned on
            } else {
                this.stopScanning("Please enable your camera to proceed with the face scanning. Face forward and look directly into the camera. Please keep your face in the frame."); // Stop scanning if camera is turned off
            }
        });
    };

    // Function to handle skip button
    handleSkip = () => {
        this.setState({ showModal: true }); // Show the confirmation modal
    }

    // Function to confirm skipping the scan
    confirmSkip = () => {
        this.setState({ showModal: false }); // Show success UI and close the modal
        this.props.router.push('../../'); // Adjust path later to homepage
    }

    // Function to cancel skipping the scan
    cancelSkip = () => {
        this.setState({ showModal: false }); // Close the modal
    }

    renderHeader() {
        return (
            <div className="flex flex-row justify-between">
                <div className="inline-block">
                    <h1 className='text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]'>Face Scanner</h1>
                    <p className='md:my-2 text-[4vw] md:text-[1.5vw] my-4'>Please enable camera on your device to proceed</p>
                </div>
            </div>
        );
    }

    renderSuccessUI() {
        return (
            <div className='p-4 text-darkblue'>
                <div className="flex flex-row justify-between">
                    <div className="inline-block">
                        <h1 className='text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]'>Successfully Verified Face Scan</h1>
                        <div className="flex flex-row items-start">
                            <Image src={tickIcon} className="w-[10vw] md:w-[5vw] lg:w-[4vw] xl:w-[3vw] ml-4 md:my-10" alt="Success Icon" />
                            <div className="flex flex-col pl-5">
                                <p className='pt-9 text-[4vw] md:text-[1.5vw] my-2'>Your passport photo has been successfully verified with your face scan.</p>
                                <p className='text-[4vw] md:text-[1.5vw]'>Welcome to Enable ID. Please click ‘proceed’ to enter the home page.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-5">
                    <button
                        onClick={() => this.props.router.push('../../')}
                        className={`text-2mdd px-5 py-2 border-radius-19px rounded-md bg-[#4378DB] text-white`}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        );
    }


    render() {
        // If the success UI should be displayed
        if (this.state.showSuccessUI) {
            return this.renderSuccessUI();
        }

        return (
            <div className="flex flex-col h-full">
                {this.renderHeader()} {/* Render the header */}
                <div className="md:pt-8 pt-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col w-full md:w-1/3">
                        <FaceCamera 
                            cameraRef={this.cameraRef} 
                            isCameraOn={this.state.isCameraOn} 
                        />
                        <div className="flex flex-col w-full mt-4">
                            <div className="flex items-center space-x-2 md:space-x-4 rounded-md bg-[#E3E3E3] w-full p-2">
                                <Image 
                                    className="w-[8vw] md:w-[2vw]" 
                                    src={this.state.selectedFiles.length > 0 ? tickIcon : infoIcon} 
                                    alt="info icon"
                                />
                                <p className="flex-grow pt-0.75 font-semibold text-lightblue text-[3.5vw] sm:text-[3.5vw] md:text-lg lg:text-[1.1vw]">
                                    {this.state.selectedFiles.length > 0 
                                        ? `File Name: ${this.state.selectedFiles[0].file.name}` 
                                        : "Press Begin Face Scan to start scanning"}
                                </p>
                                {this.state.selectedFiles.length > 0 && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            this.clearAllFiles();
                                        }}
                                        className="border-radius-19px bg-[#4378DB] text-[3.5vw] sm:text-[3.5vw] md:text-lg lg:text-[1.1vw] px-5 py-2 text-white rounded-lg hover:bg-darkblue transition-all duration-200 ease-in-out"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            {this.state.isCameraOn && (
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className='font-bold text-[3.5vw] md:text-[3vw] my-3'>
                                        {this.state.countdown}s...
                                    </h2>
                                    <p className="text-bold">Verification in Progress...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col overflow-y-auto pt-4">
                        {!this.state.isCameraOn && this.state.isMatched !== false && (
                            <p className='ml-auto text-[3.5vw] md:text-[1.3vw] my-3'>
                                The face scanning allows us to expedite the verification of your identity.
                            </p>
                        )}
                        <p className='md:my-2 text-[3.5vw] md:text-[1.3vw] my-3'>
                            {this.state.scanningText}
                        </p>

                        <div className="flex md:space-x-4 space-x-8 justify-end pt-5">
                            <button
                                onClick={this.toggleCamera}
                                className={`text-2md px-5 py-2 border-radius-19px rounded-md bg-[#4378DB] text-white `}
                            >
                                {this.state.isCameraOn? "Stop Face Scan" : "Begin Face Scan"}
                            </button>
                        </div>
                        <div className="flex justify-end pt-5">
                            <button
                                onClick={this.handleSkip}  // Handle Skip
                                className={`text-2mdd text-semibold text-[#4378DB] underline py-2 border-radius-19px rounded-md`}
                            >
                                Skip Face Scan
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.showModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 border border-darkblue">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to skip?</h2>
                        <p className="pt-2 text-2md">This may prolong your verification process.</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={this.confirmSkip} className="text- darkblue px-4 py-2 border rounded mr-2 hover:bg-[#4378DB] hover:text-white">
                                Yes
                            </button>
                            <button onClick={this.cancelSkip} className="border border-gray-300 px-4 py-2 rounded hover:bg-[#4378DB] hover:text-white">
                                No, I will stay
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default withRouter(UploadScan);






