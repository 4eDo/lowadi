// ==UserScript==
// @name         Гринд
// @version      0.11
// @description  Гринд...
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// @match        https://www.lowadi.com/elevage/bureau/*
// ==/UserScript==
/** Всякие переменные */
var msg_01 = "Скрипт можно запускать только на странице лошади!";
	
/** Панелька запуска и остановки (видна в офисе и у лошади)*/
	var navPanelGT = '<div style="background: #333333d0;width: 130px;padding: 10px;line-height: 30px;position: fixed;z-index: 9999;border-radius:4px;top: 0px;"><button id="runGringButton" style="width: 130px;">Запустить кач</button><button id="runTabogonButton" style="width: 130px;">Запустить прогон</button><button id="goToSettingsButton" style="width: 130px;"><a href="https://www.lowadi.com/elevage/bureau/#tab-grind-settings">НАСТРОЙКИ</a></button><button id="StopAllGTButton" style="width: 130px;height: 50px;" disabled>ОСТАНОВИТЬ</button></div>';
	$('body#global').append(navPanelGT);
		

	if (location.href.indexOf('chevaux/cheval?id') !== -1) {
		$('#runGringButton').click(function(){runGrindPlz();});
		$('#runTabogonButton').click(function(){runTabogon();});
	} else {
		$('#runGringButton').click(function(){alert(msg_01);});
		$('#runTabogonButton').click(function(){alert(msg_01);});
	}
	$('#StopAllGTButton').click(function(){stopAllGT();});


/** Работа кнопочек */	
	if(localStorage.getItem('stopGrind') == 0 && localStorage.getItem('isGTRun') == 1) {
		$('#StopAllGTButton').removeAttr('disabled');
		$('#runTabogonButton').attr('disabled', 'disabled');
	} else if(localStorage.getItem('stopTabogon') == 0 && localStorage.getItem('isGTRun') == 1) {
		$('#StopAllGTButton').removeAttr('disabled');
		$('#runGringButton').attr('disabled', 'disabled');
	}

/** Навигация */
function stopAllGT(){localStorage.removeItem('stopGrind');localStorage.removeItem('stopTabogon');}	
function runGrindPlz(){if(confirm("Вы точно хотите запустить КАЧ?")){localStorage.setItem('stopGrind', 0);}}	
function runTabogon(){if(confirm("Вы точно хотите запустить ПРОГОН?")){localStorage.setItem('stopTabogon', 0);}}
	
/** Настройки скрипта в офисе */
if(location.href.indexOf('elevage/bureau/') !== -1) {
	$('section.content__middle > ul.tab').append('<li id="tab-grind-settings" class="tab-style-6-0-0"><div><a style="" href="' + location.href + '#tab-grind-settings" class="tab-action">Настройки скрипта</a></div></li>');
	fetchGrindSettingsFetch();
	$('#tab-grind-settings').click(function(){showGrindSettings();});
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
