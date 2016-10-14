//TODO : connect the options pannel to the list generation

var keys = {C:0, D:2, E:4, F:5, G:7, A:9, B:11};
var keys_sharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var keys_flats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
//last drawn chord. Used to know where to clean the keys on the visual keyboard
var lastChord = [];

//option vars
var availableChords = ["C/E", "C/G", "C/B", "C/Bb", "C/D", "Cb5", "C5", "C6", "C69", "C7", "C7b5", "C7b9", "C7#5", "C7#9", "C7sus4", "C9", "C9b5", "C9#5", "C9sus4", "Cmaj7", "Cmaj9", "Cmajor",
"Cminor", "Cm#7", "Cm7", "Cm7b5", "Cm6", "Cm9", "Cmaj9", "Cm11", "Cadd9", "Csus2", "Csus4", "Cdim", "Cdim7", "Caug", "Chalfdim", "C#/F", "C#/G#", "C#/C", "C#/B", "C#/D#", "C#b5", "C#5", "C#6", "C#69", "C#7", "C#7b5", "C#7b9", "C#7#5", "C#7#9", "C#7sus4", "C#9", "C#9b5", "C#9#5", "C#9sus4", "C#maj7", "C#maj9", "C#major",
"C#minor", "C#m#7", "C#m7", "C#m7b5", "C#m6", "C#m9", "C#maj9", "C#m11", "C#add9", "C#sus2", "C#sus4", "C#dim", "C#dim7", "C#aug", "C#halfdim", "Db/F", "Db/Ab", "Db/C", "Db/B", "Db/Eb", "Dbb5", "Db5", "Db6", "Db69", "Db7", "Db7b5", "Db7b9", "Db7#5", "Db7#9", "Db7sus4", "Db9", "Db9b5", "Db9#5", "Db9sus4", "Dbmaj7", "Dbmaj9", "Dbmajor",
"Dbminor", "Dbm#7", "Dbm7", "Dbm7b5", "Dbm6", "Dbm9", "Dbmaj9", "Dbm11", "Dbadd9", "Dbsus2", "Dbsus4", "Dbdim", "Dbdim7", "Dbaug", "Dbhalfdim", "D/F#", "D/A", "D/C#", "D/C", "D/E", "Db5", "D5", "D6", "D69", "D7", "D7b5", "D7b9", "D7#5", "D7#9", "D7sus4", "D9", "D9b5", "D9#5", "D9sus4", "Dmaj7", "Dmaj9", "Dmajor",
"Dminor", "Dm#7", "Dm7", "Dm7b5", "Dm6", "Dm9", "Dmaj9", "Dm11", "Dadd9", "Dsus2", "Dsus4", "Ddim", "Ddim7", "Daug", "Dhalfdim", "D#/G", "D#/A#", "D#/D", "D#/C#", "D#/F", "D#b5", "D#5", "D#6", "D#69", "D#7", "D#7b5", "D#7b9", "D#7#5", "D#7#9", "D#7sus4", "D#9", "D#9b5", "D#9#5", "D#9sus4", "D#maj7", "D#maj9", "D#major",
"D#minor", "D#m#7", "D#m7", "D#m7b5", "D#m6", "D#m9", "D#maj9", "D#m11", "D#add9", "D#sus2", "D#sus4", "D#dim", "D#dim7", "D#aug", "D#halfdim", "Eb/G", "Eb/Bb", "Eb/D", "Eb/Db", "Eb/F", "Ebb5", "Eb5", "Eb6", "Eb69", "Eb7", "Eb7b5", "Eb7b9", "Eb7#5", "Eb7#9", "Eb7sus4", "Eb9", "Eb9b5", "Eb9#5", "Eb9sus4", "Ebmaj7", "Ebmaj9", "Ebmajor",
"Ebminor", "Ebm#7", "Ebm7", "Ebm7b5", "Ebm6", "Ebm9", "Ebmaj9", "Ebm11", "Ebadd9", "Ebsus2", "Ebsus4", "Ebdim", "Ebdim7", "Ebaug", "Ebhalfdim", "E/G#", "E/B", "E/D#", "E/D", "E/F#", "Eb5", "E5", "E6", "E69", "E7", "E7b5", "E7b9", "E7#5", "E7#9", "E7sus4", "E9", "E9b5", "E9#5", "E9sus4", "Emaj7", "Emaj9", "Emajor",
"Eminor", "Em#7", "Em7", "Em7b5", "Em6", "Em9", "Emaj9", "Em11", "Eadd9", "Esus2", "Esus4", "Edim", "Edim7", "Eaug", "Ehalfdim", "F/A", "F/C", "F/E", "F/Eb", "F/G", "Fb5", "F5", "F6", "F69", "F7", "F7b5", "F7b9", "F7#5", "F7#9", "F7sus4", "F9", "F9b5", "F9#5", "F9sus4", "Fmaj7", "Fmaj9", "Fmajor",
"Fminor", "Fm#7", "Fm7", "Fm7b5", "Fm6", "Fm9", "Fmaj9", "Fm11", "Fadd9", "Fsus2", "Fsus4", "Fdim", "Fdim7", "Faug", "Fhalfdim", "F#/A#", "F#/C#", "F#/F", "F#/E", "F#/G#", "F#b5", "F#5", "F#6", "F#69", "F#7", "F#7b5", "F#7b9", "F#7#5", "F#7#9", "F#7sus4", "F#9", "F#9b5", "F#9#5", "F#9sus4", "F#maj7", "F#maj9", "F#major",
"F#minor", "F#m#7", "F#m7", "F#m7b5", "F#m6", "F#m9", "F#maj9", "F#m11", "F#add9", "F#sus2", "F#sus4", "F#dim", "F#dim7", "F#aug", "F#halfdim", "Gb/Bb", "Gb/Db", "Gb/F", "Gb/E", "Gb/Ab", "Gbb5", "Gb5", "Gb6", "Gb69", "Gb7", "Gb7b5", "Gb7b9", "Gb7#5", "Gb7#9", "Gb7sus4", "Gb9", "Gb9b5", "Gb9#5", "Gb9sus4", "Gbmaj7", "Gbmaj9", "Gbmajor",
"Gbminor", "Gbm#7", "Gbm7", "Gbm7b5", "Gbm6", "Gbm9", "Gbmaj9", "Gbm11", "Gbadd9", "Gbsus2", "Gbsus4", "Gbdim", "Gbdim7", "Gbaug", "Gbhalfdim", "G/B", "G/D", "G/F#", "G/F", "G/A", "Gb5", "G5", "G6", "G69", "G7", "G7b5", "G7b9", "G7#5", "G7#9", "G7sus4", "G9", "G9b5", "G9#5", "G9sus4", "Gmaj7", "Gmaj9", "Gmajor",
"Gminor", "Gm#7", "Gm7", "Gm7b5", "Gm6", "Gm9", "Gmaj9", "Gm11", "Gadd9", "Gsus2", "Gsus4", "Gdim", "Gdim7", "Gaug", "Ghalfdim", "G#/C", "G#/D#", "G#/G", "G#/F#", "G#/A#", "G#b5", "G#5", "G#6", "G#69", "G#7", "G#7b5", "G#7b9", "G#7#5", "G#7#9", "G#7sus4", "G#9", "G#9b5", "G#9#5", "G#9sus4", "G#maj7", "G#maj9", "G#major",
"G#minor", "G#m#7", "G#m7", "G#m7b5", "G#m6", "G#m9", "G#maj9", "G#m11", "G#add9", "G#sus2", "G#sus4", "G#dim", "G#dim7", "G#aug", "G#halfdim", "Ab/C", "Ab/Eb", "Ab/G", "Ab/Gb", "Ab/Bb", "Abb5", "Ab5", "Ab6", "Ab69", "Ab7", "Ab7b5", "Ab7b9", "Ab7#5", "Ab7#9", "Ab7sus4", "Ab9", "Ab9b5", "Ab9#5", "Ab9sus4", "Abmaj7", "Abmaj9", "Abmajor",
"Abminor", "Abm#7", "Abm7", "Abm7b5", "Abm6", "Abm9", "Abmaj9", "Abm11", "Abadd9", "Absus2", "Absus4", "Abdim", "Abdim7", "Abaug", "Abhalfdim", "A/C#", "A/E", "A/G#", "A/G", "A/B", "Ab5", "A5", "A6", "A69", "A7", "A7b5", "A7b9", "A7#5", "A7#9", "A7sus4", "A9", "A9b5", "A9#5", "A9sus4", "Amaj7", "Amaj9", "Amajor",
"Aminor", "Am#7", "Am7", "Am7b5", "Am6", "Am9", "Amaj9", "Am11", "Aadd9", "Asus2", "Asus4", "Adim", "Adim7", "Aaug", "Ahalfdim", "A#/D", "A#/F", "A#/A", "A#/G#", "A#/C", "A#b5", "A#5", "A#6", "A#69", "A#7", "A#7b5", "A#7b9", "A#7#5", "A#7#9", "A#7sus4", "A#9", "A#9b5", "A#9#5", "A#9sus4", "A#maj7", "A#maj9", "A#major",
"A#minor", "A#m#7", "A#m7", "A#m7b5", "A#m6", "A#m9", "A#maj9", "A#m11", "A#add9", "A#sus2", "A#sus4", "A#dim", "A#dim7", "A#aug", "A#halfdim", "Bb/D", "Bb/F", "Bb/A", "Bb/Ab", "Bb/C", "Bbb5", "Bb5", "Bb6", "Bb69", "Bb7", "Bb7b5", "Bb7b9", "Bb7#5", "Bb7#9", "Bb7sus4", "Bb9", "Bb9b5", "Bb9#5", "Bb9sus4", "Bbmaj7", "Bbmaj9", "Bbmajor",
"Bbminor", "Bbm#7", "Bbm7", "Bbm7b5", "Bbm6", "Bbm9", "Bbmaj9", "Bbm11", "Bbadd9", "Bbsus2", "Bbsus4", "Bbdim", "Bbdim7", "Bbaug", "Bbhalfdim", "B/D#", "B/F#", "B/A#", "B/A", "B/C#", "Bb5", "B5", "B6", "B69", "B7", "B7b5", "B7b9", "B7#5", "B7#9", "B7sus4", "B9", "B9b5", "B9#5", "B9sus4", "Bmaj7", "Bmaj9", "Bmajor",
"Bminor", "Bm#7", "Bm7", "Bm7b5", "Bm6", "Bm9", "Bmaj9", "Bm11", "Badd9", "Bsus2", "Bsus4", "Bdim", "Bdim7", "Baug", "Bhalfdim" ];
//C
//"C/E", "C/G", "C/B", "C/Bb", "C/D", "Cb5", "C5", "C6", "C69", "C7", "C7b5", "C7b9", "C7#5", "C7#9", "C7sus4", "C9", "C9b5", "C9#5", "C9sus4", "Cmaj7", "Cmaj9", "Cmajor",
//"Cminor", "Cm#7", "Cm7", "Cm7b5", "Cm6", "Cm9", "Cmaj9", "Cm11", "Cadd9", "Csus2", "Csus4", "Cdim", "Cdim7", "Caug", "Chalfdim",
//C#
//"C#/F", "C#/G#", "C#/C", "C#/B", "C#/D#", "C#b5", "C#5", "C#6", "C#69", "C#7", "C#7b5", "C#7b9", "C#7#5", "C#7#9", "C#7sus4", "C#9", "C#9b5", "C#9#5", "C#9sus4", "C#maj7", "C#maj9", "C#major",
//"C#minor", "C#m#7", "C#m7", "C#m7b5", "C#m6", "C#m9", "C#maj9", "C#m11", "C#add9", "C#sus2", "C#sus4", "C#dim", "C#dim7", "C#aug", "C#halfdim",
//Db
//"Db/F", "Db/Ab", "Db/C", "Db/B", "Db/Eb", "Dbb5", "Db5", "Db6", "Db69", "Db7", "Db7b5", "Db7b9", "Db7#5", "Db7#9", "Db7sus4", "Db9", "Db9b5", "Db9#5", "Db9sus4", "Dbmaj7", "Dbmaj9", "Dbmajor",
//"Dbminor", "Dbm#7", "Dbm7", "Dbm7b5", "Dbm6", "Dbm9", "Dbmaj9", "Dbm11", "Dbadd9", "Dbsus2", "Dbsus4", "Dbdim", "Dbdim7", "Dbaug", "Dbhalfdim",
//D
//"D/F#", "D/A", "D/C#", "D/C", "D/E", "Db5", "D5", "D6", "D69", "D7", "D7b5", "D7b9", "D7#5", "D7#9", "D7sus4", "D9", "D9b5", "D9#5", "D9sus4", "Dmaj7", "Dmaj9", "Dmajor",
//"Dminor", "Dm#7", "Dm7", "Dm7b5", "Dm6", "Dm9", "Dmaj9", "Dm11", "Dadd9", "Dsus2", "Dsus4", "Ddim", "Ddim7", "Daug", "Dhalfdim",
//D#
//"D#/G", "D#/A#", "D#/D", "D#/C#", "D#/F", "D#b5", "D#5", "D#6", "D#69", "D#7", "D#7b5", "D#7b9", "D#7#5", "D#7#9", "D#7sus4", "D#9", "D#9b5", "D#9#5", "D#9sus4", "D#maj7", "D#maj9", "D#major",
//"D#minor", "D#m#7", "D#m7", "D#m7b5", "D#m6", "D#m9", "D#maj9", "D#m11", "D#add9", "D#sus2", "D#sus4", "D#dim", "D#dim7", "D#aug", "D#halfdim",
//Eb
//"Eb/G", "Eb/Bb", "Eb/D", "Eb/Db", "Eb/F", "Ebb5", "Eb5", "Eb6", "Eb69", "Eb7", "Eb7b5", "Eb7b9", "Eb7#5", "Eb7#9", "Eb7sus4", "Eb9", "Eb9b5", "Eb9#5", "Eb9sus4", "Ebmaj7", "Ebmaj9", "Ebmajor",
//"Ebminor", "Ebm#7", "Ebm7", "Ebm7b5", "Ebm6", "Ebm9", "Ebmaj9", "Ebm11", "Ebadd9", "Ebsus2", "Ebsus4", "Ebdim", "Ebdim7", "Ebaug", "Ebhalfdim",
//E
//"E/G#", "E/B", "E/D#", "E/D", "E/F#", "Eb5", "E5", "E6", "E69", "E7", "E7b5", "E7b9", "E7#5", "E7#9", "E7sus4", "E9", "E9b5", "E9#5", "E9sus4", "Emaj7", "Emaj9", "Emajor",
//"Eminor", "Em#7", "Em7", "Em7b5", "Em6", "Em9", "Emaj9", "Em11", "Eadd9", "Esus2", "Esus4", "Edim", "Edim7", "Eaug", "Ehalfdim",
//F
//"F/A", "F/C", "F/E", "F/Eb", "F/G", "Fb5", "F5", "F6", "F69", "F7", "F7b5", "F7b9", "F7#5", "F7#9", "F7sus4", "F9", "F9b5", "F9#5", "F9sus4", "Fmaj7", "Fmaj9", "Fmajor",
//"Fminor", "Fm#7", "Fm7", "Fm7b5", "Fm6", "Fm9", "Fmaj9", "Fm11", "Fadd9", "Fsus2", "Fsus4", "Fdim", "Fdim7", "Faug", "Fhalfdim",
//F#
//"F#/A#", "F#/C#", "F#/F", "F#/E", "F#/G#", "F#b5", "F#5", "F#6", "F#69", "F#7", "F#7b5", "F#7b9", "F#7#5", "F#7#9", "F#7sus4", "F#9", "F#9b5", "F#9#5", "F#9sus4", "F#maj7", "F#maj9", "F#major",
//"F#minor", "F#m#7", "F#m7", "F#m7b5", "F#m6", "F#m9", "F#maj9", "F#m11", "F#add9", "F#sus2", "F#sus4", "F#dim", "F#dim7", "F#aug", "F#halfdim",
//Gb
//"Gb/Bb", "Gb/Db", "Gb/F", "Gb/E", "Gb/Ab", "Gbb5", "Gb5", "Gb6", "Gb69", "Gb7", "Gb7b5", "Gb7b9", "Gb7#5", "Gb7#9", "Gb7sus4", "Gb9", "Gb9b5", "Gb9#5", "Gb9sus4", "Gbmaj7", "Gbmaj9", "Gbmajor",
//"Gbminor", "Gbm#7", "Gbm7", "Gbm7b5", "Gbm6", "Gbm9", "Gbmaj9", "Gbm11", "Gbadd9", "Gbsus2", "Gbsus4", "Gbdim", "Gbdim7", "Gbaug", "Gbhalfdim",
//G
//"G/B", "G/D", "G/F#", "G/F", "G/A", "Gb5", "G5", "G6", "G69", "G7", "G7b5", "G7b9", "G7#5", "G7#9", "G7sus4", "G9", "G9b5", "G9#5", "G9sus4", "Gmaj7", "Gmaj9", "Gmajor",
//"Gminor", "Gm#7", "Gm7", "Gm7b5", "Gm6", "Gm9", "Gmaj9", "Gm11", "Gadd9", "Gsus2", "Gsus4", "Gdim", "Gdim7", "Gaug", "Ghalfdim",
//G#
//"G#/C", "G#/D#", "G#/G", "G#/F#", "G#/A#", "G#b5", "G#5", "G#6", "G#69", "G#7", "G#7b5", "G#7b9", "G#7#5", "G#7#9", "G#7sus4", "G#9", "G#9b5", "G#9#5", "G#9sus4", "G#maj7", "G#maj9", "G#major",
//"G#minor", "G#m#7", "G#m7", "G#m7b5", "G#m6", "G#m9", "G#maj9", "G#m11", "G#add9", "G#sus2", "G#sus4", "G#dim", "G#dim7", "G#aug", "G#halfdim",
//Ab
//"Ab/C", "Ab/Eb", "Ab/G", "Ab/Gb", "Ab/Bb", "Abb5", "Ab5", "Ab6", "Ab69", "Ab7", "Ab7b5", "Ab7b9", "Ab7#5", "Ab7#9", "Ab7sus4", "Ab9", "Ab9b5", "Ab9#5", "Ab9sus4", "Abmaj7", "Abmaj9", "Abmajor",
//"Abminor", "Abm#7", "Abm7", "Abm7b5", "Abm6", "Abm9", "Abmaj9", "Abm11", "Abadd9", "Absus2", "Absus4", "Abdim", "Abdim7", "Abaug", "Abhalfdim",
//A
//"A/C#", "A/E", "A/G#", "A/G", "A/B", "Ab5", "A5", "A6", "A69", "A7", "A7b5", "A7b9", "A7#5", "A7#9", "A7sus4", "A9", "A9b5", "A9#5", "A9sus4", "Amaj7", "Amaj9", "Amajor",
//"Aminor", "Am#7", "Am7", "Am7b5", "Am6", "Am9", "Amaj9", "Am11", "Aadd9", "Asus2", "Asus4", "Adim", "Adim7", "Aaug", "Ahalfdim",
//A#
//"A#/D", "A#/F", "A#/A", "A#/G#", "A#/C", "A#b5", "A#5", "A#6", "A#69", "A#7", "A#7b5", "A#7b9", "A#7#5", "A#7#9", "A#7sus4", "A#9", "A#9b5", "A#9#5", "A#9sus4", "A#maj7", "A#maj9", "A#major",
//"A#minor", "A#m#7", "A#m7", "A#m7b5", "A#m6", "A#m9", "A#maj9", "A#m11", "A#add9", "A#sus2", "A#sus4", "A#dim", "A#dim7", "A#aug", "A#halfdim",
//Bb
//"Bb/D", "Bb/F", "Bb/A", "Bb/Ab", "Bb/C", "Bbb5", "Bb5", "Bb6", "Bb69", "Bb7", "Bb7b5", "Bb7b9", "Bb7#5", "Bb7#9", "Bb7sus4", "Bb9", "Bb9b5", "Bb9#5", "Bb9sus4", "Bbmaj7", "Bbmaj9", "Bbmajor",
//"Bbminor", "Bbm#7", "Bbm7", "Bbm7b5", "Bbm6", "Bbm9", "Bbmaj9", "Bbm11", "Bbadd9", "Bbsus2", "Bbsus4", "Bbdim", "Bbdim7", "Bbaug", "Bbhalfdim",
//B
//"B/D#", "B/F#", "B/A#", "B/A", "B/C#", "Bb5", "B5", "B6", "B69", "B7", "B7b5", "B7b9", "B7#5", "B7#9", "B7sus4", "B9", "B9b5", "B9#5", "B9sus4", "Bmaj7", "Bmaj9", "Bmajor",
//"Bminor", "Bm#7", "Bm7", "Bm7b5", "Bm6", "Bm9", "Bmaj9", "Bm11", "Badd9", "Bsus2", "Bsus4", "Bdim", "Bdim7", "Baug", "Bhalfdim"];
var answeringtime = 8;
var solutiontime = 5;
var chordsleft = 20;

//Display the selected tab
function display_tab(id) {
	$('.panel').hide();
	//If the tab required a visual keyboard (don't forget to clear it)
	if ((id == "chords") || (id == "visualizer")){
		if (lastChord.length > 0) 
		{ 
			clearKeyboard(lastChord);
		}
		$("#keyboard").show();
	}
	$("#"+id).show();
}

//Highlight a note in the svg keyboard
function drawNote(id) {
	//console.log("Appel à drawNote avec l'id suivant : "+id);
	var key = document.getElementById("Key"+id);
	key.style.fill = "#0000ff";
}

//Hide a id-specifiednote where 0 is C0, 14:D1, 15:D1#
function clearNote(id) {
	console.log("Appel à clearNote avec l'id suivant : "+id);
	var key = document.getElementById("Key"+id);
	var id_m = id%12;
	//blakc or white key: 
	if (id_m == 1 || id_m == 3 || id_m == 6 || id_m == 8 || id_m == 10){
		key.style.fill = "#000000";
	} else {
		key.style.fill = "none";
	}
}

//Reset the keyboard in the default position (no keys highlighted)
function clearKeyboard(chord) {
	//Handle salshed chords
	//if last cell contains negative int, transpose to next octave (+12)
	var transpose = (chord[chord.length-1] < 0) ? 12 : 0;
	
	clearNote(transpose+chord[0]);
	for	(var index = 1; index < chord.length; index++) {
		clearNote(transpose+chord[0]+chord[index]);
	}
}

// in : coded chords as Cm7b5, Gbaug, F/A
// out : show on the keyboard the correct keys used
function compute(chord) {
	var alteration = 0;
	var base_position = 12;
	var fondamental_value = 0;
	var fondamental_name = "";
	var final_chord = "";
	var notes = [];
	
	//clean previous chord
	if (lastChord.length > 0) { clearKeyboard(lastChord) }
	
	//find if there is any alteration
	if ((chord.substr(1,1) == 'b') && (chord.substr(2,1) != '5')) {
		alteration -= 1;
	} else if (chord.substr(1,1) == '#') {
		alteration += 1;
	}
	
	//determine where to put the chord for better visibility	
	//if 9th or 13th
	//if higher than F

	//Cb isn't supposed to be called
	fondamental_value = fondamental_value + keys[chord.substr(0,1)] + alteration;
	
	//affiche la fondamentale
	//drawNote(fondamental_value);
	
	//then case for each part
	//we can slice the fondamental	
	if (alteration != 0) {
		final_chord = chord.substr(0,2);
		chord = chord.substr(2);
	} else {
		final_chord = chord.substr(0,1);
		chord = chord.substr(1);
	}
	
	
	
	//then the fat switch
	//add fonamental:
	notes.push(fondamental_value);
	switch (chord.substr(0,1)) {
	case "h":
		//C halfdim / Cø / Cm7b5 -> 
		//Accord dim + 7° mineure
		//fondamentale, tierce-, quinte-, septième-
		notes.push(3);//tierce-
		notes.push(6);//quinte-
		notes.push(10);//septième-
		console.log(final_chord+"half dim");
		break;
	
	case "b":
		//C b5
		// Cmajeur avec quinte dim
		//fondamentale, tierce, quinte-
		notes.push(4);//tierce
		notes.push(6);//quinte-
		console.log(final_chord+"b5");
		break;
	
	case "d":
		notes.push(3);//tierce-
		notes.push(6);//quinte-
		if (chord.length == 3) {
			//Cdim
			//C majeur full diminué
			//fondamentale, tierce-, quinte-
			console.log(final_chord+"dim");
		} else {
			//Cdim7
			//C majeur7 full diminué
			//fondamentale, tierce-, quinte-, septième--
			notes.push(9);//septième--
			console.log(final_chord+"dim7");
		}
		break;
		
	case "s":
		if (chord.substr(3,1) == "2") {
			//Csus2
			//fondamentale,seconde,quinte
			notes.push(2);//seconde
			notes.push(7);//quinte
			console.log(final_chord+"sus2");
		} else {
			//Csus4
			//fondamentale,quarte,quinte
			notes.push(5);//quarte
			notes.push(7);//quinte
			console.log(final_chord+"sus4");
		}
		break;
		
	case "a":
		if (chord.substr(0,3) == "add") {
			//Cadd9
			//Cmaj + 9th
			//fondalentale,tierce,quinte,neuvième
			notes.push(4);//tierce
			notes.push(7);//quinte
			notes.push(14);//neuvième
			console.log(final_chord+"add9");
		} else {
			//Caug / C+
			//quinte augmentée
			//fondamentale,tierce,quinte+
			notes.push(4);//tierce
			notes.push(8);//quinte+
			console.log(final_chord+"aug");
		}
		break;
	
    case "5":
		//C5 PowerChord
		//Quinte doublée à l'octave
		//fondamentale, quinte, octave sup
		notes.push(7);//quinte
		notes.push(12);//octave
        console.log(final_chord+"5 PowerChord");
        break;
		
    case "6":
        if (chord.length == 1) {
			//C6
			//Accord majeur + sixte
			//fondamentale, tierce, quinte, sixte
			notes.push(4);//tierce
			notes.push(7);//quinte
			notes.push(9);//sixte
			console.log(final_chord+"6");
		} else {
			//C69 ou C6/9
			//Accord majeur + sixte + neuvième
			//fondamentale, tierce, quinte, sixte, neuvième
			notes.push(4);//tierce
			notes.push(7);//quinte
			notes.push(9);//sixte
			notes.push(14);//neuvième
			console.log(final_chord+"69");
		}
        break;
		
	case "9":	
		if (chord.length == 1) {
			//C9
			//C + 7 + 9
			//fondamentale, tierce, quinte, septième-, neuvième
			console.log(final_chord+"9");
			notes.push(4);//tierce
			notes.push(7);//quinte
			notes.push(10);//septième-
			notes.push(14);//neuvième
		} else if (chord.substr(1,1) == "b") {
			//C9b5
			//Même qu'au dessus avec une quinte -
			//fondamentale, tierce, quinte-, septième-, neuvième
			notes.push(4);//tierce
			notes.push(6);//quinte-
			notes.push(10);//septième-
			notes.push(14);//neuvième
			console.log(final_chord+"9b5");
		} else if (chord.substr(1,1) == "#") {
			//C9#5
			//Même qu'au dessus avec une quinte+ sans 7TH
			//fondamentale, tierce, quinte+, neuvième
			notes.push(4);//tierce
			notes.push(8);//quinte+
			notes.push(14);//neuvième
			console.log(final_chord+"9#5");
		} else {
			//C9sus4
			notes.push(5);//quarte
			notes.push(7);//quinte
			notes.push(10);//septième-
			notes.push(14);//neuvième
			console.log(final_chord+"9sus4");
		}
		break;
	
    case "/":
        //generate correct chords
		//rules 1:altered chords -> keep alteration related ie : Eb -> use keys_flats C# -> keys_sharps
		//      2:default-> if its C and F use keys_flats, for ABDEG use keys-sharps
		//generate 5 usual chords
		//C ->  C/E, C/G, C/B, C/Bb, C/D
		//C ->  C/+4, C+7, C+11, C+10, C+2 (previous octave so add -12) -> C/-8, C/-5, C/-1, C/-2, C/-10
		var slashed = final_chord+"/";
		var slashed2 = final_chord+"/";
		var slashed3 = final_chord+"/";
		var slashed4 = final_chord+"/";
		var slashed5 = final_chord+"/";
		fondamental_value += 12;
		
		if ((alteration == -1) || (final_chord == "C") || (final_chord == "F")) {
			//use flats
			slashed += keys_flats[(fondamental_value+4)%12];
			slashed2 += keys_flats[(fondamental_value+7)%12];
			slashed3 += keys_flats[(fondamental_value+11)%12];
			slashed4 += keys_flats[(fondamental_value+10)%12];
			slashed5 += keys_flats[(fondamental_value+2)%12];
		} else {
			//use sharps
			slashed += keys_sharps[(fondamental_value+4)%12];
			slashed2 += keys_sharps[(fondamental_value+7)%12];
			slashed3 += keys_sharps[(fondamental_value+11)%12];
			slashed4 += keys_sharps[(fondamental_value+10)%12];
			slashed5 += keys_sharps[(fondamental_value+2)%12];
		}
		
		notes.push(4);//tierce
		notes.push(7);//quinte
		// TO FIX problem : C/B and C/Bb
		//console.log(final_chord+chord.substr(0,2), slashed, slashed2, slashed3, slashed4, slashed5);
		switch (final_chord+(chord.substr(0,3))) {
			case slashed:
				//tierce à la basse
				notes.push(-8);
				console.log(slashed);
				break;
			case slashed2:
				//quinte à la basse
				notes.push(-5);
				console.log(slashed2);
				break;
			case slashed3:
				//septième à la basse
				notes.push(-1);
				console.log(slashed3);
				break;
			case slashed4:
				//septième mineure à la basse
				notes.push(-2);
				console.log(slashed4);
				break;
			case slashed5:
				//seconde à la basse
				notes.push(-10);
				console.log(slashed5);
				break;
			default :
				console.log("Unknown Slashed chord");
		}
        break;
		
    case "7":
        //code block
		switch (chord.substr(1,1)) {
			case "b":
				notes.push(4);//tierce
				notes.push(10);//septième-
				if (chord.substr(2,1) == "5") {
					//C7b5
					//Accord Septième avec quinte dim
					//fondamentale, tierce, quinte-, septième-
					notes.push(6);//quinte-
					console.log(final_chord+"7b5");
				} else {
					//C7b9
					//Accord Septième avec neuvième dim
					//fondamentale, tierce, quinte, septième-, neuvième-
					notes.push(7);//quinte
					notes.push(13);//neuvième-
					console.log(final_chord+"7b9");
				}
				break;
			case "#":
				if (chord.substr(2,1) == "5") {
					//C7#5
					//Accord Septième avec quinte aug
					//fondamentale, tierce, quinte+, septième-
					notes.push(4);//tierce
					notes.push(8);//quinte+
					notes.push(10);//septième-
					console.log(final_chord+"7#5");
				} else {
					//C7#9
					//Accord Septième avec neuvième aug
					//fondamentale, tierce, quinte, septième-, neuvième+
					notes.push(4);//tierce
					notes.push(7);//quinte
					notes.push(10);//septième-
					notes.push(15);//neuvième+
					console.log(final_chord+"7#9");
				}
				break;
			case "s":
				//C7sus4
				//Accord Septième sans tierce avec quarte sup
				//fondamentale, quarte, quinte, septième-
				notes.push(5);//quarte
				notes.push(7);//quinte
				notes.push(10);//septième-
				console.log(final_chord+"7sus4");
				break;
			default :
				//C7 FIX attention wrong chords sometimes C7BB9 => C7
				//Accord de septième de dominante
				//fondamentale, tierce, quinte, septième-
				notes.push(4);//tierce
				notes.push(7);//quinte
				notes.push(10);//septième-
				console.log(final_chord+"7");
		}
        break;
	
	case "m":
        switch (chord.substr(1,1)) {
			case "#":
				//Cm#7 / CmM7
				//Accord de septième de dominante avec tierce mineure
				//fondamentale, tierce-, quinte, septième-
				notes.push(3);//tierce-
				notes.push(7);//quinte
				notes.push(11);//septième
				console.log(final_chord+"m#7");
				break;
			case "i":
				//Cminor
				//fondamentale, tierce-, quinte
				notes.push(3);//tierce-
				notes.push(7);//quinte
				console.log(final_chord+"minor");
				break;
			case "a":
				notes.push(4);//tierce
				notes.push(7);//quinte
				switch (chord.substr(3,1)) {
					case "7":
						//Cmaj7 / CΔ
						//fondamentale, tierce, quinte, septième
						notes.push(11);//septième
						console.log(final_chord+"maj7");
						break;
					case "9":
						//Cmaj9 / CΔ9
						//fondamentale, tierce, quinte, septième, neuvième
						notes.push(11);//septième
						notes.push(14);//neuvième
						console.log(final_chord+"maj9");
						break;
					case "o":
						//Cmajor
						//fondamentale, tierce, quinte
						console.log(final_chord+"major");
						break;
					default :
						console.log("Unknown Cmaj* chord");
				}
				break;
			case "6":
				//Cm6
				//Cminor + sixte
				//fondamentale, tierce-, quinte, sixte
				notes.push(3);//tierce-
				notes.push(7);//quinte
				notes.push(9);//sixte
				console.log(final_chord+"m6");
				break;
			case "7":
				if (chord.substr(2,1) == "b") {
					//Cm7b5 / Cø // halfdim
					//Cm7 et quinte dim
					//fondamentale, tierce-, quinte-, septième-
					notes.push(3);//tierce-
					notes.push(6);//quinte-
					notes.push(10);//septième-
					console.log(final_chord+"m7b5");
				} else {
					//Cm7
					//fondamentale, tierce-, quinte, septième-
					notes.push(3);//tierce-
					notes.push(7);//quinte
					notes.push(10);//septième-
					console.log(final_chord+"m7");
				}
				break;
			case "9":
				//Cm9
				//Cminor + 9
				////fondamentale, tierce-, quinte, septième-, neuvième
				notes.push(3);//tierce-
				notes.push(7);//quinte
				notes.push(10);//septième-
				notes.push(14);//neuvième
				console.log(final_chord+"m9");
				break;
			case "1":
				//Cm11
				//Cminor + 7 + 9 + 11
				////fondamentale, tierce-, quinte, septième-, neuvième, onzième
				notes.push(3);//tierce-
				notes.push(7);//quinte
				notes.push(10);//septième-
				notes.push(14);//neuvième
				notes.push(17);//neuvième
				console.log(final_chord+"m11");
				break;
			default :
				console.log("Unknown Cm* chord");
		}
        break;
	
    default:
        console.log("Unknown chord : "+final_chord+chord);
	}
	
	//drawNote
	drawNote(fondamental_value);
	for	(var index = 1; index < notes.length; index++) {
		drawNote(fondamental_value+notes[index]);
	} 
	
	//update last chord for easier erasing
	lastChord = notes;
}

// update the counters (time and remaining questions)
function refreshQuizzCounters(questionsleft) {
	//if the test is launched, we need to hide the start button
	//TO DO : OPTIMIZE : avoid test and UI refresh ? (more test, but avoid 2jqueries by question)
	
	//hide the time left before the next question
	$("#questionTimerBlock").show();
	$("#solutionTimerBlock").hide();
	
	answeringtime = 8;
	solutiontime = 5;
	$("#anwsertimer").html(answeringtime);
	$("#solutiontimer").html(solutiontime);
	$("#remainingquestion").html(questionsleft);
}

// start the quizz mode. Calling each questions until none remaining.
function startChordTest(init) {
	if (init) {
		$("#askchordbutton").hide();
		$("#stopchordbutton").show();
	}	
	
	//Refresh the timers and number questions
	refreshQuizzCounters(chordsleft);
	
	//Ask chords until the remaining question number reach 0.
	if (chordsleft > 0) {
		console.log("il reste encore "+chordsleft+" questions.");
		askChord();
	} else {
		stopChordTest();
	}
}

// start the quizz mode. Called each questions until some remaining.
function stopChordTest() {
	alert('Fin du test');
	
	//clear timers 
	clearInterval(askingChordCountdown);
	clearTimeout(timerBetweenQuestions);
	clearInterval(solutionChordCountdown);
	
	//Default interface
	$("#askedChordSpan").html("[AskedChord]");
	$("#askchordbutton").show();
	$("#stopchordbutton").hide();
	
	//to allow replay reset vars.
	chordsleft = 20;
	refreshQuizzCounters(chordsleft);
	//clear the keyboard
	if (lastChord.length > 0) { 
		clearKeyboard(lastChord);
	}
}

//Propose a chord, launch a countdown and display the corrects keys 
function askChord() {
	//random on chordlist length to pick a random chord to display
	//console.log(availableChords[Math.floor((Math.random() * availableChords.length) + 1)]);
	//Math.floor((Math.random() * 100) + 1);
	var askedChord = availableChords[Math.floor((Math.random() * availableChords.length) + 1)];
	
	//clear the keyboard
	if (lastChord.length > 0) { clearKeyboard(lastChord) }
	
	//show the asked Chord
	$("#askedChordSpan").html(askedChord);
	
	//Start the countdown to let the user answer	
	askingChordCountdown = setInterval(
		function() {
			//console.log("askingChordCountdown timeleft : "+answeringtime);
			if (answeringtime > 0) { 
				answeringtime -= 1; 
				$("#anwsertimer").html(answeringtime); 
			} else {
				console.log("clearInterval of Askingtimer");
				clearInterval(askingChordCountdown);
			}
		}, 1000);
	
	//show the correct answer 5 sec after.
	timerBetweenQuestions = setTimeout(
		function() {
			compute(askedChord);
			//switch timers
			$("#questionTimerBlock").hide();
			$("#solutionTimerBlock").show();
			
			//start the solution timer
			solutionChordCountdown = setInterval(
				function() {
					//console.log("solutionChordCountdown timeleft : "+solutiontime);
					if (solutiontime > 0) { 
						solutiontime -= 1; 
						$("#solutiontimer").html(solutiontime); 
					} else {
						console.log("clearInterval of Solution Timer");
						clearInterval(solutionChordCountdown);
						//launch another question.
						startChordTest();
					}
				}, 1000);
		}, 8000);
		
	//decrease remaining questions
	chordsleft -= 1;
}

$(document).ready(function() {
	display_tab('question');
});