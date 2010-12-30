
window.PeopleLookup = {
    prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.peoplelookup."),
    bools: ["google", "linkedin", "facebook", "wikipedia", "crunchbase", "twitter"],
    start: function() {
	var defaults = ["google", "linkedin", "facebook", "wikipedia"];
	for(var i=0; i<PeopleLookup.bools.length; i++) {
	if (PeopleLookup.bools[i] == defaults[i]) {
	    if (PeopleLookup.prefs.prefHasUserValue(PeopleLookup.bools[i])) document.getElementById(PeopleLookup.bools[i]).setAttribute("checked", false);
	    else document.getElementById(PeopleLookup.bools[i]).setAttribute("checked", true);
	}
	else {
	    if (PeopleLookup.prefs.prefHasUserValue(PeopleLookup.bools[i])) document.getElementById(PeopleLookup.bools[i]).setAttribute("checked", true);
	    else document.getElementById(PeopleLookup.bools[i]).setAttribute("checked", false);
	}	    
	}
    },
    searchnames: function() {
	var text = content.getSelection(); 
	var ranges = []; for(var j=0; j<text.rangeCount; j++) { 
	    ranges[j] = text.getRangeAt(j);
	    var names = String(ranges[j]).match(/\b[a-z]+\b/ig);
	    names.splice(1, names.length-2); 
	    var first = names[0];  
	    var last = names[1]; 
	    var google = "http://google.com/search?q=" + first + "+" + last;
	    var linkedin = "http://linkedin.com/pub/dir/" + first + "/" + last;
	    var facebook = "http://facebook.com/home.php?#!/search.php?q=" + first + "%20" + last;
	    var wikipedia = "http://wikipedia.org/wiki/" + first + "_" + last; 
	    var crunchbase = "http://crunchbase.com/person/" + first + "-" + last;
	    var twitter = "http://search.twitter.com/search?q=" + first + "+" + last;
	    var sites = [google, linkedin, facebook, wikipedia, crunchbase, twitter]; 
	    if ((first == null) || (last == null)) alert("Need to highlight a person's first and last name.");
	    else if ((first.length > 25) || (last.length > 25)) continue;
	    else {for(var k=0; k<sites.length; k++) {
		    if (PeopleLookup.prefs.getBoolPref(PeopleLookup.bools[k])) {gBrowser.addTab(sites[k])}
		}
	    }
	}
    },
    toggle: function(site) {
	var checkbool = site.getAttribute("checked");
	for(var i=0; i<PeopleLookup.bools.length; i++) {
	    if (document.getElementById("site_toggle").childNodes[i] == site) {
		var togglepref = PeopleLookup.bools[i];
		if (checkbool == "true") PeopleLookup.prefs.setBoolPref(togglepref, true);
		else PeopleLookup.prefs.setBoolPref(togglepref, false);
	    }
	}
    },
}
window.addEventListener("load", PeopleLookup.start, false);