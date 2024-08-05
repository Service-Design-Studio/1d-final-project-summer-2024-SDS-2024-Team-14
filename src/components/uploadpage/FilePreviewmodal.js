import React from 'react';

const FilePreviewModal = ({ fileObj, onClose }) => {
    if (!fileObj) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-default bg-opacity-50 z-50 preview_modal">
            <div className="bg-white rounded-lg p-6 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-red-500 text-2xl close">
                    &times;
                </button>
                <div className="flex justify-center items-center">
                    {fileObj.file.type.startsWith('image/') ? (
                        <img src={fileObj.preview} alt={fileObj.file.name} className='h-[60vw] md:h-[40vw] lg:h-[30vw] w-full object-contain' />
                    ) : fileObj.file.type === 'application/pdf' ? (
                        <iframe src={fileObj.preview} type="application/pdf" className="z-20 h-[60vw] md:h-[40vw] lg:h-[30vw] w-full"/>
                    ) : (
                        <p>Unsupported file type: {fileObj.file.type}</p> // Add fallback message
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
