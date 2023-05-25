import React, { useEffect, useRef, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getUserID } from "../App";

export const Homepage = _ => {
    const [userID, setUserID] = useState();
    const inputRef = useRef(null);

    useEffect(() => {
        try{
            getUserID().then(res => setUserID(res));
        }catch(error){
            console.log(error);
        }
    }, []);

    const getHomepageStatus = _ => {
        return String(sessionStorage.getItem("homepageStatus"));
    };
    const getPredictionResult = _ => {
        return String(sessionStorage.getItem("predictionRes"));
    };
    const openFileExplorer = _ => {
        inputRef.current.click();
    };
    const convertVideo = (path) => {
        try{
            fetch("/api/videoconverter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    video: path
                })
            })
                .then((res) => {return res.json(); })
                .then((data) => {
                    
                });
        }catch(error){
            alert(error);
        }
    };
    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj)
            return;
        convertVideo("/Users/jonathan/Downloads/SampleVideoToUpload/"+fileObj.name);
        document.getElementById("resultPage").style.display = "none";
        document.getElementById("webDesc").style.display = "none";
        document.getElementById("loadingTxt").style.display = "block";
        analyseVideo(fileObj.name);
        event.target.value = null;
    };

    if(userID === "none") return window.location.href = "/signin";

    return(
        <section className="homepage">
            <div id="loadingTxt" style={{display: 'none'}} className="loading-txt">Loading data, please wait...</div> 
            <div id="resultPage">
                <div id="uploadBtn" className={getHomepageStatus() === "1" ? "upload-btn-2" : "upload-btn"}>
                    <input style={{display: 'none'}} ref={inputRef} type="file" accept=".mp4" onChange={handleFileChange} />
                    <button onClick={openFileExplorer} ><CloudUploadIcon /></button>
                    <h1 >UPLOAD VIDEO</h1>
                </div>
                <div id="webDesc" className="web-desc" style={{display: getHomepageStatus() === "1" ? "none" : "block"}} >
                    <h1>Real-world Anomaly Detector</h1>
                    <hr/>
                    <p>Upload a video with a .mp4 file format. This system will process the video and return the result if the uploaded video is normal or containts any anomalies.</p>
                </div>
                <div id="predictionResult" className="pediction-result" style={{display: getHomepageStatus() === "1" ? "block" : "none"}}>
                    <img id="imgResult" src="result.png" alt="result" />
                    <div className="crime-type" >
                        <h1 id="crimeTypeTxt">{`CRIME TYPE: ${getPredictionResult()}`}</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

const analyseVideo = async (fileName) => {
    const res = await fetch("/api/crimedetection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            video: fileName
        })
    });
    const data = await res.json();
    if(data.status){
        document.getElementById("loadingTxt").style.display = "none";
        document.getElementById("resultPage").style.display = "block";
        document.getElementById("uploadBtn").className = "upload-btn-2";
        document.getElementById("predictionResult").style.display = "block";
        document.getElementById("crimeTypeTxt").innerHTML = ("CRIME TYPE: " + data.type);
        sessionStorage.setItem("predictionRes", data.type);
        sessionStorage.setItem("homepageStatus", "1");
    }
};