// ==UserScript==
// @name         Растишка
// @version      1.0
// @description  Растишка. ПРИ ВЫПОЛНЕНИИ НЕ СИДИТЕ НА СТРАНИЦЕ, ОТ ЭТОГО СКРИПТ ТОРМОЗИТ! И НЕ ЗАХОДИТЕ К ДРУГИМ ЛОШАДЯМ!
// @namespace    http://tampermonkey.net/
// @match        https://www.lowadi.com/elevage/chevaux/*
// ==/UserScript==

//Настройки

$('body#global').append('<div class="stopMe" style="display:block;color:#ffffff;position:fixed;width: 100px;height: 20px;top: 30px;padding: 5px;left: 10px;background-color:rgba(128, 0, 0, 0.9);z-index:990;border-radius: 4px;"><center><button id="noGrow" type="button"> ОСТАНОВИТЬ </button></center></div>');
	$('#noGrow').click(function setOptions(){
		localStorage.setItem('stopGrow', 0);
		localStorage.setItem('isOptGrow', 0);
		document.title = "П Р Е К Р А Щ А Ю";
		location.reload();
		alert("Выращивание лошади прервано.");
	});

	if(localStorage.getItem('isOptGrow') == 1){
		var selYY = localStorage.getItem('inpYYgr');
		var selMM = localStorage.getItem('inpMMgr');
		var doLesson = localStorage.getItem('inpLessGr');
		var doEat = localStorage.getItem('inpEat');
		var doWash = localStorage.getItem('inpWash');
		var doSleep = localStorage.getItem('inpSleep');
		var maxAge = 0;
		maxAge = parseInt(parseInt(selYY * 12) + parseInt(selMM));
	}
	else{
		document.title = "З А В Е Р Ш Е Н О";
		$('body#global').append('<div class="growPanel" style="display:block;color:#ffffff;position:fixed;width: 400px;height: 200px;top: 50%;margin-top: -100px;margin-left: -200px;padding: 20px;left: 50%;background-color:rgba(0, 0, 0, 0.9);z-index:990;border-radius: 4px;"></div>');
		$('.growPanel').append('<center><p style="z-index:999;color:#ffffff; font-size: 13px; font-family: Arial,Helvetica,sans-serif;text-shadow: 1px 1px 2px #778899;margin-top:5px;"><b>Настройки</b></p></center></br>');
		$('.growPanel').append('<p>До скольки растить: <input id="inpYYgr" type="number" min="0" value="0">лет  <input id="inpMMgr" type="number" min="0" value="0">мес. </p>');
		$('.growPanel').append('<p>Урок: <select id="inpLessGr" style=" ">'
								+'<option value="1">	Включён		</option>'
								+'<option value="0">	Выключен	</option>'
							+'</select></p>');
		$('.growPanel').append('<p>Корм: <select id="inpEat" style=" ">'
								+'<option value="1">	Включён		</option>'
								+'<option value="0">	Выключен	</option>'
							+'</select></p>');
		$('.growPanel').append('<p>Чистка: <select id="inpWash" style="">'
								+'<option value="1">	Включён		</option>'
								+'<option value="0">	Выключен	</option>'
							+'</select></p>');
		$('.growPanel').append('<p>Сон: <select id="inpSleep" style=" ">'
								+'<option value="1">	Включён		</option>'
								+'<option value="0">	Выключен	</option>'
							+'</select></p>');
		$('.growPanel').append('</br><center><button id="submGrow" type="button"> Применить и запустить </button></center>');
	}

	if (localStorage.getItem('isOptGrow') !== null) {
		$("#inpYYgr").val(localStorage.getItem('inpYYgr'));
		$("#inpMMgr").val(localStorage.getItem('inpMMgr'));
		$("#inpWash").val(localStorage.getItem('inpWash'));
		$("#inpEat").val(localStorage.getItem('inpEat'));
		$("#inpSleep").val(localStorage.getItem('inpSleep'));
		$("#inpLessGr").val(localStorage.getItem('inpLessGr'));
	} else {
		$("#inpYYgr").val(0);
		$("#inpMMgr").val(0);
	}

	$('#submGrow').click(function setOptions(){
		localStorage.setItem('inpYYgr', $("#inpYYgr").val());
		localStorage.setItem('inpMMgr', $("#inpMMgr").val());
		localStorage.setItem('inpWash', $("#inpWash option:selected").val());
		localStorage.setItem('inpEat', $("#inpEat option:selected").val());
		localStorage.setItem('inpSleep', $("#inpSleep option:selected").val());
		localStorage.setItem('inpLessGr', $("#inpLessGr option:selected").val());

		localStorage.setItem('isOptGrow', 1);
		alert("Настройки применены. Нажмите 'Ок', чтобы запустить скрипт.\n\n Покиньте вкладку до завершения работы скрипта (он смущается и работает медленнее). Не заходите к другим лошадям. \n\n После завершения надпись на вкладке изменится на 'Завершено'.");
		location.reload();
	});

	localStorage.setItem('stopGrow', 0);
	var growButton = 0;

function pause(add){ return Math.floor(Math.random() * (200 - 120 + 1)) + 120 + add;}

function feed() {
    if (chevalAge > 4) {
        var numbers = $('.float-right.section-fourrage.section-fourrage-quantity').text().trim().split(' / ');
        var toGive = +numbers[1];
        var given = +numbers[0];
        if ($('#care-tab-feed #messageBoxInline').text().indexOf('недостаточный') !== -1) {
            toGive = 20 - given;
        }
        $('#haySlider li:eq(' + (toGive - given) + ')').click();
        if (chevalAge > 16) {
            var numbers1 = $('.float-right.section-avoine.section-avoine-quantity').text().trim().split(' / ');
            var toGive1 = +numbers1[1];
            var given1 = +numbers1[0];
            $('#oatsSlider li:eq(' + (toGive1 - given1) + ')').click();
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

function needWash() {
    if (($('#boutonPanser').hasClass('action-disabled'))||(doWash!=1)) {
        return false;
    } else return true;
}

function needFeed() {
	if(doEat!=1){return false;} else{
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
    if (($('#boutonCoucher').hasClass('action-disabled'))||(doSleep!=1)) {
        return false;
    } else return true;
}

function progon() {
    if (location.href.indexOf('chevaux/cheval?id') !== -1) {
        if (chevalAge < maxAge) {
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
            }
        } else {
            alert('Возраст максимален!');
            clearTimeout(mainSet);
            clearTimeout(checkSet);
			localStorage.setItem('stopGrow', 1);
			localStorage.setItem('isOptGrow', 0);
        }
    }
    else if (location.href.indexOf('/elevage/chevaux/?elevage=') !== -1) {
    	history.go(-1);
    	pause(600000);
    }
}
var checkSet = setTimeout(function run1() {
    growButton = 0;
    setTimeout(run1, pause(8000));
}, pause(8000));
var mainSet = setTimeout(function run() {
    if (localStorage.getItem('stopGrow') == 0) {
        progon();
    }
    setTimeout(run, pause(0));
}, pause(0));
