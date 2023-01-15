const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
app.use(express.static('./pages'))
app.use(express.json())


let lists = []
// readLists(function(s){
// 	console.log(s);
// })
function readLists(call){
	lists = []
	try{
		const data = fs.readFileSync(path.join(__dirname,'./lists.txt'),'UTF-8')
		const lines = data.split(/\r?\n/)
		lines.forEach(v=>{
			let vs = JSON.parse(v)
			lists.push({word:vs.word,sentence:vs.sentence})
		})
		call(lists)
	}catch(err){
		console.log(err);
	}
}

// writeLists('problem'+new Date().getTime(),'why')
function writeLists(word,sentence){
	jsonStr = `\n{"word":"${word}","sentence":"${sentence}"}`
	fs.appendFile(path.join(__dirname,'./lists.txt'),jsonStr,err=>{
		if(err) console.log(err);
	})
}
run()
function run(){
	app.listen(80,()=>{
		console.log('express server running at http://127.0.0.1');
	})
	app.get('/select',(req,res)=>{
		readLists(function(d){
			res.send(d)
		})
	})
	app.get('/insert',(req,res)=>{
		// console.log(req.query)
		if(req.query.word || req.query.sentence) return;
		writeLists(req.query.word,req.query.sentence)
		res.send('sayhi')
	})
	
}









