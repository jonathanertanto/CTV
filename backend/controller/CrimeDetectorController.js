const express = require ("express");
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

router.post("/", async (req, res) => {
    try{
        const {video} = req.body;
        const videoTitle = String(video).substring(0, String(video).length-4);
        const command = [`${videoTitle}`];
        command.unshift('controller/CrimeDetector.py');
        const py = spawn('python', command);
        py.stdout.on('data', (data) => {
            console.log('Pipe data from python script ...');
            const result = data.toString().split(',');
            const type = String(result[0]).trim();
            const imageScene = String(result[1]).trim();
            console.log(type + "," + imageScene);
            const labels = ["Abuse", "Arrest", "Explosion", "Fighting", "None", "RoadAccidents", "Robbery", "Shooting", "Shoplifting", "Vandalism"];
            if(labels.includes(type)){
                const sourcePath = path.join(__dirname, `../data/${videoTitle}/${imageScene}`);
                const destinationPath = path.join(__dirname, `../../frontend/public/result.png`);
                fs.copyFile(sourcePath, destinationPath, (err) => {
                    if(err){
                        console.log(err);
                        return res.status(400).json({
                            status: false,
                            message: err
                        });
                    }else{
                        return res.status(200).json({
                            status: true,
                            type: type,
                            imageScene: imageScene
                        });
                    }
                });
            }
        });
        py.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        py.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error
        });
    }
});
module.exports = router;