var firereader = {
  onLoad: function() {
  //alert("onload");
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("firereader-strings");
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"), this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    firereader.onMenuItemCommand(e);
  }
};

var fireReaderUtil = {

	isOn: false,

	isReading: false,
	currentEle: null,
	turnOn: function(e){
	//alert(content.document.getElementById("reader"));
		var htmlEle = fireReaderUtil.currentEle;
		var newHTML = null;
		if(htmlEle.nodeName == "P")
		{
			newHTML = htmlEle.parentNode.innerHTML;
		}
		else if(htmlEle.parentNode.nodeName == "P")
		{
			newHTML = htmlEle.parentNode.parentNode.innerHTML;
		}
		else if(htmlEle.parentNode.parentNode.nodeName == "P")
		{
			newHTML = htmlEle.parentNode.parentNode.parentNode.innerHTML;
		}
		else
		{
			newHTML = htmlEle.parentNode.parentNode.innerHTML;
		}
		
		//alert(htmlEle.nodeName+", "+htmlEle.parentNode.nodeName+", "+htmlEle.parentNode.parentNode.nodeName);
		if(content.document.getElementById("reader") == null)
		{
			fireReaderUtil.addElements();
		}
		
		var bodyEle = content.document.body;
		var readerEle = content.document.getElementById("reader");
		var fadeEle = content.document.getElementById("bodyFade");
		//var newHTML = htmlEle.parentNode.parentNode.innerHTML;
		var bodyInnerHTML = bodyEle.innerHTML;

	  	fadeEle.style.display = "block";
	  	readerEle.style.display = "block";
	  	readerEle.innerHTML = newHTML;
	  	fireReaderUtil.isOn = true;

	},
	turnOff: function(e){

		var readerEle = content.document.getElementById("reader");
		var fadeEle = content.document.getElementById("bodyFade");
		fadeEle.style.display = "none";
	  	readerEle.style.display = "none";
	  	readerEle.innerHTML = "";
	  	fireReaderUtil.isOn = false;
	},
	elementStyles: function(){
		var h = content.document.height;
		var w = window.innerWidth;
	    var centerNum = (w/2)-(520/2);
		var scrollNum = content.document.documentElement.scrollTop;
		
		var readerEle = content.document.getElementById("reader");
		var fadeEle = content.document.getElementById("bodyFade");
		fadeEle.setAttribute('style','z-index:9999; display:none; top:0; left:0; background:#FFF; opacity:0.9; position:absolute; width:'+w+'px; height:'+h+'px');
		readerEle.setAttribute('style','text-align:left; z-index:9999; display:none; color:#000; position:absolute; padding:10px; width:500px; top:20px; left:'+centerNum+'px; background:#FFFFFF;');

	},
	addElements: function(){

	    //content.document.body.addEventListener("click", fireReaderUtil.leftClick, false); 
	   
	    document.getElementById("context-firereader").setAttribute("label", "Stop FireReader");

		var bodyEle = content.document.body;
		var bodyFade = content.document.createElement('div');
		bodyFade.setAttribute('id','bodyFade');
		bodyEle.appendChild(bodyFade);
		
		var newReaderEle = content.document.createElement('div');
	  	newReaderEle.setAttribute('id','reader');
	    bodyEle.appendChild(newReaderEle);

	    fireReaderUtil.elementStyles();
	   	fireReaderUtil.isReading = true;

	    
	},
	removeElements: function(){
	   	//content.document.body.removeEventListener("click", fireReaderUtil.leftClick, false); 

	 	document.getElementById("context-firereader").setAttribute("label", "Start FireReader");

		var readerEle = content.document.getElementById("reader");
		var fadeEle = content.document.getElementById("bodyFade");
		
		readerEle.parentNode.removeChild(readerEle);
		fadeEle.parentNode.removeChild(fadeEle);
		fireReaderUtil.isReading = false;

	
	},
	leftClick: function(e)
	{

		if(!fireReaderUtil.isOn)
		{
			fireReaderUtil.turnOn(e);
		}
		else
		{
			fireReaderUtil.turnOff(e);
		}
	},
	rightClick: function(e)
	{
		fireReaderUtil.currentEle = getEvent(e).target;
	},
	pageLoad: function(aEvent)
	{
		//fireReaderUtil.isOn = false;
		if(fireReaderUtil.isOn && fireReaderUtil.isReading)
		{
			if ((aEvent.originalTarget.nodeName == '#document') && (aEvent.originalTarget.defaultView.location.href == gBrowser.currentURI.spec)) 
	    	{
	    		fireReaderUtil.isOn = false;
	    		fireReaderUtil.isReading = false;
	    		document.getElementById("context-firereader").setAttribute("label", "Start FireReader");

	        	//content.document.body.addEventListener("click", fireReaderUtil.leftClick, false); 
	
	    	}
    	}
	},
	init: function()
	{
		//alert("init");
		if(!fireReaderUtil.isReading)
		{
			fireReaderUtil.addElements();
			fireReaderUtil.turnOn();
		}
		else
		{
			fireReaderUtil.removeElements();
		}
	}

}

function getEvent(e) {
	var event = e || window.event;
  	if( ! event.target ) 
  	{
    	event.target = event.srcElement
    }
  	return event;
}

//content.document.addEventListener('load', fireReaderUtil.pageLoad, false);
//gBrowser.addEventListener("load", fireReaderUtil.pageLoad, true);
window.addEventListener("contextmenu", fireReaderUtil.rightClick, false); 
window.addEventListener("load", firereader.onLoad, false);
//content.document.body.addEventListener("load", fireReaderUtil.init, false);





    var gBrowser = window.gBrowser;
    if (gBrowser.addEventListener) {
        gBrowser.addEventListener("load",fireReaderUtil.pageLoad,true);
    } 








