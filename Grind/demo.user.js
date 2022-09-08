// ==UserScript==
// @name         Гринд
// @version      0.10
// @description  Гринд...
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// @match        https://www.lowadi.com/elevage/bureau/*
// ==/UserScript==
	

    if(location.href.indexOf('elevage/bureau/') !== -1) {
		$('section.content__middle > ul.tab').append('<li id="tab-grind-settings" class="tab-style-6-0-0"><div><a style="" href="' + location.href + '#tab-grind-settings" class="tab-action">Настройки скрипта</a></div></li>');
		fetchGrindSettingsFetch();
		$('#tab-grind-settings').click(function(){showGrindSettings();});
	}
	
	if (location.href.indexOf('chevaux/cheval?id') !== -1) {
		
	}
	
	
function fetchGrindSettingsFetch() {
	fetch('https://raw.githubusercontent.com/4eDo/lowadi/main/static/settingsTab.txt?' + Date.now()).then(function(response) { 
        if (!response.ok) { 
            return false; 
        } 
        return response.blob(); 
    }) .then(function(myBlob) { 
        var objectURL = URL.createObjectURL(myBlob); 
        var sc = document.createElement("script");
        sc.setAttribute("src", objectURL); 
        sc.setAttribute("type", "text/javascript"); 
        document.head.appendChild(sc);
    })
}