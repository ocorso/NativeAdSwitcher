// =================================================
// ================ Instance Vars
// =================================================
var main = {};
main.xml = {};
main.xml.auto = "http://storage.googleapis.com/native/auto.xml";
//main.xml.movies = "http://storage.googleapis.com/native/movies.xml"
//main.xml.retail = "http://storage.googleapis.com/native/retail.xml";


//main.xml.nast = "http://ad.doubleclick.net/N6310/pfadx/VNAT_testing;sz=0x0;dcmt=text/xml;ord=76744343456434";
main.xml.nast = "http://localhost:8888/xml/movies.xml";
// =================================================
// ================ Doc Ready
// =================================================
jQuery( function($){
	console.log("-- Doc Ready Start --",navigator.appCodeName);

	//oc: test to get xml using native JS
	main.getXMLJS(main.xml.nast);

	main.addHandlers();
});


// =================================================
// ================ Loading Methods
// =================================================
function onXMLLoaded(data){
	console.log(data);
}
	//oc: test to get xml using native JS (doesn't work in FF)
main.getXMLJS = function (url) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange=function(){
 		if (xhr.readyState==4 && xhr.status==200){
 			console.log("XML Load Ready");
 			console.log(xhr.responseXML);

 	 		var title = xhr.responseXML.getElementsByTagName("Title")[0].textContent;
			console.log(title);

	    }else if(xhr.readyState==4){ 
	    	console.log("failed");
	    	console.log(xhr.status);
	  }
 	};
	
	xhr.open("GET",url,true); //change to desired DFA ad tag (must include dcmt=text/xml in the request)
	xhr.withCredentials = true; //Used to include cookie and other user data in the request. May not be needed if sequential rotation/geotargeting/frequency capping are not used.
	xhr.send();
};

// =================================================
// ================ Workers
// =================================================
function createAd(xml){


}
main.resetAndActivate = function(className){
	console.log("resetAndActivate: "+className);
	$("ul#switcher_btns li").removeClass("active");
	$(".post").removeClass("desktop-infeed facebook-feed textlink-img desktop-inpage")
		.addClass(className);
	$("#posts").removeClass("facebook-container desktop-inpage-container");

	switch(className){
		case "facebook-feed": 
			$("#posts").addClass("facebook-container");
			$("#facebook_header").css("display","block");
			break;
		case "desktop-inpage": 
			$("#posts").addClass("desktop-inpage-container");
			$("#facebook_header").css("display","none");
			break;
		default: 
			$("#facebook_header").css("display","none");
	}
};
main.getClassNameById = function(id){
	var className = id.replace("_","-");
	return className;
};
// =================================================
// ================ Handlers
// =================================================
main.addHandlers = function(){
	$("#abgc").hover(
			function(){ 
				$("#abgc").css("width","75px");
				$("#abgb").css("display","none");
				$("#abgs").css("display","block");
			},
			function(){ 
				$("#abgc").css("width","15px");
				$("#abgb").css("display","block");
				$("#abgs").css("display","none");

		});
	$("ul#switcher_btns li").click(main.switcherBtnsClick);

};

main.switcherBtnsClick = function (event){
	var className = main.getClassNameById($(this).attr("id"));
	console.log(className);
	main.resetAndActivate(className);
	$(this).addClass("active");
};
