//Define the Key class which bind sound and event to the SVG keyboards
class Key {
	constructor(keyNumber) {
		this._keyNumber = keyNumber;
		this._DOMKeyObject = document.querySelector('use#key'+this._keyNumber+'.pianoKey');
		this.bindSoundEvents();
	}
	
	//Attach event on the key
	bindSoundEvents() {
		var event3 = new Event('stricken');
		var event4 = new Event('released');
		
		var keyboardKey = document.querySelector('use#key'+this._keyNumber+'.pianoKey');
		
		//bind default event to custom ones
		keyboardKey.addEventListener("mousedown", function() { keyboardKey.dispatchEvent(event3); }, false );
			
		//Add event release
		keyboardKey.addEventListener('released', function () {
			this.classList.remove("stricken");
			//console.log('Releasing :'+this.id);
		}, false);
			
		//Add event "stricken"
		keyboardKey.addEventListener('stricken', function (e) {
			
			//Bind to the correct Note Sound
			var keySound = new Audio('./audio/'+this.id+".mp3");
			//Save the target for the release event
			var strickenKey = this;
			
			this.classList.add("stricken");
			//console.log('Striking :'+e.target.id);
			
			//Add release event on the END of the played sound
			keySound.addEventListener("ended", function(e) { 
					//console.log('sound ended :'+strickenKey.id); 
					strickenKey.dispatchEvent(event4); 
				}, false);
			//reaction on the strike : Play the note.
			keySound.play();
			
		}, false);
	}
	
	//fireEvent
	strike() {
		//document.querySelector('use#key31.pianoKey').dispatchEvent(new Event('stricken'));
		this._DOMKeyObject.dispatchEvent(new Event('stricken'));
	}
};