import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import pngImage from "../../../assets/images/pngIcon.png";

const Dropbox = () => {
    const [isValid, onIsValid] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const fileUrl = URL.createObjectURL(file);
            setUploadedImage(fileUrl);
            console.log("Đã chọn file:", file);
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
        },
        onDrop,
        multiple: false
    });

    return (
        <div className="border-3 dropbox bg-warning mt-5 d-flex align-items-center justify-content-center p-3" style={{ height: "70vh", cursor: "pointer" }}  {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="container d-flex flex-column align-items-center justify-content-center w-100 h-100" style={{ border: "2px dashed black" }}>
                {uploadedImage ? (
                    <div className="row">
                        <div className="col-md-6">
                            <img src={uploadedImage} alt="Uploaded" className="img-fluid" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                        </div>
                        <div className="col-md-6">
                        
                        </div>
                        
                    </div>

                    
                ) : (
                    <>
                        <img src={pngImage} alt="Default" className="img-fluid" style={{ height: "10vh" }} />
                        <h2 className="mt-3">Drop image here</h2>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dropbox;
