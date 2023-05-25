const express = require ("express");
const router = express.Router();
const { spawn } = require('child_process');

router.post("/", async (req, res) => {
    try{
        const {video} = req.body;
        const command = [`${video}`];
        command.unshift('controller/videoConverter.py');
        const py = spawn('python', command);
        py.stdout.on('data', (data) => {
            console.log('Pipe data from python script ...');
            var dataToSend = data.toString();
            console.log(dataToSend);
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