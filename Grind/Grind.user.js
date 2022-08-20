// ==UserScript==
// @name         Кач-прогон
// @version      1.0
// @description  ПРИ ВЫПОЛНЕНИИ НЕ СИДИТЕ НА СТРАНИЦЕ, ОТ ЭТОГО СКРИПТ ТОРМОЗИТ! И НЕ ЗАХОДИТЕ К ДРУГИМ ЛОШАДЯМ!
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// ==/UserScript==

$('body#global').append('<div class="stopMe" style="display:block;color:#ffffff;position:fixed;width: 100px;height: 20px;top: 30px;padding: 5px;left: 10px;background-color:rgba(128, 0, 0, 0.9);z-index:990;border-radius: 4px;"><center><button id="noGrind" type="button"> ОСТАНОВИТЬ </button></center></div>');
	$('#noGrind').click(function setOptions(){
		document.title = "П Р Е К Р А Щ А Ю";
		stopAll();
		location.reload();
		alert("Выращивание лошади прервано.");
	});

	if(localStorage.getItem('isOptGrind') == 1){
		
		var doLesson = 1;
		var doCarrot = 1;
		var doKSK = 2;
		var lenKSK = 0;
		var typeKSK = localStorage.getItem('inpKskType');
		var ages = typeKSK == 'f'		/** 0 = лес, 1 = выездка, 2 = прыжки, 3 = кросс, 4 = выносливость, 5 = горы */
			? [34, 44, 58, 68, 84, 118]
			: [52, 62, 76, 86, 102, 120];
	}
	else{
		document.title = "З А В Е Р Ш Е Н О";
		$('body#global').append('<div class="grindPanel" style="display:block;color:#ffffff;position:fixed;width: 400px;height: 200px;top: 50%;margin-top: -100px;margin-left: -200px;padding: 20px;left: 50%;background-color:rgba(0, 0, 0, 0.9);z-index:990;border-radius: 4px;"></div>');
		$('.grindPanel').append('<center><p style="z-index:999;color:#ffffff; font-size: 13px; font-family: Arial,Helvetica,sans-serif;text-shadow: 1px 1px 2px #778899;margin-top:5px;"><b>Настройки</b></p></center></br>');
		$('.grindPanel').append('<p>Кач или прогон: <select id="inpActType" style=" ">'
								+'<option value="1">	Кач одной лошади	</option>'
								+'<option value="0">	Прогон табуна		</option>'
							+'</select></p>');
		$('.grindPanel').append('<p>Тип КСК: <select id="inpKskType" style=" ">'
								+'<option value="f">	Лес	</option>'
								+'<option value="m">	Горы</option>'
							+'</select></p>');
		$('.grindPanel').append('</br><center><button id="submGrind" type="button"> Применить и запустить </button></center>');
	}

	if (localStorage.getItem('isOptGrind') !== null) {
		$("#inpKskType").val(localStorage.getItem('inpKskType'));
		$("#inpActType").val(localStorage.getItem('inpActType'));
	} else {}

	$('#submGrind').click(function setOptions(){
		localStorage.setItem('inpKskType', $("#inpKskType option:selected").val());
		localStorage.setItem('inpActType', $("#inpActType option:selected").val());

		localStorage.setItem('firstChevalId', chevalId);
		localStorage.setItem('itIsFirstHorse', 'true');

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
}

function checkKSK() {
	if (doKSK != 0 && $('#form-extends-money').length < 1 && chevalAge > 5) {
		if(doKSK != 2 || !getMerch("Одеяло Гипноса")){
			//console.log("NEED KSK!");

			if(localStorage.getItem('inpActType') == 0){
				nextHorse();
			} else {
				document.title = "ЗАПИШИ МЕНЯ В КСК";
				stopAll();
				location.reload();
				alert("ЗАПИШИ МЕНЯ В КСК");
			}
		}
	}
}

function getMerch(b){
	var c=0,d=$("#objects-body-content a");
	if(0!==d.length)for(var e=0;e<d.length;e++)-1!==$("#objects-body-content a").eq(e).attr("data-tooltip").indexOf(b)&&(c=1);
	return 0!=c;
}

function feed(oatsType = 0) {
	document.title = "Корм";
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
		document.title = "ОР";
        $('#night-tab-age button').click();
        growButton = 1;
    }
}

function nextHorse() {
	console.log("next");
	goToLink($('#nav-next').attr('href'), 1);
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

function needSleep()	{ return isDisabled('boutonCoucher');}
function needMilk()		{ return isDisabled('boutonAllaiter');}
function needDrink()	{ return isDisabled('boutonBoire');}
function needCarrot()	{ return isDisabled('boutonCarotte') && doCarrot == 1;}
function needCare() 	{ return isDisabled('boutonCaresser');}
function needShortGame() {return chevalEnergie > 90;}
function needLongGame() { return chevalEnergie < 90 && chevalEnergie > 70 && needCare();}
function needWash()		{ return isDisabled('boutonPanser');}

function needShortTrain() { return chevalEnergie > 90 && needDrink();}
function needLongTrain()  { return chevalEnergie > 20 && !needDrink() && needCare();}

function isDisabled(buttonId){
	return !$('#' + buttonId).hasClass('action-disabled');
}

function milk()		{ $('#boutonAllaiter').click(); document.title = "Молоко";}
function wash() 	{ $('#boutonPanser').click(); document.title = "Чистка";}
function sleep() 	{ $('#boutonCoucher').click(); document.title = "Сон";}
function drink() 	{ $('#boutonBoire').click(); document.title = "Вода";}
function care() 	{ $('#boutonCaresser').click(); document.title = "Ласка";}
function carrot() 	{ $('#boutonCarotte').click(); document.title = "Морковь";}
function lesson() 	{ $('#mission-wrapper a').click(); document.title = "Урок"; }

function nextAct(){
	if(localStorage.getItem('inpActType') == 0){
		nextHorse();
	} else {
		grow();
	}
}

function game(time){ // 2h = 2h, max = maximum, m-1 = max - 1h
	document.title = "Игра";
	goSlidebar(time, "centerPlaySlider", "formCenterPlaySubmit");
}

function walk(time, type){ // 2h = 2h, max = maximum, m-1 = max - 1h
	document.title = "Прогулка";

	switch(type){
		case "Лес":
			goSlidebar(time, "walkforetSlider", "walk-foret-submit");
		break;
		case "Горы":
			goSlidebar(time, "walkmontagneSlider", "walk-montagne-submit");
		break;
		case "Пляж":
			goSlidebar(time, "walkplageSlider", "walk-plage-submit");
		break;
	}
}

async function training(time, type){ // 2h = 2h, max = maximum, m-1 = max - 1h
	document.title = "Тренировка";
	switch(type){
		case "Выносливость": goSlidebar(time, "trainingEnduranceSlider", "training-endurance-submit"); break;
		case "Скорость": goSlidebar(time, "trainingVitesseSlider", "training-vitesse-submit"); break;
		case "Выездка": goSlidebar(time, "trainingDressageSlider", "training-dressage-submit"); break;
		case "Галоп": goSlidebar(time, "trainingGalopSlider", "training-galop-submit"); break;
		case "Рысь": goSlidebar(time, "trainingTrotSlider", "training-trot-submit"); break;
		case "Прыжки": goSlidebar(time, "trainingSautSlider", "training-saut-submit"); break;
	}
}

function goSlidebar(time, slidebarId, slidebarSubmitId){ // 2h = 2h, max = maximum, m-1 = max - 1h
	if(setSlidebar(time, slidebarId)) {
		$('#' + slidebarSubmitId).click();
	}
}

function setSlidebar(time, slidebarId) {
	let toRun;
	switch(time){
		case "2h":
			toRun = 4;
		break;
		case "max":
			toRun = $("#" + slidebarId + " li.disabled").length > 0 ? $("#" + slidebarId + " li.disabled").first().attr("data-number") - 1 : 20;
		break;
		case "m-1":
			toRun = $("#" + slidebarId + " li.disabled").length > 0 ? $("#" + slidebarId + " li.disabled").first().attr("data-number") - 3 : 18;
		break;
	}
	$('#' + slidebarId + ' li:eq(' + toRun + ')').click();
	
	return true;
}

async function progon() {
		if (location.href.indexOf('/elevage/chevaux/centreInscription?id=') !== -1) {
			setKSK();
		} else if (location.href.indexOf('chevaux/cheval?id') !== -1 && localStorage.getItem('isOptGrind') !== '0') {
			checkKSK();
			if(chevalAge < 6) {
				/** Ещё жеребёнок, до КСК */
				if(needMilk()) {
					milk();
				} else if(needWash()){
					wash();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			} else if (chevalAge < 8) {
				/** Ещё жеребёнок, до игр */
				if (needFeed()) {
					feed();
				} else if(needWash()){
					wash();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			} else if (chevalAge < 18) {
				/** Игры */
				if (needWash()) {
					wash();
				} else if(needShortGame()) {
					game('2h');
				} else if (needDrink()) {
					drink();
				} else if (needFeed()) {
					feed();
				} else if (needLongGame()) {
					doCarrot == 1 ? game('max') : game('m-1');
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			}  else if (chevalAge < 24) {
				/** До открытия уроков */
				if (needWash()) {
					wash();
				} else if(needShortTrain()) {
					walk('2h', "Лес");
				} else if (needDrink()) {
					drink();
				} else if (needFeed() && needLongTrain()) {
					feed("training");
				} else if (needLongTrain()) {
					doCarrot == 1 ? walk('max', "Лес") : walk('m-1', "Лес");
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			}  else if (chevalAge < ages[0]) {
				/** Лес */
				if (needWash()) {
					wash();
				} else if(needShortTrain()) {
					lesson();
				} else if (needDrink()) {
					drink();
				} else if (needFeed() && needLongTrain()) {
					feed("training");
				} else if (needLongTrain()) {
					walk('max', "Лес");
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			}  else if (chevalAge < ages[1]) {
				/** Выездка */
				if (needWash()) {
					wash();
				} else if(needShortTrain()) {
					lesson();
				} else if (needDrink()) {
					drink();
				} else if (needFeed() && needLongTrain()) {
					feed("training");
				} else if (needLongTrain()) {
					training('max', "Выездка");
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			}  else if (chevalAge < ages[2]) {
				/** Прыжки */
				if (needWash()) {
					wash();
				} else if(needShortTrain()) {
					lesson();
				} else if (needDrink()) {
					drink();
				} else if (needFeed() && needLongTrain()) {
					feed("training");
				} else if (needLongTrain()) {
					training('max', "Прыжки");
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			}  else if (chevalAge > (ages[2] - 1) && chevalAge < ages[3]) {
				/** Соревнования */
				if(localStorage.getItem('inpActType') == 0){
					nextHorse();
				} else {
					document.title = "ЗАПИШИ МЕНЯ НА КРОСС";
					stopAll();
					location.reload();
					alert("Я не умею записывать на соревнования!\n Запиши лошадь сам!\n НЕ дольше нужного, только до зажирнения!");
				}
			}  else if (chevalAge < ages[4]) {
				/** Выносливость */
				if (needWash()) {
					wash();
				} else if(needShortTrain()) {
					lesson();
				} else if (needDrink()) {
					drink();
				} else if (needFeed() && needLongTrain()) {
					feed("training");
				} else if (needLongTrain()) {
					training('max', "Выносливость");
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			}  else if (chevalAge < ages[5]) {
				/** Горы */
				if (needWash()) {
					wash();
				} else if(needShortTrain()) {
					lesson();
				} else if (needDrink()) {
					drink();
				} else if (needFeed() && needLongTrain()) {
					feed("training");
				} else if (needLongTrain()) {
					walk('max', "Горы");
				} else if (needCare()) {
					care();
				} else if (needCarrot()) {
					carrot();
				} else if (needSleep()) {
					sleep();
				} else {
					nextAct();
				}
			} else {
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
