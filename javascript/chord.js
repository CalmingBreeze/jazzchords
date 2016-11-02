// define the chord class
//
// a chord is a group of notes/keys

//Constructor
//@name : name of the chord
class Chord {
	
	constructor(name,inversion = 0, baseOctave = 2) {
		this._chordName = name;
		this.inversion = inversion;
		this.baseOctave = baseOctave;
		this.notes = this.getNotesByChordName();
	};
	
	get notes() {
		return this._notes;
	};

	set notes(noteArray) {
		this._notes = noteArray;
	};
	
	get chordName() {
		return this._chordName;
	};
	
	set chordName(name) {
		this._chordName = chordName;
	};
	
	addNote(note) {
		this.notes.push(note)
	};
	
	/** Availables chord for C tune; 
	  * TODO optimize switch case evals per priority
	  * by priority (expected usage) 7 > m > 6 > 9 > 11 > 13 > 5 > h > d > s > a
	  * halfdim : "Chalfdim"
	  * Slashed : "C/E", "C/G", "C/B", "C/Bb", "C/D"
	  * b5 : "Cb5"
	  * 5° : "C5",
	  * 6° : "C6", "C69",
	  * 7° : "C7", "C7b5", "C7b9", "C7#5", "C7#9", "C7sus4"
	  * 9° : "C9", "C9b5", "C9#5", "C9sus4"
	  * m : "Cm#7", "Cm7", "Cm7b5", "Cm6", "Cm9", "Cmaj9", "Cm11",
	  * maj : "Cmaj7", "Cmaj9",
	  * major : "Cmajor",
      * minor : "Cminor",
	  * add : "Cadd9",
	  * sus : "Csus2", "Csus4",
	  * dim : "Cdim", "Cdim7",
	  * aug : "Caug",
	  */
	  
	/**
	  * @param {string} chordName - the name of the wanted chord (ex: Cm7, F#sus4)
	  * @param {string} baseOctave - where do we need to put the first note (default is 2, because C2-C5 is the most optimized wiew for chords)
	  * @return {array} - array of the composing notes
	  */
	getNotesByChordName() {
		var notesArray = [];
		var chordToCompute = this.chordName;
		var fundamentalNote = Note.getNoteByNoteName(chordToCompute,this.baseOctave);
		//first of all, define the fundamental Note
		
		//add the fundamental note of the chord
		//Note.getNoteByNoteName return instanciated note by name
		notesArray.push(fundamentalNote);
		
		//remove the fundamental from the chord name and the eventual alteration
		chordToCompute = (fundamentalNote.alteration != 0) ? chordToCompute.substr(2) : chordToCompute.substr(1);
		
		//here it is, the big fat switch
		switch (chordToCompute[0]) {
			
			case "h":
				//console.log("enter case h");
				//C halfdim / Cø / Cm7b5 -> 
				//Accord dim + 7° dim
				//fondamentale, tierce-, quinte-, septième-
				notesArray.push(fundamentalNote.third('minor'));//tierce-
				notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
				notesArray.push(fundamentalNote.seventh());//septième-
				//console.log(fundamentalNote.noteName+"half dim");
				break;
				
			case "b":
				//C b5
				//Cmajeur avec quinte dim
				//fondamentale, tierce, quinte-
				notesArray.push(fundamentalNote.third());//tierce-
				notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
				//console.log(fundamentalNote.noteName+"b5");
				break;
			
			case "d":
				notesArray.push(fundamentalNote.third());//tierce-
				notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
				if (chordToCompute.length == 3) {
					//Cdim
					//C majeur full diminué
					//fondamentale, tierce-, quinte-
					//console.log(fundamentalNote.noteName+"dim");
				} else {
					//Cdim7
					//C majeur7 full diminué
					//fondamentale, tierce-, quinte-, septième--
					notesArray.push(fundamentalNote.seventh('diminshed'));//septième-
					//console.log(fundamentalNote.noteName+"dim7");
				}
				break;
			
			default: 
				console.log("Unknown chord : "+fundamentalNote.noteName+chordToCompute[0]);
		}
		console.log(notesArray);
		return notesArray;
	}
	
	
};
