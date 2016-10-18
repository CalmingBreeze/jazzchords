// define the SVGkeyboard class
//
// a class used to display the stricken keys
class SVGKeyboard {
	//create a new keyboard with a specific id, and various octaves
	constructor(id, octaveNumber = 1) {
		this.id = id;
		this.octaveNumber = octaveNumber;
	}
	
	get id() {
		return this._id;
	};

	set id(myid) {
		this._id = myid;
	};
	
	//return the correct DOM element to append at the pageX
	//First build the defs then use 'em
	//the prompted result can be found at ../images/
	init2() {
		//Structure
		// svg
		//  |-> g
		//      |-> rect (border)
		//      |-> lines (between keys)
		//      |-> 

		var SVG_NS = 'http://www.w3.org/2000/svg';
		var XLink_NS = 'http://www.w3.org/1999/xlink';
		
		var svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		svg.setAttributeNS(null,'id', 'keyboard2');
		svg.setAttributeNS(null,'class', 'panel');
		svg.setAttributeNS(null,'width', '165.6');
		svg.setAttributeNS(null,'height', '150');
		svg.setAttributeNS(null,'style', 'border: 1px solid black');
		
		//define the definitions of the svg and the patterns like an octave
		var defs = document.createElementNS(SVG_NS, "defs");
		
		//define the red felt line
		var line = document.createElementNS(SVG_NS, 'line');
		line.id ="keyRedTopFeltLine";
		line.setAttributeNS(null,'x1',"0");
		line.setAttributeNS(null,'y1',"0");
		line.setAttributeNS(null,'x2',"165.6");
		line.setAttributeNS(null,'y2',"0");
		line.setAttributeNS(null,'stroke-width',"2");
		line.setAttributeNS(null,'stroke',"#CF0000");
		
		// White key (C8)
		var C8Key = document.createElementNS(SVG_NS, 'rect');
		C8Key.id = "C8_Key";
		C8Key.setAttributeNS(null,'width',"23.6");
		C8Key.setAttributeNS(null,'height',"150");
		C8Key.setAttributeNS(null,'fill',"white");
		C8Key.setAttributeNS(null,'stroke',"black");
		C8Key.setAttributeNS(null,'stroke-width',".5");
		
		// Black keys (C#,D#,F#,G#,A#)
		var blackKey = document.createElementNS(SVG_NS, 'rect');
		blackKey.id = "FBK";
		blackKey.setAttributeNS(null,'width',"11.5");
		blackKey.setAttributeNS(null,'height',"95");
		blackKey.setAttributeNS(null,'fill',"black");
		blackKey.setAttributeNS(null,'stroke',"black");
		blackKey.setAttributeNS(null,'stroke-width',".5");
		
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
			whiteKey.setAttributeNS(null,'points',defaultsKeyData[key]);
			whiteKey.setAttributeNS(null,'style',"fill:none; stroke:black");
			whiteKey.setAttributeNS(null,'stroke-width',".5");
			defs.appendChild(whiteKey);
		}
		
		//define octave
		var octave = document.createElementNS(SVG_NS, 'g');
		octave.id = "Octave";

		//iterates to use prior defined graphics
		var useDefsData = [ ["C_key",0], ["D_key",23.65], ["E_key",47.3], ["F_key",70.95], ["G_key",94.6], ["A_key",118.25], ["B_key",141.9],
							["FBK",16], ["FBK",42.6], ["FBK",85], ["FBK",112.1], ["FBK",139.3], ["keyRedTopFeltLine",0]]
		useDefsData.forEach(function(entry) {
			var use = document.createElementNS(SVG_NS, 'use');
			use.setAttributeNS(XLink_NS,'xlink:href',"#"+entry[0]);
			use.setAttributeNS(null,'x',entry[1]);
			use.setAttributeNS(null,'y',"0");
			octave.appendChild(use);
		});
		
		
		//TO DO Check if the order is correct (all the def before invoke)
		defs.appendChild(line);
		defs.appendChild(C8Key);
		defs.appendChild(blackKey);
		defs.appendChild(octave);
		svg.appendChild(defs);
		
		//invoke 1 octaves
		var invoke = document.createElementNS(SVG_NS, 'use');
		invoke.setAttributeNS(XLink_NS,'xlink:href',"#Octave");
		invoke.setAttributeNS(null,'x',"0");
		invoke.setAttributeNS(null,'y',"0");
		svg.appendChild(invoke);
		//invoke.setAttributeNS(null,'x',"165.65");
		//svg.appendChild(invoke);
		//invoke.setAttributeNS(null,'x',"311.30");
		//svg.appendChild(invoke);
		return svg;
	};
}
