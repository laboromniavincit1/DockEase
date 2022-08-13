const express = require("express")
const { exec } = require("child_process")
const app = express()

app.get("/runform" , (req, res) =>  {
	res.sendFile(__dirname + "/index.html");
})
app.get("/run" , (req, res) => {
	//res.sendFile(__dirname + "/livecmd.html")
	const cname = req.query.cname;
	const cimage = req.query.cimage;
	
	exec('sudo docker run -dit --name ' +  cname + " " +cimage ,  (err, stdout, stderr) => {
		res.send(stdout);
})
})
app.get("/cmd" ,(req, res ) => {
	res.sendFile(__dirname + "/livecmd.html")

} )

app.get("/ps",  (req, res) => {
	exec("sudo docker ps | tail -n +2 ", (err, stdout, stderr) => {

		res.send("<pre>" + stdout + "</pre>");
	});
})

app.listen (3000, () => {console.log("conatiner started ")})
