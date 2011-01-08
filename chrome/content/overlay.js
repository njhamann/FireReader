var firereader = {
  onLoad: function() {
  alert("onload");
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("firereader-strings");
    var appcontent = document.getElementById("appcontent");   // browser
    appcontent.addEventListener("DOMContentLoaded", fireReaderUtil.pageLoad, false);

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

	turnOn: function(e){
		var bodyEle = content.document.body;

		var htmlEle = getEvent(e).target;

		var readerEle = content.document.getElementById("reader");

		var fadeEle = content.document.getElementById("bodyFade");
		var newHTML = htmlEle.parentNode.parentNode.innerHTML;
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
		alert("element styles");
		var h = content.document.height;
		var w = window.innerWidth;
	    var centerNum = (w/2)-(420/2);
		var scrollNum = content.document.documentElement.scrollTop;
		
		var readerEle = content.document.getElementById("reader");
		var fadeEle = content.document.getElementById("bodyFade");
		fadeEle.setAttribute('style','display:none; top:0; left:0; background:#FFF; opacity:0.9; position:absolute; width:'+w+'px; height:'+h+'px');
		readerEle.setAttribute('style','display:none; color:#000; position:absolute; padding:10px; width:400px; top:20px; left:'+centerNum+'px; background:#FFFFFF;');

	},
	addElements: function(){
		alert("add elements");

	    content.document.body.addEventListener("click", fireReaderUtil.leftClick, false); 
	   
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
	   	content.document.body.removeEventListener("click", fireReaderUtil.leftClick, false); 

	 	document.getElementById("context-firereader").setAttribute("label", "Start FireReader");

		var readerEle = content.document.getElementById("reader");
		var fadeEle = content.document.getElementById("bodyFade");
		
		readerEle.parentNode.removeChild(readerEle);
		fadeEle.parentNode.removeChild(fadeEle);
		fireReaderUtil.isReading = false;

	
	},
	leftClick: function(e)
	{
		alert("left click");

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
	},
	pageLoad: function()
	{
		if(fireReaderUtil.isReading && content.document.getElementById("reader") == null)
		{
			fireReaderUtil.addElements();
		}
	}
	init: function()
	{
		if(!fireReaderUtil.isReading)
		{
			fireReaderUtil.addElements();
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

window.addEventListener("contextmenu", fireReaderUtil.rightClick, false); 
window.addEventListener("load", firereader.onLoad, false);
//content.document.body.addEventListener("load", fireReaderUtil.init, false);
content.document.addEventListener("DOMContentLoaded", fireReaderUtil.init, true);