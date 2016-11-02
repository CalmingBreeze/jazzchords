// define the note class
//
// a note is the most basic component of the score (96 on 8 octaves)


const KEYS_SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const KEYS_FLATS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const UNALTERED_KEYS_INDEXES = [0, 2, 4, 5, 7, 9, 11];
const UNALTERED_KEYS_NAME_VALUE = {C:0, D:2, E:4, F:5, G:7, A:9, B:11};

class Note {
	//Constructor
	constructor(keyNumber, alteration = 0) {
		this.keyNumber = keyNumber;
		this.octave = Math.floor(keyNumber/12);
		
		//set the correct given alteration
		if (alteration != 0) {
			this.alteration = alteration;
		} else {	
			//or if altered it is altered key set # as default.
			this.alteration = (UNALTERED_KEYS_INDEXES.includes(keyNumber % 12)) ? 0 : 1;
		}
		
		//set the name
		this.noteName = (this.alteration < 0) ?
			KEYS_FLATS[keyNumber%12] : KEYS_SHARPS[keyNumber%12];
		
	}
	
	get octave() {
		return this._octave;
	}
	
	set octave(newOctave) {
		this._octave = newOctave;
	}
	
	get keyNumber() {
		return this._keyNumber;
	}

	set keyNumber(newKeyNumber) {
		this._keyNumber = newKeyNumber;
	}
	
	get noteName() {
		return this._noteName;
	}
	
	set noteName(newNoteName) {
		this._noteName = newNoteName;
	}
	
	/**
	  * @param {string} intervalType - define if the second is major or minor (+2 or +1 pitch)
	  * @return {Note} - return the note augmented by a second
	  */
	second(intervalType = 'major') {
		var gap = 2;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the third is major or minor (+4 or +3 pitch)
	  * @return {Note} - return the note augmented by a third
	  */
	third(intervalType = 'major') {
		var gap = 4;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the fourth is just or augmented (+5 or +6 pitch)
	  * @return {Note} - return the note augmented by a fourth
	  */
	fourth(intervalType = 'just') {
		var gap = 5;
		if (intervalType != 'just') {
			gap++;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the fifth is just, augmented, diminished (+7 or +8 pitch)
	  * @return {Note} - return the note augmented by a fifth
	  */
	fifth(intervalType = 'just') {
		var gap = 7;
		if (intervalType == 'augmented') {
			gap++;
		} else if (intervalType == 'diminished') {
			gap--;
		}
		//else do nothing (5th just)
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the sixth is major or minor (+9 or +8 pitch)
	  * @return {Note} - return the note augmented by a sixth
	  */
	sixth(intervalType = 'major') {
		var gap = 9;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the seventh is major, minor, diminshed (+11, +10, +9 pitch)
	  * @return {Note} - return the note augmented by a seventh
	  */
	seventh(intervalType = 'minor') {
		var gap = 10;
		if (intervalType == 'major') {
			gap++;
		} else if (intervalType == 'diminished') {
			gap--;
		}
		//else do nothing (7th minor)
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the nineth is major or minor (+14 or +13 pitch)
	  * @return {Note} - return the note augmented by a nineth
	  */
	nineth(intervalType = 'major') {
		var gap = 14;
		if (intervalType != 'minor') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the eleventh is just or augmented (+17 or +18 pitch)
	  * @return {Note} - return the note augmented by a eleventh
	  */
	eleventh(intervalType = 'just') {
		var gap = 17;
		if (intervalType != 'just') {
			gap++;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} intervalType - define if the thirteenth is major or minor (+21 or +10 pitch)
	  * @return {Note} - return the note augmented by a thirteenth
	  */
	thirteenth(intervalType = 'major') {
		var gap = 21;
		if (intervalType != 'major') {
			gap--;
		}
		return new Note(this.keyNumber+gap,this.alteration);
	}
	
	/**
	  * @param {string} noteName - the Us notation of a note 'ex: C, F#, Bb')
	  * @param {string} baseOctave - the octave of the desired note
	  * @return {Note} - return the note object with the correct keyId and alteration
	  */
	static getNoteByNoteName(noteName,baseOctave = 2){
		var noteNewId = 0;
		var noteNewAlteration = 0;
		
		//First, get the base note and handle alteration
		noteNewId = parseInt(baseOctave*12) + UNALTERED_KEYS_NAME_VALUE[noteName.substr(0,1)];
		
		//TO IMPROVE : add ## and bb support
		//adjust keyId depending on the alteration (+1/-1)
		//noteName can be "Cb5" as "C b5" in that special case we must considerate 'b' as a chord pattern instead of an alteration
		if ((noteName[2] != "5") && (noteName[1] == "b")) {
			//flats case
			noteNewAlteration--;
			noteNewId--;
		} else if (noteName[1] == "#") {
			//sharps case
			noteNewAlteration++;
			noteNewId++; //value the alteration to the id
		}
		
		return new Note(noteNewId, noteNewAlteration);
	}
};
