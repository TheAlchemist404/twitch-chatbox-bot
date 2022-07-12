// Animation timing (in seconds)
const minT = 3
const maxT = 8

// Font size limits (in vh)
const minS = 15
const maxS = 70

function sendStuff(event) {
	if (!(event.keyCode == 13 && !event.shiftKey)) {return}
	event.preventDefault();
	create_msg(document.getElementById("sim").value);
	//console.log("Enter key is pressed");
	document.getElementById("sim").value='';
	return false;
};

function create_msg(content){
	/* console.log("Printing message"); */

	//duplicate the node
	let template = document.getElementById("block");
	var	foo = template.content.querySelector("div");
	let message = document.importNode(foo, true);
	
	//add a self destruct after animation ends
	message.addEventListener("animationend", function(event) {
		//create_msg() //Repeat the operation (FOR TESTING ONLY) 
		// console.log("deleting message");
		this.remove();
	}, false);
	
	let Ttop = message.querySelector("#top");
	let Tbot = message.querySelector("#bot");
	Ttop.innerHTML = content;
	Tbot.innerHTML = content;
	
	//the element gets addded
	document.getElementById("ChatBox").appendChild(message);
	
	/*Define the new font size*/
    var randN = Math.random()
	var s = minS + randN*(maxS - minS);
    message.style.fontSize = s.toString() + 'vh';
	
	/*Define the animation duration*/
	var t = minT + Math.floor(randN*(maxT - minT));
	message.style.animationDuration = t.toString() + 's';
	
	/* Define zIndex */
	var z = 2 * Math.floor(-1 - randN*25); // usually up to 50 messages are visible so its unlikely the need to change the "25" value
	message.style.zIndex = z.toString();
	Ttop.style.zIndex = z.toString();
	Tbot.style.zIndex = (z-1).toString();
	
	/* just to diferentiate upon testing */
	var R = Math.floor(Math.random()*255)
	var G = Math.floor(Math.random()*255)
	var B = Math.floor(Math.random()*255)
	Ttop.style.color = "#"+R.toString(16)+G.toString(16)+B.toString(16);
	
	/*Define the new position of the message*/
    var position = Math.floor(Math.random()*(document.getElementById("ChatBox").clientHeight - message.clientHeight));
	if (position < 0) { position = 0;};
    message.style.top = position.toString() + 'px';
	//console.log(position.toString() + 'px');
	
	message.style.animationPlayState = 'running';
};
