#!/usr/bin/env node
const fs = require('fs')
var socket = require('socket.io-client')('https://vapor.cytu.be:10443/');
var channel = (''+{}).replace(/[^a-z]/gi,(ㅤ)=>ㅤ==' '?'_':'')
var timeout = setTimeout(()=>{console.log('Timed out');process.exit(1)},4000)
var emoteList = require('./emotelist')

socket.on('connect', function(){
	console.log("Connected, logging in")
	socket.emit('login',{'name':'zoeWhy','pw':fs.readFileSync('/tmp/pw','utf8').trim()})
});
socket.on('login', function(data){
	console.log(`Joining /r/${channel}`)
	socket.emit('joinChannel',{'name': channel})
});
socket.on('updateEmote',async (data) => {
	console.log(`${data.name} uploaded!`)
})
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
socket.on('userlist', async function(data){
	console.log("Joined. Uploading emotes...")
	clearTimeout(timeout)
	for(emote of emoteList) {
		socket.emit('updateEmote',{'name':emote.name,'image':emote.image})
		await sleep(200)
	}
	setTimeout(()=>{socket.close()},2000)
});
socket.on('disconnect', function(){console.log('Disconnected');process.exit(0)});
