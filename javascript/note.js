// define the note class
//
// a note is the most basic component of the score (96 on 8 octaves)


//var keys = {C:0, D:2, E:4, F:5, G:7, A:9, B:11};
const KEYS_SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const KEYS_FLATS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const UNALTERED_KEYS_INDEXES = [0, 2, 4, 5, 7, 9, 11];

//Constructor
//@pitch : name of the note
class Note {
	//
	constructor(keyNumber, alteration = 0) {
		this._keyNumber = keyNumber;
		this.octave = Math.floor(keyNumber/12);
		if (alteration != 0) {
			this.alteration = alteration;
		} else {	
			this.alteration = (UNALTERED_KEYS_INDEXES.includes(keyNumber % 12)) ? 0 : 1;
		}
	}
	
	get octave() {
		return this._octave;
	}
	
	set octave(octave) {
		this._octave = octave;
	}
	
	get keyNumber() {
		return this._keyNumber;
	}
	
	// @return the name of the key for example 49 -> C, 55-> F#, 67 -> F#
	get name() {
		var keyIndex = this._keyNumber % 12;
		var response = "";
		if (UNALTERED_KEYS_INDEXES.includes(keyIndex % 12)) {
			return KEYS_SHARPS[keyIndex];
		} else if (this.alteration > 0 ) {
			return KEYS_SHARPS[keyIndex];
		} else if (this.alteration < 0 ) {
			return KEYS_FLATS[keyIndex];
		} else {
			console.log("error : wrong note created (altered but out of bound)")
		}
	}
	
	//return the Second of the note
	//Can be major (default value), or minor
	second(intervalType = 'major') {
		var gap = 2;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	//return the Thirds of the note
	//Can be major (default value), or minor
	third(intervalType = 'major') {
		var gap = 4;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	//return the Fourth of the note.
	//Can be just, augmented
	fourth(intervalType = 'just') {
		var gap = 5;
		if (intervalType != 'just') {
			gap++;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	//return the Fifth of the note.
	//Can be just, augmented
	fifth(intervalType = 'just') {
		var gap = 7;
		if (intervalType != 'just') {
			gap++;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	//return the Sixth of the note.
	//Can be major, minor
	sixth(intervalType = 'major') {
		var gap = 9;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	//return the Seventh of the note.
	//Can be major, minor
	seventh(intervalType = 'minor') {
		var gap = 10;
		if (intervalType != 'minor') {
			gap++;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	highlight() {
		
	}
};


var test = new Note(48); //C4
var test2 = new Note(54); //F4#
var test3 = new Note(66); //F5#
console.log(test);
console.log(test2);
console.log(test3);
console.log(test.name);
console.log(test2.name);
console.log(test3.name);

