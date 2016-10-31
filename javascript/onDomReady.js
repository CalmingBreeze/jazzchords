$(document).ready(function() {
	display_tab('chords');

	//find where to add the keyboard
	//var hardCodedSvgKeyboard = document.querySelector('#keyboard.panel');
	test829 = new SVGKeyboard('test829');
	
	//Create and insert it
	//var n = document.importNode(test829.init(3),true);
    //document.body.insertBefore(n, hardCodedSvgKeyboard);
	//document.body.appendChild(n);
	//test829.bindSoundEvents();
	
	var C4_note = new Note(48); //C4
	var F4sharp_note = new Note(54); //F4#
	var F5sharp_note = new Note(66); //F5#
	
	/*
	var test4 = new Chord('Cm7', 0);
	console.log(test);
	test4.addNote("C");
	test4.addNote("Eb");
	test4.addNote("G");
	test4.addNote("Bb");
	console.log(test4);
	*/
	
	/*
	//CMaj7
	test829.keys[12].strike();
	test829.keys[16].strike();
	test829.keys[19].strike();
	test829.keys[23].strike();
	*/
	
	
	//play C7 in Oct4
	test829.playNote(C4_note);
	test829.playNote(C4_note.third());
	test829.playNote(C4_note.fifth());
	test829.playNote(C4_note.seventh());
	
	
	//play C7 in Oct4
	//test829.playChord("C7");
});