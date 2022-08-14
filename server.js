const express = require("express")
const { exec } = require("child_process")
const app = express()

app.get("/runform" , (req, res) =>  {
	res.sendFile(__dirname + "/m2.html");
})
app.get("/run" , (req, res) => {
	//res.sendFile(__dirname + "/livecmd.html")
	const cname = req.query.cname;
	const cimage = req.query.cimage;
	
	exec('docker run -dit --name ' +  cname + " " +cimage ,  (err, stdout, stderr) => {
		res.send(stdout);
})
})
app.get("/cmd" ,(req, res ) => {
	res.sendFile(__dirname + "/livecmd.html")
} ) 
app.get("/comman", (req, res) => {
	const cmd = req.query.cmd;
	exec(cmd, (err, stdout, stderr) => {
		res.send(stdout);
	})
})

app.get("/ps",  (req, res) => {
	exec("docker ps | tail -n +2 ", (err, stdout, stderr) => {

		res.send("<pre>" + stdout + "</pre>");
	});
})

app.get("/del", (req, res) => {
	const del = req.query.cdname;
	exec("docker stop " + del, (err, stdout, stderr) => {
		res.send(stdout);
	});
})

app.listen (3000, () => {console.log("conatiner started ")})
