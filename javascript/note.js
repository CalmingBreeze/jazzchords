// define the note class
//
// a note is the most basic component of the score

//Constructor
//@pitch : name of the note
class Note {
	constructor(keyNumber) {
		this.keyNumber = keyNumber;
		
		//determine alteration
		//determine name
		//determine octave ?
		
	}
	
	get keyNumber() {
		return this._keyNumber;
	}
	
	set keyNumber(keyNumber) {
		this._keyNumber = keyNumber;
	}
	
	//return the Second of the note
	//Can be major (default value), or minor
	second(intervalType = 'major') {
		var gap = 2;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap)
	}
	
	//return the Thirds of the note
	//Can be major (default value), or minor
	third(intervalType = 'major') {
		var gap = 4;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap)
	}
	
	//return the Fourth of the note.
	//Can be just, augmented
	fourth(intervalType = 'just') {
		var gap = 5;
		if (intervalType != 'just') {
			gap++;
		}
		return new Note(this.keyNumber+gap)
	}
	
	//return the Fifth of the note.
	//Can be just, augmented
	fifth(intervalType = 'just') {
		var gap = 7;
		if (intervalType != 'just') {
			gap++;
		}
		return new Note(this.keyNumber+gap)
	}
	
	//return the Sixth of the note.
	//Can be major, minor
	sixth(intervalType = 'major') {
		var gap = 9;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap)
	}
	
	//return the Seventh of the note.
	//Can be major, minor
	seventh(intervalType = 'minor') {
		var gap = 10;
		if (intervalType != 'minor') {
			gap++;
		}
		return new Note(this.keyNumber+gap)
	}
};


var test = new Note(49); //C4
var test2 = new Note(55); //F4#
console.log(test.third());
console.log(test.third('minor'));
//test.addNotes("A");
console.log(test);
console.log(test2);

