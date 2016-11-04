$(document).ready(function() {
	//display_tab('chords');

	//find where to add the keyboard
	//var hardCodedSvgKeyboard = document.querySelector('#keyboard.panel');
	test829 = new SVGKeyboard('test829');
	
	//Create and insert it
	//var n = document.importNode(test829.init(3),true);
    //document.body.insertBefore(n, hardCodedSvgKeyboard);
	//document.body.appendChild(n);
	//test829.bindSoundEvents();
	
	/*
	var C4_note = new Note(48); //C4
	var F4sharp_note = new Note(54); //F4#
	var G5flat_note = new Note(66,-1); //G5b
	
	console.log(C4_note.noteName);
	console.log(F4sharp_note.noteName);
	console.log(G5flat_note.noteName);
	*/
	
	/*
	var test4 = new Chord('Cm7', 0);
	console.log(test4);
	test4.addNote("C");
	test4.addNote("Eb");
	test4.addNote("G");
	test4.addNote("Bb");
	console.log(test4);
	test4.getNotesByName();
	*/
	
	//var test5 = new Chord('Chalfdim', 0, 3);
	//test5.getNotesByChordName();
	//console.log(test5);
	//test829.playChord(test5);
	
	/*
	//CMaj7
	test829.keys[12].strike();
	test829.keys[16].strike();
	test829.keys[19].strike();
	test829.keys[23].strike();
	*/
	
	/*
	//play C7 in Oct4
	test829.playNote(C4_note);
	test829.playNote(C4_note.third());
	test829.playNote(C4_note.fifth());
	test829.playNote(C4_note.seventh());
	*/
	
	//play C7 in Oct4
	//test829.playChord("C7");
	
	//TODO remove DEBUG here
	//attach button handler
	function computeChord(){
		var chordName = document.querySelector("input#debugChord");
		computedChord = new Chord(chordName.value, 0, 3);
		chordName.value = "";
		test829.playChord(computedChord);
		
	}
	var el = document.querySelector("button#testChordButton"); 
	el.addEventListener("click", computeChord, false);
});