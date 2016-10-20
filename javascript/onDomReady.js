$(document).ready(function() {
	display_tab('chords');

	//find where to add the keyboard
	var hardCodedSvgKeyboard = document.querySelector('#keyboard.panel');
	test829 = new SVGKeyboard('test829');
	
	//Create and insert it
	var n = document.importNode(test829.init(3),true);
    document.body.insertBefore(n, hardCodedSvgKeyboard);
	test829.bindSoundEvents();
	
	/*
	var event = new Event('highlight');
	var event2 = new Event('clear');
	var event3 = new Event('strike');
	var event4 = new Event('release');
	
	var target = document.querySelector('#key55');
	target.addEventListener("mousedown", function() { target.dispatchEvent(event3); }, false );
	target.addEventListener("mouseup", function() { target.dispatchEvent(event4); }, false );
	
	// Listen for the event.
	target.addEventListener('highlight', function (e) {
		//console.log(e.target.id);
		document.querySelector("#"+e.target.id).classList.add("highlighted");
		//console.log('Highlighting :'+e.target.id);
	}, false);
	//target.dispatchEvent(event);
	
	target.addEventListener('clear', function (e) {
		//console.log(e.target.id);
		document.querySelector("#"+e.target.id).classList.remove("highlighted");
		//console.log('Clearing :'+e.target.id);
	}, false);
	//target.dispatchEvent(event2);
	
	target.addEventListener('strike', function (e) {
		//console.log(e.target.id);
		document.querySelector("#"+e.target.id).classList.add("stricken");
		//console.log('Striking :'+e.target.id);
		//console.log('Playing :'+e.target.id);
		var keySound = new Audio('../audio/'+e.target.id+".mp3");
		keySound.play();
	}, false);
	//target.dispatchEvent(event3);
	
	target.addEventListener('release', function (e) {
		//console.log(e.target.id);
		document.querySelector("#"+e.target.id).classList.remove("stricken");
		//console.log('Releasing :'+e.target.id);
	}, false);
	//target.dispatchEvent(event4);
	*/
});