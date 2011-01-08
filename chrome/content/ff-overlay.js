firereader.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ firereader.showFirefoxContextMenu(e); }, false);
};

firereader.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-firereader").hidden = gContextMenu.onImage;
};

window.addEventListener("load", firereader.onFirefoxLoad, false);
