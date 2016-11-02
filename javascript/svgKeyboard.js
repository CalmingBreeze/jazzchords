// define the SVGkeyboard class
//
// a class used to display the stricken keys

//Unfortunatly, const cannot be part of the class at the moment.
//Define key dimensions (in mm)
const WHITE_KEY_HEIGHT = 150;
const WHITE_KEY_WIDTH = 23.6;
const WHITE_KEY_SPACEMENT = 0.05;
const WHITE_KEY_AND_SPACEMENT = 23.65;

const BLACK_KEY_HEIGHT = 95;
const BLACK_KEY_WIDTH = 11.5;

const OCTAVE_HEIGHT = WHITE_KEY_HEIGHT;
const OCTAVE_WIDTH = 7*WHITE_KEY_WIDTH;

class SVGKeyboard {

	/**
	  * Instanciate a new SVGKeyboard with a specific id and defined number of Octaves starting from a specified octave
	  * @constructor
	  * @param {Number} id - The id of the generated keyboard in the DOM
	  * @param {Number} octaveNumber - The desired number of octave of the keyboard
	  * @param {Number} startingOctave - The octave from start the generation (in most case we want C2->C5
	  */
	constructor(id, octaveNumber = 3, startingOctave = 2) {
		this.id = id;
		this.octaveNumber = octaveNumber;
		this.keys = []; //always legnth of 96 to handle 8 octaves. Key object when it's on the range of the keyboard
		
		//Create the keyboard with default parameters 3 octaves from C2
		var myKeyboard = document.importNode(this.generateKeyboard(),true);
		
		//Add it to the DOM then bind events
		document.body.appendChild(myKeyboard);
		//SVGElement is now existing in the DOM

		//TO IMPROVE : find a better way to handle represented keys without having to 
		//fill the array with null value to have correct indexes
		for (var i = 0; i < 96; i++) {
			this._keys.push(null);
		}
		
		//find where to insert keys
		//Now link key-attribute to the generated keys
		var keysToAdd = document.querySelectorAll('svg#'+this.id+' use.pianoKey');
		for (var i = 0; i < keysToAdd.length; i++) {
			//Add new Key
			this._keys[(startingOctave*12)+i] = new Key(keysToAdd[i].attributes.noteId.value);
		}
		
	}
	
	get id() {
		return this._id;
	};

	set id(myid) {
		this._id = myid;
	};
	
	get keys() {
		return this._keys;
	};

	set keys(keysArray) {
		this._keys = keysArray;
	};
	
	/**
	  * Build the SVG structure of the keyboard SVG-definitions (ex:(white and black keys, octave, redline))
	  * @param {svgDOMElement} svg - A basic SVG DOM ELEMENT with the usual properties defined
	  * @return {svgDOMElement} Add to the param a full pianokeyboard related pattern definition
	  */
	buildSVGDefs(svg) {
		var SVG_NS = 'http://www.w3.org/2000/svg';
		var XLink_NS = 'http://www.w3.org/1999/xlink';
		
		//define the definitions of the svg and the patterns like an octave
		var defs = document.createElementNS(SVG_NS, "defs");
		
		//define the red felt line
		var line = document.createElementNS(SVG_NS, 'line');
		line.id ="keyRedTopFeltLine";
		line.setAttributeNS(null,'x1',0);
		line.setAttributeNS(null,'y1',0);
		line.setAttributeNS(null,'x2',OCTAVE_WIDTH);
		line.setAttributeNS(null,'y2',0);
		line.setAttributeNS(null,'stroke-width',2);
		line.setAttributeNS(null,'stroke',"#CF0000");
		
		// White key (C8)
		var C8Key = document.createElementNS(SVG_NS, 'rect');
		C8Key.id = "C8_Key";
		C8Key.setAttributeNS(null,'width',WHITE_KEY_WIDTH);
		C8Key.setAttributeNS(null,'height',OCTAVE_HEIGHT);
		//C8Key.setAttributeNS(null,'fill',"white");
		C8Key.setAttributeNS(null,'stroke',"black");
		C8Key.setAttributeNS(null,'stroke-width',.5);
		
		// Black keys (C#,D#,F#,G#,A#)
		var blackKey = document.createElementNS(SVG_NS, 'rect');
		blackKey.id = "FBK";
		blackKey.setAttributeNS(null,'width',BLACK_KEY_WIDTH);
		blackKey.setAttributeNS(null,'height',BLACK_KEY_HEIGHT);
		//blackKey.setAttributeNS(null,'fill',"black");
		blackKey.setAttributeNS(null,'stroke',"black");
		blackKey.setAttributeNS(null,'stroke-width',.5);
		
		//iterates to define normal keys
		var defaultsKeyData = { A0_Key:"0,150 23,150 23,95 18,95 18,0 0,0", 
								C_key:"0,150 23,150 23,96 15,96 15,0 0,0", 
								D_key:"0,150 23,150 23,96 18,96 18,0 5,0 5,96 0,96", 
								E_key:"0,150 23,150 23,0 8,0 8,96 0,96", 
								F_key:"0,150 23,150 23,96 13,96 13,0 0,0", 
								G_key:"0,150 23,150 23,96 16.5,96 16.5,0 3,0 3,96 0,96", 
								A_key:"0,150 23,150 23,96 20,96 20,0 6.5,0 6.5,96 0,96", 
								B_key:"0,150 23,150 23,0 10,0 10,96 0,96"};								
		for (var key in defaultsKeyData) {
			var whiteKey = document.createElementNS(SVG_NS, 'polygon');
			whiteKey.id = key;
			whiteKey.setAttributeNS(null,'width',WHITE_KEY_WIDTH);
			whiteKey.setAttributeNS(null,'points',defaultsKeyData[key]);
			whiteKey.setAttributeNS(null,'stroke-width',.5);
			defs.appendChild(whiteKey);
		}
		
		//Includes defs in our SVG
		defs.appendChild(line);
		defs.appendChild(C8Key);
		defs.appendChild(blackKey);
		svg.appendChild(defs);
							
		return svg;
	}

	/**
	  * Add Octave to the svg using previous defined structures via buildSVGDefs
	  * @param {svgDOMElement} svg - A basic SVG DOM ELEMENT with the usual properties defined
	  * @param {Number} octaveNumber - The desired number of Octaves (default:1)
	  * @param {Number} startingOctave - The first note (pitch) of the keyboard 
	  * @return {svgDOMElement} The DOMElement of a SVG keyboard
	  */
	buildSVGOctaves(definedSVG, octaveNumber = 3, startingOctave = 2) {
		var SVG_NS = 'http://www.w3.org/2000/svg';
		var XLink_NS = 'http://www.w3.org/1999/xlink';
		
		//iterates to use prior defined graphics
		var useDefsData = [ ["C_key","C",0,0], ["FBK","C#",1,16.1],
							["D_key","D",2,WHITE_KEY_AND_SPACEMENT], ["FBK","D#",3,42.65],
							["E_key","E",4,2*WHITE_KEY_AND_SPACEMENT],
							["F_key","F",5,3*WHITE_KEY_AND_SPACEMENT], ["FBK","F#",6,85], 
							["G_key","G",7,4*WHITE_KEY_AND_SPACEMENT], ["FBK","G#",8,112.15],
							["A_key","A",9,5*WHITE_KEY_AND_SPACEMENT], ["FBK","A#",10,139.3],  
							["B_key","B",11,6*WHITE_KEY_AND_SPACEMENT]]
		
		//Add any defined number of octaves
		for (var i = 0; i < octaveNumber; i++) {
			
			//define octave
			var octave = document.createElementNS(SVG_NS, 'g');
			var currentOctave = (startingOctave+i);
			octave.id = "Octave"+currentOctave;

			for (var j = 0; j < useDefsData.length; j++) {
				var entry = useDefsData[j];
				var use = document.createElementNS(SVG_NS, 'use');
				var xCoord = (i*OCTAVE_WIDTH)+entry[3];
				
				use.id = "key"+(entry[2]+(currentOctave*12));
				use.setAttributeNS(null,'class',"pianoKey");
				
				//Fill the key with the color depending on the class.
				if (entry[0] == "FBK") {
					use.setAttributeNS(null,'fill',"black");
				} else {
					use.setAttributeNS(null,'fill',"white");
				}
				
				use.setAttributeNS(null,'stroke',"black");
				use.setAttributeNS(XLink_NS,'xlink:href',"#"+entry[0]);
				use.setAttributeNS(null,'x',xCoord.toFixed(2));
				use.setAttributeNS(null,'y',0);
				//store KeyId 
				use.setAttribute('noteId',entry[2]+(currentOctave*12));
				
				octave.appendChild(use);
			}
			
			//add the top redline
			var feltLine = document.createElementNS(SVG_NS, 'use');
			feltLine.setAttributeNS(XLink_NS,'xlink:href',"#keyRedTopFeltLine");
			feltLine.setAttributeNS(null,'x',(i*OCTAVE_WIDTH));
			feltLine.setAttributeNS(null,'y',0);
			
			octave.appendChild(feltLine);
			definedSVG.appendChild(octave);
		
		}		
		return definedSVG;
	}

	/**
	  * Build an SVG DOMElement object to represent a Piano keybaord 
	  * @param {svgDOMElement} svg - A basic SVG DOM ELEMENT with the usual properties defined
	  * @param {Number} octaveNumber - The desired number of Octaves (default:1)
	  * @param {Number} startingOctave - The first note (pitch) of the keyboard 
	  * @return {svgDOMElement} The DOMElement of a SVG keyboard
	  */
	generateKeyboard(octaveNumber = 3, startingOctave = 2, magnify = 2) {
		
		//build SVG basic structure	
		var SVG_NS = 'http://www.w3.org/2000/svg';
		var XLink_NS = 'http://www.w3.org/1999/xlink';
		
		var svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		svg.setAttributeNS(null,'id', this.id);
		svg.setAttributeNS(null,'class', 'panel');
		//Here handle the wiewport and size of the top container
		svg.setAttributeNS(null,'width', magnify*(octaveNumber*OCTAVE_WIDTH));
		svg.setAttributeNS(null,'height', magnify*OCTAVE_HEIGHT);
		svg.setAttributeNS(null,'style', 'border: 1px solid black');
		svg.setAttributeNS(null,'transform',"scale("+magnify+")");
		
		//add definitions
		var definedSVG = this.buildSVGDefs(svg);
		
		//then build any number of octaves 
		return this.buildSVGOctaves(definedSVG,octaveNumber,startingOctave);
		
	};
	
	playNote(note) {
		//retrieve id of the key to stroke.
		var keyID = note.keyNumber;
		console.log(keyID);
		console.log(this.keys[keyID]);
		this.keys[keyID].strike();
		//note.highlight();
	}
	
	playChord(chord) {
		for (var i = 0; i < chord.notes.length; i++) {
			this.playNote(chord.notes[i]);
		}
	}

};
