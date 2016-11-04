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
		var fundamentalNote = 0;
		var slashedNote = 0;
		
		//first of all, define the fundamental Note
		//Detect a slashed chord (ex B/CMaj7)
		//Then the special treatment will be at the end of the method
		//TO DO IMPROVE use REGEXP as [ABCDEFG][#/b]?\/        
		if (chordToCompute[1] == '/' || chordToCompute[2] == '/') {
			//lower the octave to have the correct note (always under the fundamental)
			slashedNote = Note.getNoteByNoteName(chordToCompute,this.baseOctave-1);
			
			//then treat the second part as the current cord (B/CMaj7 -> CMaj7)
			chordToCompute = chordToCompute.substr(slashedNote.noteName.length+1);
		}
		fundamentalNote = Note.getNoteByNoteName(chordToCompute,this.baseOctave);	
		
		//add the fundamental note of the chord
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
				notesArray.push(fundamentalNote.seventh('minor'));//septième-
				//console.log(fundamentalNote.noteName+"half dim");
				break;
				
			case "b":
				//C b5
				//Cmajeur avec quinte dim
				//fondamentale, tierce, quinte-
				notesArray.push(fundamentalNote.third());//tierce
				notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
				//console.log(fundamentalNote.noteName+"b5");
				break;
			
			case "d":
				notesArray.push(fundamentalNote.third('minor'));//tierce-
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
					notesArray.push(fundamentalNote.seventh('diminished'));//septième-
					//console.log(fundamentalNote.noteName+"dim7");
				}
				break;
			
			case "s":
				if (chordToCompute[3] == "2") {
					//Csus2
					//fondamentale,seconde,quinte
					notesArray.push(fundamentalNote.second());//seconde
					notesArray.push(fundamentalNote.fifth());//quinte
					//console.log(fundamentalNote.noteName+"sus2");
				} else {
					//Csus4
					//fondamentale,quarte,quinte
					notesArray.push(fundamentalNote.fourth());//quarte
					notesArray.push(fundamentalNote.fifth());//quinte
					//console.log(fundamentalNote.noteName+"sus4");
				}
				break;
			
			case "a":
				if (chordToCompute.substr(0,3) == "add") {
					//Cadd9
					//Cmaj + 9th
					//fondalentale,tierce,quinte,neuvième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.nineth());//neuvième
					//console.log(fundamentalNote.noteName+"add9");
				} else {
					//Caug / C+
					//quinte augmentée
					//fondamentale,tierce,quinte+
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth('augmented'));//quinte+
					//console.log(fundamentalNote.noteName+"aug");
				}
				break;
			
			case "5":
				//C5 PowerChord
				//Quinte doublée à l'octave
				//fondamentale, quinte, octave sup
				notesArray.push(fundamentalNote.fifth());//quinte
				console.log(fundamentalNote);
				notesArray.push(fundamentalNote.octavify());//octave
				//console.log(fundamentalNote.noteName+"5 PowerChord");
				break;
				
			case "6":
				if (chordToCompute.length == 1) {
					//C6
					//Accord majeur + sixte
					//fondamentale, tierce, quinte, sixte
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.sixth());//sixte
					//console.log(fundamentalNote.noteName+"6");
				} else {
					//C69 ou C6/9
					//Accord majeur + sixte + neuvième
					//fondamentale, tierce, quinte, sixte, neuvième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.sixth());//sixte
					notesArray.push(fundamentalNote.nineth());//neuvième
					//console.log(fundamentalNote.noteName+"69");
				}
				break;
			
			case "9":	
				if (chordToCompute.length == 1) {
					//C9
					//C + 7 + 9
					//fondamentale, tierce, quinte, septième-, neuvième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.seventh('minor'));//septième-
					notesArray.push(fundamentalNote.nineth());//neuvième
					//console.log(fundamentalNote.noteName+"9");
				} else if (chordToCompute[1] == "b") {
					//C9b5
					//Même qu'au dessus avec une quinte -
					//fondamentale, tierce, quinte-, septième-, neuvième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
					notesArray.push(fundamentalNote.seventh('minor'));//septième-
					notesArray.push(fundamentalNote.nineth());//neuvième
					//console.log(fundamentalNote.noteName+"9b5");
				} else if (chordToCompute[1] == "#") {
					//C9#5
					//Même qu'au dessus avec une quinte+ sans 7TH
					//fondamentale, tierce, quinte+, neuvième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth('augmented'));//quinte+
					notesArray.push(fundamentalNote.nineth());//neuvième
					//console.log(fundamentalNote.noteName+"9#5");
				} else {
					//C9sus4
					notesArray.push(fundamentalNote.fourth());//quarte
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.seventh('minor'));//septième-
					notesArray.push(fundamentalNote.nineth());//neuvième
					//console.log(fundamentalNote.noteName+"9sus4");
				}
				break;
			
			case "1":
				if (chordToCompute[1] == '1') {
					//C11
					//C + 7 + 9 + 11
					//fondamentale, tierce, quinte, septième-, neuvième, onzième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.seventh('minor'));//septième-
					notesArray.push(fundamentalNote.nineth());//neuvième
					notesArray.push(fundamentalNote.eleventh());//onzième
					//console.log(fundamentalNote.noteName+"11");
				} else {					
					//C13
					//C + 7 + 9 + 11 + 13
					//fondamentale, tierce, quinte, septième-, neuvième, onzième, treizième
					notesArray.push(fundamentalNote.third());//tierce
					notesArray.push(fundamentalNote.fifth());//quinte
					notesArray.push(fundamentalNote.seventh('minor'));//septième-
					notesArray.push(fundamentalNote.nineth());//neuvième
					notesArray.push(fundamentalNote.eleventh());//onzième
					notesArray.push(fundamentalNote.thirteenth());//treizième
					//console.log(fundamentalNote.noteName+"11");	
				}
				break;
			
			case "7":
				//code block
				switch (chordToCompute[1]) {
					case "b":
						if (chordToCompute[2] == "5") {
							//C7b5
							//Accord Septième avec quinte dim
							//fondamentale, tierce, quinte-, septième-
							notesArray.push(fundamentalNote.third());//tierce
							notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
							notesArray.push(fundamentalNote.seventh('minor'));//septième-
							//console.log(fundamentalNote.noteName+"7b5");
						} else {
							//C7b9
							//Accord Septième avec neuvième dim
							//fondamentale, tierce, quinte, septième-, neuvième-
							notesArray.push(fundamentalNote.third());//tierce
							notesArray.push(fundamentalNote.fifth());//quinte
							notesArray.push(fundamentalNote.seventh('minor'));//septième-
							notesArray.push(fundamentalNote.nineth('minor'));//neuvième-
							//console.log(fundamentalNote.noteName+"7b9");
						}
						break;
					case "#":
						if (chordToCompute[2] == "5") {
							//C7#5
							//Accord Septième avec quinte aug
							//fondamentale, tierce, quinte+, septième-
							notesArray.push(fundamentalNote.third());//tierce
							notesArray.push(fundamentalNote.fifth('augmented'));//quinte+
							notesArray.push(fundamentalNote.seventh('minor'));//septième-
							//console.log(fundamentalNote.noteName+"7#5");
						} else {
							//C7#9
							//Accord Septième avec neuvième aug
							//fondamentale, tierce, quinte, septième-, neuvième+
							notesArray.push(fundamentalNote.third());//tierce
							notesArray.push(fundamentalNote.fifth());//quinte
							notesArray.push(fundamentalNote.seventh('minor'));//septième-
							notesArray.push(fundamentalNote.nineth('augmented'));//neuvième+
							//console.log(fundamentalNote.noteName+"7#9");
						}
						break;
					case "s":
						//C7sus4
						//Accord Septième sans tierce avec quarte sup
						//fondamentale, quarte, quinte, septième-
						notesArray.push(fundamentalNote.fourth());//quarte
						notesArray.push(fundamentalNote.fifth());//quinte
						notesArray.push(fundamentalNote.seventh('minor'));//septième-
						//console.log(fundamentalNote.noteName+"7sus4");
						break;
					default :
						//C7 FIX attention wrong chords sometimes C7BB9 => C7
						//Accord de septième de dominante
						//fondamentale, tierce, quinte, septième-
						notesArray.push(fundamentalNote.third());//tierce
						notesArray.push(fundamentalNote.fifth());//quinte
						notesArray.push(fundamentalNote.seventh('minor'));//septième-
						//console.log(fundamentalNote.noteName+"7");
				}
				break;
				
			case "m":
				switch (chordToCompute[1]) {
					case "a":
						notesArray.push(fundamentalNote.third());//tierce
						notesArray.push(fundamentalNote.fifth());//quinte
						switch (chordToCompute[3]) {
							case "7":
								//Cmaj7 / CΔ
								//fondamentale, tierce, quinte, septième
								notesArray.push(fundamentalNote.seventh('augmented'));//septième
								//console.log(fundamentalNote.noteName+"maj7");
								break;
							case "9":
								//Cmaj9 / CΔ9
								//fondamentale, tierce, quinte, septième, neuvième
								notesArray.push(fundamentalNote.seventh('augmented'));//septième
								notesArray.push(fundamentalNote.nineth());//neuvième
								//console.log(fundamentalNote.noteName+"maj9");
								break;
							case "o":
								//Cmajor
								//fondamentale, tierce, quinte
								//console.log(fundamentalNote.noteName+"major");
								break;
							default :
								//console.log(fundamentalNote.noteName+"Unknown Cmaj* chord");
						}
						break;
					case "#":
						//Cm#7 / CmM7
						//Accord de septième de dominante avec tierce mineure
						//fondamentale, tierce-, quinte, septième-
						notesArray.push(fundamentalNote.third('minor'));//tierce-
						notesArray.push(fundamentalNote.fifth());//quinte
						notesArray.push(fundamentalNote.seventh('augmented'));//septième
						//console.log(fundamentalNote.noteName+"m#7");
						break;
					case "i":
						//Cminor
						//fondamentale, tierce-, quinte
						notesArray.push(fundamentalNote.third('minor'));//tierce-
						notesArray.push(fundamentalNote.fifth());//quinte
						//console.log(fundamentalNote.noteName+"minor");
						break;
					case "6":
						//Cm6
						//Cminor + sixte
						//fondamentale, tierce-, quinte, sixte
						notesArray.push(fundamentalNote.third('minor'));//tierce-
						notesArray.push(fundamentalNote.fifth());//quinte
						notesArray.push(fundamentalNote.sixth());//sixte
						//console.log(fundamentalNote.noteName+"m6");
						break;
					case "7":
						if (chordToCompute[2] == "b") {
							//Cm7b5 / Cø // halfdim
							//Cm7 et quinte dim
							//fondamentale, tierce-, quinte-, septième-
							notesArray.push(fundamentalNote.third('minor'));//tierce-
							notesArray.push(fundamentalNote.fifth('diminished'));//quinte-
							notesArray.push(fundamentalNote.seventh('minor'));//septième-
							//console.log(fundamentalNote.noteName+"m7b5");
						} else {
							//Cm7
							//fondamentale, tierce-, quinte, septième-
							notesArray.push(fundamentalNote.third('minor'));//tierce-
							notesArray.push(fundamentalNote.fifth());//quinte
							notesArray.push(fundamentalNote.seventh('minor'));//septième-
							//console.log(fundamentalNote.noteName+"m7");
						}
						break;
					case "9":
						//Cm9
						//Cminor + 9
						////fondamentale, tierce-, quinte, septième-, neuvième
						notesArray.push(fundamentalNote.third('minor'));//tierce-
						notesArray.push(fundamentalNote.fifth());//quinte
						notesArray.push(fundamentalNote.seventh('minor'));//septième-
						notesArray.push(fundamentalNote.nineth());//neuvième
						//console.log(fundamentalNote.noteName+"m9");
						break;
					case "1":
						//Cm11
						//Cminor + 7 + 9 + 11
						////fondamentale, tierce-, quinte, septième-, neuvième, onzième
						notesArray.push(fundamentalNote.third('minor'));//tierce-
						notesArray.push(fundamentalNote.fifth());//quinte
						notesArray.push(fundamentalNote.seventh('minor'));//septième-
						notesArray.push(fundamentalNote.nineth());//neuvième
						notesArray.push(fundamentalNote.eleventh());//onzième
						//console.log(fundamentalNote.noteName+"m11");
						break;
					default :
						//console.log(fundamentalNote.noteName+"Unknown Cm* chord");
				}
				break;
	
		
			default: 
				console.log("Unknown chord : "+fundamentalNote.noteName+chordToCompute[0]);
		}
		
		//Hook to handle slashed chords B/CMaj7
		//Replace the fundamental by the pre-slashed member.
		if (slashedNote != 0) {
			notesArray[0] = slashedNote;
		}
		
		return notesArray;
	}
	
	
};
