var main = {};
main.xml = {};
main.xml.auto = "http://storage.googleapis.com/native/auto.xml";
main.xml.movies = "http://storage.googleapis.com/native/movies.xml"
main.xml.retail = "http://storage.googleapis.com/native/retail.xml";

jQuery( function($){
	console.log("-- Doc Ready Start --");

//	parseXML("http://ad.doubleclick.net/N6310/pfadx/VNAT_testing;sz=0x0;dcmt=text/xml;ord=76744343456434");
});

function parseXML (url) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange=function(){
 		if (xhr.readyState==4 && xhr.status==200){
 			console.log("readyStateChange");
 	 		var xmlTag = xhr.responseXML.getElementsByTagName("Impression")[0].childNodes[0].nodeValue;
			//change to desired xml tag
			 var attributeName = xhr.responseXML.getElementsByTagName("Tracking")[0].getAttributeNode("event").name;
			//change to desired xml tag and attribute name
			 var attributeValue = xhr.responseXML.getElementsByTagName("Tracking")[0].getAttributeNode("event").value;
			//change to desired xml tag and attribute name
			 alert("name: "+attributeName+", value: "+attributeValue+", tag: "+xmlTag);
	    }
 	}
	
	xhr.open("GET",url,false); //change to desired DFA ad tag (must include dcmt=text/xml in the request)
	//xhr.withCredentials = true; //Used to include cookie and other user data in the request. May not be needed if sequential rotation/geotargeting/frequency capping are not used.
	xhr.send();
}

