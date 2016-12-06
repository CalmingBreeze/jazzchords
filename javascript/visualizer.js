$(document).ready(function() {

  //find where to add the keyboard
	//var hardCodedSvgKeyboard = document.querySelector('#keyboard.panel');
	test829 = new SVGKeyboard('test829','#visualKeyboard');

	//retrieve the input
	var inputedChord = document.querySelector("input#inputedChord");
	//retrieve the validation button
	var validatonButton = document.querySelector("button#validateChord");

	//bind buttons to the form
	//bind keys
	var keysButtons = document.getElementsByClassName('rootKey');
	for (var i = 0; i < keysButtons.length; i++) {
	  keysButtons[i].addEventListener('click', function() {
			//Change input to the clicked button
			//Keys are supposed to fully reset the field, so no need to keep tracks of the previous value
			inputedChord.value = this.textContent;
			//update availables alteration (disable # for E and B, b for F and C)
		});
	}

	//TODO handle unauthorized sharp/flats (E# ou Fb)
	//bind alteration
	var sharpenRootKey = document.getElementById('sharpen');
	var flattenRootKey = document.getElementById('flatten');
	sharpenRootKey.addEventListener('click', function() {
		inputedChord.value += '#';
	});
	flattenRootKey.addEventListener('click', function() {
		inputedChord.value += 'b';
	});

	//TODO handle case with non corresponding value to chordCode as ½dim <=> halfdim
	//TODO add new buttons to cover others notations for a same chordType as Chalfdim, CØ, C°
	//bind chordtypes
	var chordsButtons = document.getElementsByClassName('chordType');
	for (var i = 0; i < chordsButtons.length; i++) {
		chordsButtons[i].addEventListener('click', function() {
			//Change input to the clicked button
			inputedChord.value += this.textContent;
		});
	}

	//validate and play the chord
	validatonButton.addEventListener('click', function() {
		computedChord = new Chord(inputedChord.value, 0, 3);
		test829.playChord(computedChord);
	});
});
