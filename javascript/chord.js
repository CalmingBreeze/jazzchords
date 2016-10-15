// define the chord class
//
// a chord is a group of notes/keys

//Constructor
//@name : name of the chord
class Chord {
	
	constructor(name,inversion) {
		this.name = name;
		this.inversion = inversion;
		this.notes = [];
	};
	
	get notes() {
		return this._notes;
	};

	set notes(noteArray) {
		this._notes = noteArray;
	};
	
	addNote(note) {
		this.notes.push(note)
	};
	
};


//var test = new Chord('Cm7',0);
//console.log(test);
//test.addNote("C");
//test.addNote("Eb");
//test.addNote("G");
//test.addNote("Bb");
//console.log(test);
