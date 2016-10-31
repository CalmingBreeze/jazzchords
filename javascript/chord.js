// define the chord class
//
// a chord is a group of notes/keys

//Constructor
//@name : name of the chord
class Chord {
	
	constructor(keyboardId,name,inversion, baseOctave = 4) {
		this.keyboardId = keyboardId;
		this.name = name;
		this.inversion = inversion;
		this.baseOctave = baseOctave;
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
	
	//Call highlight on each of the key of the chord
	highlight() {
		for (var i = 0; i < notes.length; i++) {
			notes[i].highlight();
		}		
	}
};
