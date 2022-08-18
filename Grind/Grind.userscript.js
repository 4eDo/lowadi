// ==UserScript==
// @name         Кач-прогон
// @version      1.0
// @description  Игры для жеребёнка или табуна. ПРИ ВЫПОЛНЕНИИ НЕ СИДИТЕ НА СТРАНИЦЕ, ОТ ЭТОГО СКРИПТ ТОРМОЗИТ! И НЕ ЗАХОДИТЕ К ДРУГИМ ЛОШАДЯМ!
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// ==/UserScript==

//Настройки

$('body#global').append('<div class="stopMe" style="display:block;color:#ffffff;position:fixed;width: 100px;height: 20px;top: 30px;padding: 5px;left: 10px;background-color:rgba(128, 0, 0, 0.9);z-index:990;border-radius: 4px;"><center><button id="noGrind" type="button"> ОСТАНОВИТЬ </button></center></div>');
	$('#noGrind').click(function setOptions(){
		document.title = "П Р Е К Р А Щ А Ю";
		stopAll();
		location.reload();
		alert("Выращивание лошади прервано.");
	});

	if(localStorage.getItem('isOptGrind') == 1){
		var selYY = localStorage.getItem('inpYYgrind');
		var selMM = localStorage.getItem('inpMMgrind');
		var doLesson = localStorage.getItem('inpLessGrind');
		var doCarrot = localStorage.getItem('inpCarrot');
		var doKSK = localStorage.getItem('inpKSK');
		var lenKSK = localStorage.getItem('inpKSKLen');
		var maxAge = 0;
		maxAge = parseInt(parseInt(selYY * 12) + parseInt(selMM));
	} 
	else{
		document.title = "З А В Е Р Ш Е Н О";
		$('body#global').append('<div class="grindPanel" style="display:block;color:#ffffff;position:fixed;width: 400px;height: 200px;top: 50%;margin-top: -100px;margin-left: -200px;padding: 20px;left: 50%;background-color:rgba(0, 0, 0, 0.9);z-index:990;border-radius: 4px;"></div>');
		$('.grindPanel').append('<center><p style="z-index:999;color:#ffffff; font-size: 13px; font-family: Arial,Helvetica,sans-serif;text-shadow: 1px 1px 2px #778899;margin-top:5px;"><b>Настройки</b></p></center></br>');
		$('.grindPanel').append('<p>Кач или прогон: <select id="inpActType" style=" ">'
								+'<option value="1">	Кач одной лошади	</option>'
								+'<option value="0">	Прогон табуна		</option>'
							+'</select></p>');
		$('.grindPanel').append('<p>После какого возраста не трогать: <input id="inpYYgrind" type="number" min="0" value="0">лет  <input id="inpMMgrind" type="number" min="0" value="0">мес. </p>');
		$('.grindPanel').append('<p>Запись в КСК: <select id="inpKSK" style="">'
								+'<option value="0">	Не записывать никогда				</option>'
								+'<option value="1">	Всегда записывать в самый дешёвый	</option>'
								+'<option value="2">	Записывать, если нет ОГ				</option>'
							+'</select></p>');
		$('.grindPanel').append('<p>Срок записи: <select id="inpKSKLen" style="">'
								+'<option value="1 д">	1 день	</option>'
								+'<option value="3 д">	3 дня	</option>'
								+'<option value="10 д">	10 дней	</option>'
								+'<option value="30 д">	30 дней	</option>'
								+'<option value="60 д">	60 дней	</option>'
							+'</select></p>');
		$('.grindPanel').append('<p>Урок: <select id="inpLessGrind" style=" ">'
								+'<option value="1">	Включён		</option>'
								+'<option value="0">	Выключен	</option>'
							+'</select></p>');
 		$('.grindPanel').append('<p>Морковь: <select id="inpCarrot" style=" ">'
								+'<option value="1">	Давать		</option>'
								+'<option value="0">	Не давать	</option>'
							+'</select></p>');
		$('.grindPanel').append('</br><center><button id="submGrind" type="button"> Применить и запустить </button></center>');
	}

	if (localStorage.getItem('isOptGrind') !== null) {
		$("#inpYYgrind").val(localStorage.getItem('inpYYgrind'));
		$("#inpMMgrind").val(localStorage.getItem('inpMMgrind'));
		$("#inpLessGrind").val(localStorage.getItem('inpLessGrind'));
		$("#inpCarrot").val(localStorage.getItem('inpCarrot'));
		$("#inpKSK").val(localStorage.getItem('inpKSK'));
		$("#inpKSKLen").val(localStorage.getItem('inpKSKLen'));
		$("#inpActType").val(localStorage.getItem('inpActType'));
	} else {
		$("#inpYYgrind").val(0);
		$("#inpMMgrind").val(0);
	}

	$('#submGrind').click(function setOptions(){
		localStorage.setItem('inpYYgrind', $("#inpYYgrind").val());
		localStorage.setItem('inpMMgrind', $("#inpMMgrind").val());
		localStorage.setItem('inpLessGrind', $("#inpLessGrind option:selected").val());
		localStorage.setItem('inpCarrot', $("#inpCarrot option:selected").val());
		localStorage.setItem('inpKSK', $("#inpKSK option:selected").val());
		localStorage.setItem('inpKSKLen', $("#inpKSKLen option:selected").val());
		localStorage.setItem('inpActType', $("#inpActType option:selected").val());
		
		
		localStorage.setItem('firstChevalId', chevalId);
		localStorage.setItem('itIsFirstHorse', 'true');
		localStorage.setItem('isHorsePage', true);

		localStorage.setItem('isOptGrind', 1);
		alert("Настройки применены. Нажмите 'Ок', чтобы запустить скрипт.\n\n Покиньте вкладку до завершения работы скрипта (он смущается и работает медленнее). Не заходите к другим лошадям. \n\n После завершения надпись на вкладке изменится на 'Завершено'.");
		location.reload();
	});

	localStorage.setItem('stopGrind', 0);
	var growButton = 0;

function pause(add){ return Math.floor(Math.random() * (200 - 120 + 1)) + 120 + add;}


function stopAll(){
	clearTimeout(mainSet);
	clearTimeout(checkSet);
	localStorage.setItem('stopGrind', 0);
	localStorage.setItem('isOptGrind', 0);
	localStorage.removeItem('itIsFirstHorse');
	localStorage.removeItem('firstChevalId');
	localStorage.removeItem('isHorsePage');
}

async function goToLink(href, pause) {
	console.log("href -> " + href);
	document.location.href = href;
	sleep(pause(pause));	
	console.log("done -> " + href);
}

function checkKSK() {
	if (doKSK != 0 && $('#form-extends-money').length < 1) {
		if(doKSK != 2 || !getMerch("Одеяло Гипноса")){
			console.log("NEED KSK!");
			localStorage.setItem('isHorsePage', false);
			goToLink("https://www.lowadi.com/elevage/chevaux/centreInscription?id=" + chevalId, 1000);
		}
	} else {
		localStorage.setItem('isHorsePage', true);
		console.log("NOT NEED KSK!");
	}
}
async function setKSK() {
	$('thead > a:contains("' + lenKSK + '")').click();
}

function getMerch(b){
	var c=0,d=$("#objects-body-content a");
	if(0!==d.length)for(var e=0;e<d.length;e++)-1!==$("#objects-body-content a").eq(e).attr("data-tooltip").indexOf(b)&&(c=1);
	return 0!=c;
}

function feed(oatsType = 0) {
    if (chevalAge > 4) {
        var numbers = $('.float-right.section-fourrage.section-fourrage-quantity').text().trim().split(' / ');
        var toGiveFourrage = +numbers[1];
        var givenFourrage = +numbers[0];
        if ($('#care-tab-feed #messageBoxInline').text().indexOf('недостаточный') !== -1) {
            toGiveFourrage = 20 - givenFourrage;
        }
        $('#haySlider li:eq(' + (toGiveFourrage - givenFourrage) + ')').click();
        if (chevalAge > 16) {
            numbers = $('.float-right.section-avoine.section-avoine-quantity').text().trim().split(' / ');
            var toGiveOats = +numbers[1];
			switch(oatsType) {
				case "training":
					toGiveOats = toGiveFourrage - 2;
					break;
				case "competition":
					toGiveOats = 8;
					break;
			}
            var givenOats = +numbers[0];
            $('#oatsSlider li:eq(' + (toGiveOats - givenOats) + ')').click();
        }
        setTimeout(function() {
            $('#feed-button').click();
        }, pause(0));
    } else {
        $('#boutonAllaiter').click();
    }
}

function grow() {
    if (growButton == 0) {
        $('#night-wrapper button:contains("Подтвердить")').click();
        growButton = 1;
    }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function nextHorse() {
	console.log("next");
	goToLink($('#nav-next').attr('href'), 1);
}

function needWash() {
	return isDisabled('boutonPanser');
}

function needFeed() {
		var numbers = $('.float-right.section-fourrage.section-fourrage-quantity').text().trim().split(' / ');
		var toGive = +numbers[1];
		var given = +numbers[0];
		var numbers1 = $('.float-right.section-avoine.section-avoine-quantity').text().trim().split(' / ');
		var toGive1 = +numbers1[1];
		var given1 = +numbers1[0];
		if ((chevalAge < 6) && (doMilk == 1)) {
			if ($('#boutonAllaiter').hasClass('action-disabled')) {
				return false;
			} else return true;
		} else if (chevalAge > 17) {
			if (((given >= toGive) && (given1 >= toGive1)) || ($('#care-tab-feed #messageBoxInline').text().indexOf('толст') !== -1)) {
				return false;
			} else return true;
		} else {
			if (chevalAge < 6) {
				return false;
			} else if ((given >= toGive) || ($('#care-tab-feed #messageBoxInline').text().indexOf('толст') !== -1)) {
				return false;
			} else return true;
		}
	
}

function needLesson() {
	if(doLesson!=1) {return false;}
	else{
		if ((chevalAge > 23) && (+$('#energie').text() - (+$('#mission-wrapper').html().substr($('#mission-wrapper').html().indexOf('Энергия'), 45).replace(/[^,0-9]/gim, '').replace(/[,]/gim, '.')) > 20)) {
			if ($('#mission').text().indexOf('недостаточно энергии') !== -1) {
				return false;
			} else if ($('#mission-wrapper a').hasClass('action-disabled')) {
				return false;
			} else return true;
		} else return false;
	}
}

function needSleep() {
	return isDisabled('boutonCoucher');
}

function needMilk() {
	return isDisabled('boutonAllaiter');
}

function isDisabled(buttonId){
	return !$('#' + buttonId).hasClass('action-disabled');
}

function nextAct(){
	if(localStorage.getItem('inpActType') == 0){
		nextHorse();
	} else {
		grow();
	}
}

async function progon() {
		if (location.href.indexOf('/elevage/chevaux/centreInscription?id=') !== -1) {
			setKSK();
		} else if (location.href.indexOf('chevaux/cheval?id') !== -1 && localStorage.getItem('isOptGrind') !== '0') {
			checkKSK();
			if(chevalAge < 6) {
				if(needMilk()) {
					$('#boutonAllaiter').click();
				} else if(needWash()){
					$('#boutonPanser').click();
				} else if (needSleep()) {
					$('#boutonCoucher').click();
				} else {
					nextAct();
				}
	/* 		} else if (chevalAge < maxAge) {
				if (needWash()) {
					$('#boutonPanser').click();
				} else if (needLesson()) {
					$('#mission-wrapper a').click();
				} else if (needFeed()) {
					feed();
				} else if (needSleep()) {
					$('#boutonCoucher').click();
				} else {
					grow();
				} */
			} else if(localStorage.getItem('isHorsePage') == "true") {
				if(localStorage.getItem('inpActType') == '0') {
					if(localStorage.getItem('firstChevalId') == chevalId && localStorage.getItem('itIsFirstHorse') == 'false') {
						alert('Прогон окончен!');
						stopAll();
					} else {
						localStorage.setItem('itIsFirstHorse', 'false');
						nextHorse();
					}
				} else {
					alert('Возраст максимален!');
					stopAll();
				}
			}
		} else if (location.href.indexOf('/elevage/chevaux/?elevage=') !== -1) {
			history.go(-1);
			pause(600000);
		}
}
var checkSet = setTimeout(function run1() {
    growButton = 0;
    setTimeout(run1, pause(8000));
}, pause(8000));
var mainSet = setTimeout(function run() {
    if (localStorage.getItem('stopGrind') == 0) {
        progon();
    }
    setTimeout(run, pause(0));
}, pause(0));
