// ==UserScript==
// @name         Гринд
// @version      0.12
// @description  Гринд...
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// @match        https://www.lowadi.com/elevage/bureau/*
// ==/UserScript==
/** Всякие сообщения */
var msg_01 = "Скрипт можно запускать только на странице лошади!";
var msg_02 = "Настройки для запуска не обнаружены!";

/** Получение инфы из памяти */
	var grAllActType = localStorage.getItem("grAllActType");
	var grAllHeadsCount = localStorage.getItem("grAllHeadsCount");
	
	var grConcKskType = localStorage.getItem("grConcKskType");
	var grConcKskLocate = localStorage.getItem("grConcKskLocate");
	var grConcAmun = localStorage.getItem("grConcAmun");
	var grConcGugel = localStorage.getItem("grConcGugel");
	var grConcMakeBaby = localStorage.getItem("grConcMakeBaby");
	var grConcMZ = localStorage.getItem("grConcMZ");
	var grConcCoit = localStorage.getItem("grConcCoit");
	var grConcDir = localStorage.getItem("grConcDir");
	var grConcAff = localStorage.getItem("grConcAff");
	var grConcNameStrat = localStorage.getItem("grConcNameStrat");
	var grConcMale = localStorage.getItem("grConcMale");
	var grConcFemale = localStorage.getItem("grConcFemale");
	var grConcNameList = localStorage.getItem("grConcNameList");
	
	var grConcDoLesson = localStorage.getItem("grConcDoLesson");
	var grConcDoGames = localStorage.getItem("grConcDoGames");
	var grConc_act_01 = localStorage.getItem("grConc_act_01");
	var grConc_act_02 = localStorage.getItem("grConc_act_02");
	var grConc_act_03 = localStorage.getItem("grConc_act_03");
	var grConc_act_04 = localStorage.getItem("grConc_act_04");
	var grConc_act_05 = localStorage.getItem("grConc_act_05");
	var grConc_act_06 = localStorage.getItem("grConc_act_06");
	var grConc_act_07 = localStorage.getItem("grConc_act_07");
	var grConc_act_08 = localStorage.getItem("grConc_act_08");
	var grConc_act_09 = localStorage.getItem("grConc_act_09");
	var grConc_act_10 = localStorage.getItem("grConc_act_10");
	var grConc_act_11 = localStorage.getItem("grConc_act_11");
	var grConc_act_12 = localStorage.getItem("grConc_act_12");
	var grConc_act_13 = localStorage.getItem("grConc_act_13");
	var grConc_act_14 = localStorage.getItem("grConc_act_14");
	var grConсBeachFROM = localStorage.getItem("grConсBeachFROM");
	var grConсBeachTO = localStorage.getItem("grConсBeachTO");
	
/** Рабочие методы */
	function getMerch(b){
		var c=0,d=$("#objects-body-content a");
		if(0!==d.length)for(var e=0;e<d.length;e++)-1!==$("#objects-body-content a").eq(e).attr("data-tooltip").indexOf(b)&&(c=1);
		return 0!=c;
	}
	function pause(add = 0){ return Math.floor(Math.random() * (80 - 30 + 1)) + 30 + add;}
	
	function sleepJS(milliseconds) {
	  const date = Date.now();
	  let currentDate = null;
	  do {
		currentDate = Date.now();
	  } while (currentDate - date < milliseconds);
	}
	async function goToLink(href, pause) {
		console.log("href -> " + href);
		document.location.href = href;
		sleepJS(pause(pause));
		console.log("done -> " + href);
	}
	function nextHorse() {
		console.log("next");
		goToLink($('#nav-next').attr('href'), 1);
	}

	
/** Панелька запуска и остановки (видна в офисе и у лошади)*/
	var navPanelGT = '<div style="background: #333333d0;width: 130px;padding: 10px;line-height: 30px;position: fixed;z-index: 9999;border-radius:4px;top: 0px;"><button id="runGringButton" style="width: 130px;">Запустить кач</button><button id="runTabogonButton" style="width: 130px;">Запустить прогон</button><button id="goToSettingsButton" style="width: 130px;"><a href="https://www.lowadi.com/elevage/bureau/#tab-grind-settings">НАСТРОЙКИ</a></button><button id="StopAllGTButton" style="width: 130px;height: 50px;" disabled>ОСТАНОВИТЬ</button></div>';
	$('body#global').append(navPanelGT);

	if (location.href.indexOf('chevaux/cheval?id') !== -1 && localStorage.getItem('isGrindSettings') !== null) {
		$('#runGringButton').click(function(){runGrindPlz();});
		$('#runTabogonButton').click(function(){runTabogon();});
	} else {
		$('#runGringButton').click(function(){alert(localStorage.getItem('isGrindSettings') !== null ? msg_01 : msg_02);});
		$('#runTabogonButton').click(function(){alert(localStorage.getItem('isGrindSettings') !== null ? msg_01 : msg_02);});
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
