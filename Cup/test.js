
// ==UserScript==
// @name         Соревнования
// @version      3.1
// @description  Запись на соревнования. ПРИ ВЫПОЛНЕНИИ НЕ СИДИТЕ НА СТРАНИЦЕ, ОТ ЭТОГО СКРИПТ ТОРМОЗИТ! И НЕ ЗАХОДИТЕ К ДРУГИМ ЛОШАДЯМ!
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// @match        https://www.lowadi.com/elevage/competition/*
// ==/UserScript==

if ($("body#global").append("<div class=\"stopMe\" style=\"display:block;color:#ffffff;position:fixed;width: 100px;height: 20px;top: 30px;padding: 5px;left: 10px;background-color:rgba(128, 0, 0, 0.9);z-index:990;border-radius: 4px;\"><center><button id=\"noCup\" type=\"button\"> ОСТАНОВИТЬ </button></center></div>"), $("#noCup").click(function() {
        localStorage.setItem("stopCup", 0), localStorage.setItem("isOpt", 0), document.title = "П Р Е К Р А Щ А Ю", localStorage.setItem("errLog", "Запись на соревнования принудительно остановлена"), location.reload(), alert("Запись на соревнования прервана.")
    }), 1 == localStorage.getItem("isOpt")) {
    var sorev = localStorage.getItem("inpSorev"),
        selYY = localStorage.getItem("inpYY"),
        selMM = localStorage.getItem("inpMM"),
        doLesson = localStorage.getItem("inpLesson"),
        difficulty = 0,
        doMash = localStorage.getItem("inpMash"),
        compAll = localStorage.getItem("inpType"),
        doFlots = localStorage.getItem("flots"),
        maxAge = 0,
        hrsEnrg = 0;
    maxAge = parseInt(parseInt(localStorage.getItem("startAge")) + parseInt(12 * selYY) + parseInt(selMM))
} else document.title = "З А В Е Р Ш Е Н О",
	$("body#global").append("<div class=\"cupPanel\" style=\"display:block;color:#ffffff;position:fixed;width: 400px;height: 200px;top: 50%;margin-top: -100px;margin-left: -200px;padding: 20px;left: 50%;background-color:rgba(0, 0, 0, 0.9);z-index:990;border-radius: 4px;\"></div>"),
	$(".cupPanel").append("<center><p style=\"z-index:999;color:#ffffff; font-size: 13px; font-family: Arial,Helvetica,sans-serif;text-shadow: 1px 1px 2px #778899;margin-top:5px;\"><b>Настройки</b></p><div id=\"ErrMsg\" style=\"color:#ff8080;\"></div></center></br>"),
	$(".cupPanel").append("<p>Сколько записывать: <input id=\"inpYY\" type=\"number\" min=\"0\" value=\"0\">лет  <input id=\"inpMM\" type=\"number\" min=\"0\" value=\"0\">мес. </p>"),
	$(".cupPanel").append("<p>Дисциплина: <select id=\"inpSorev\" style=\" \"><option value=\"Рысь\">Рысь</option><option value=\"Галоп\">Галоп</option><option value=\"Выездка\">Выездка</option><option value=\"Кросс\">Кросс</option><option value=\"Конкур\">Конкур</option><option value=\"Гонки вокруг бочек\">Гонки вокруг бочек</option><option value=\"Каттинг\">Каттинг</option><option value=\"Трейл\">Трейл</option><option value=\"Рейнинг\">Рейнинг</option><option value=\"Вестерн плеже\">Вестерн плеже</option></select></p>"),
	$(".cupPanel").append("<p>Соревнования: <select id=\"inpType\" style=\" \"><option value=\"1\">Все</option><option value=\"0\">Только породные</option></select></p>"),
	$(".cupPanel").append("<p>Искать розетки (только с привилегией VIP): <select id=\"inpFlots\" style=\" \"><option value=\"1\">Искать специально</option><option value=\"0\">Не искать</option></select></p>"),
	$(".cupPanel").append("<p>Урок: <select id=\"inpLesson\" style=\" \"><option value=\"1\">Включён</option><option value=\"0\">Выключен</option></select></p>"),
	$(".cupPanel").append("<p>Смесь: <select id=\"inpMash\" style=\" \"><option value=\"0\">Не давать</option><option value=\"1\">Давать</option></select></p>"),
	$(".cupPanel").append("</br><center><button id=\"submCup\" type=\"button\"> Применить и запустить </button></center>");

null === localStorage.getItem("isOpt")
	? ($("#inpYY").val(0), $("#inpMM").val(1), $("#inpMinDiff").val(0))
	: (null !== localStorage.getItem("errLog") && $("#ErrMsg").text(localStorage.getItem("errLog")), $("#inpYY").val(localStorage.getItem("inpYY")), $("#inpMM").val(localStorage.getItem("inpMM")), $("#inpMash").val(localStorage.getItem("inpMash")), $("#inpSorev").val(localStorage.getItem("inpSorev")), $("#inpType").val(localStorage.getItem("inpType")), $("#inpLesson").val(localStorage.getItem("inpLesson")), $("#inpFlots").val(localStorage.getItem("inpFlots"))), $("#submCup").click(function() {
		localStorage.setItem("inpYY", $("#inpYY").val()),
		localStorage.setItem("inpMM", $("#inpMM").val()),
		localStorage.setItem("inpSorev", $("#inpSorev option:selected").val()),
		localStorage.setItem("inpType", $("#inpType option:selected").val()),
		localStorage.setItem("inpLesson", $("#inpLesson option:selected").val()),
		localStorage.setItem("inpFlots", $("#inpFlots option:selected").val()),
		localStorage.setItem("inpMash", $("#inpMash option:selected").val()),
		localStorage.setItem("cupCount", 0),
		localStorage.setItem("isOpt", 1),
		localStorage.removeItem("errLog"),
		-1 !== location.href.indexOf("chevaux/cheval?id") && localStorage.setItem("startAge", chevalAge),
		alert("Настройки применены. Нажмите 'Ок', чтобы запустить скрипт.\n\n Покиньте вкладку до завершения работы скрипта (он смущается и работает медленнее). \n\n После завершения надпись на вкладке изменится на 'Завершено'."),
		location.reload()
	}),
	localStorage.setItem("stopCup", 0);
var tSleep, tEat, tRun, growButton = 0,
    energy = 20;

function pause(a) {
    return Math.floor(Math.random() * 251) + 150 + a
}

function getTime() {
    var a = $(".hour").text(),
        b = +(a[0] + a[1]),
        c = +(a[3] + a[4]);
    return 60 * b + c
}

function clearNulls() {
    growButton = 0
}

function getMerch(b) {
    var c = 0,
        d = $("#objects-body-content a");
    if (0 !== d.length)
        for (var e = 0; e < d.length; e++) - 1 !== $("#objects-body-content a").eq(e).attr("data-tooltip").indexOf(b) && (c = 1);
    return 0 != c
}

function lesson() {
    $("#mission-wrapper a").click()
}

function drink() {
    $("#boutonBoire").click()
}

function carrot() {
    $("#boutonCarotte").click()
}

function care() {
    $("#boutonCaresser").click()
}

function wash() {
    $("#boutonPanser").click()
}

function milk() {
    $("#boutonAllaiter").click()
}

function mash() {
    $("#boutonMash").click()
}

function flots() {
    if(doFlots == 1) {$("#flots").click()}
    return false;
}

function feed() {
    if (4 < chevalAge) {
        var a = $(".float-right.section-fourrage.section-fourrage-quantity").text().trim().split(" / "),
            b = +a[1],
            c = +a[0];
        if (-1 !== $("#care-tab-feed #messageBoxInline").text().indexOf("недостаточный") && (b = 20 - c), $("#haySlider li:eq(" + (b - c) + ")").click(), 16 < chevalAge) {
            var d = $(".float-right.section-avoine.section-avoine-quantity").text().trim().split(" / "),
                e = +d[1],
                f = +d[0];
            $("#oatsSlider li:eq(" + (e - f) + ")").click()
        }
        setTimeout(function() {
            $("#feed-button").click()
        }, 200)
    } else milk()
}

function sleep() {
    $("#boutonCoucher").click()
}

function grow() {
    0 == growButton && ($("#night-wrapper button:contains(\"Подтвердить\")").click(), growButton = 1)
}

function galop() {
    $("a:contains(\"" + sorev + "\")")[0].click()
}

function needWash() {
    return !$("#boutonPanser").hasClass("action-disabled")
}

function needDrink() {
    return !($("#boutonBoire").hasClass("action-disabled") || getMerch("Ласка Филотес"))
}

function needCarrot() {
    return !($("#boutonCarotte").hasClass("action-disabled") || getMerch("Ласка Филотес"))
}

function needCare() {
    return !$("#boutonCaresser").hasClass("action-disabled")
}

function needFeed() {
    var a = $(".float-right.section-fourrage.section-fourrage-quantity").text().trim().split(" / "),
        b = +a[1],
        c = +a[0],
        d = $(".float-right.section-avoine.section-avoine-quantity").text().trim().split(" / "),
        e = +d[1],
        f = +d[0];
    return 6 > chevalAge && 1 == doMilk ? !$("#boutonAllaiter").hasClass("action-disabled") : 17 < chevalAge ? !(c >= b && f >= e || -1 !== $("#care-tab-feed #messageBoxInline").text().indexOf("толст")) : !(6 > chevalAge) && !(c >= b || -1 !== $("#care-tab-feed #messageBoxInline").text().indexOf("толст"))
}

function needLesson() {
    return !!(23 < chevalAge && 20 < +$("#energie").text() - +$("#mission-wrapper").html().substr($("#mission-wrapper").html().indexOf("Энергия"), 45).replace(/[^,0-9]/gim, "").replace(/[,]/gim, ".") && 1 == doLesson) && -1 === $("#mission").text().indexOf("недостаточно энергии") && !$("#mission-wrapper a").hasClass("action-disabled")
}

function needSleep() {
    return !$("#boutonCoucher").hasClass("action-disabled")
}

function needMash() {
    return !(1 !== doMash) && !($("#boutonMash").hasClass("action-disabled") || 23 > chevalAge)
}

function laska() {
    needCare() ? (document.title = "Ласка", care()) : needDrink() ? (document.title = "Пить", drink()) : needCarrot() ? (document.title = "Морковь", carrot()) : needMash() && (document.title = "Смесь", mash())
}

function needLaska() {
    return !!(needCare() || needCarrot() || needDrink() || needMash())
}

function progon() {
    if (-1 !== location.href.indexOf("chevaux/cheval?id")) document.title = "Лошадь", getMerch("Ахиллесова пята") ? (tSleep = 1439, tEat = 1409, tRun = 1319) : (tSleep = 1319, tEat = 1289, tRun = 1169), chevalAge < maxAge ? getTime() >= tSleep ? needSleep() ? (document.title = "Спать", sleep()) : (document.title = "Ор", grow()) : needFeed() && getTime() >= tEat ? (document.title = "Корм", feed()) : needWash() ? (document.title = "Чистка", wash()) : needLesson() ? (document.title = "Урок", lesson()) : 0 < +$("#energie").text() - energy && getTime() <= tRun ? (document.title = "Соревнования", hrsEnrg = parseFloat($("#energie").text()), localStorage.setItem("hrsEnrg", hrsEnrg), galop()) : needLaska() ? laska() : needFeed() ? (document.title = "Корм", feed()) : needSleep() ? (document.title = "Сон", sleep()) : (document.title = "Ор", grow()) : (clearTimeout(mainSet), clearTimeout(checkSet), localStorage.setItem("stopCup", 0), localStorage.setItem("isOpt", 0), localStorage.setItem("errLog", "Запись на соревнования окончена"), document.title = "З А В Е Р Ш Е Н О", location.reload(), alert("Запись на соревнования окончена. \n Для продолжения работы нажмите 'Ок'"));
    else if (-1 === location.href.indexOf("competition/inscription")) - 1 !== location.href.indexOf("/elevage/chevaux/?elevage=") && (history.go(-1), pause(6e5));
    else if (document.title = "Запись...", 0 !== $("#race").length || 0 !== $("#public").length || flots()) {
        var a = 0,
            b = 0,
            c = 0,
            d = $("#race tr[height=\"40\"] td[class^=\"width-10 align-center\"] .nowrap");
        if (0 !== $("#race").length)
            for (var e = 0; e < d.length; e++) a = +$("#race tr[height=\"40\"]:eq(" + e + ") td[class^=\"width-10 align-center\"] .nowrap").eq(e).text().replace(/[^.0-9]/gim, ""), b = parseFloat($("#race tr[height=\"40\"]:eq(" + e + ") td[class^=\"width-20 align-center\"] strong").eq(e).text()), hrsEnrg = parseFloat(localStorage.getItem("hrsEnrg")), a >= difficulty && 0 < hrsEnrg - b && (c = parseFloat(localStorage.getItem("hrsEnrg")) - b, localStorage.setItem("hrsEnrg", c), $("#race tr[height=\"40\"]:eq(" + e + ") td[class^=\"width-10 align-center\"] button").click()), 10 > hrsEnrg - b && $("#table-0 a.horsename")[0].click();
        else if (1 == compAll) {
            d = $("#public tr[height=\"40\"] td[class^=\"width-10 align-center\"] .nowrap");
            for (var f = 0; f < d.length; f++) a = +$("#public tr[height=\"40\"]:eq(" + f + ") td[class^=\"width-10 align-center\"] .nowrap ").eq(f).text().replace(/[^.0-9]/gim, ""), b = parseFloat($("#public tr[height=\"40\"]:eq(" + f + ") td[class^=\"width-20 align-center\"] strong").eq(f).text()), hrsEnrg = parseFloat(localStorage.getItem("hrsEnrg")), a >= difficulty && 0 < hrsEnrg - b && (c = parseFloat(localStorage.getItem("hrsEnrg")) - b, localStorage.setItem("hrsEnrg", c), $("#public tr[height=\"40\"]:eq(" + f + ") td[class^=\"width-10 align-center\"] button").click()), 10 > hrsEnrg - b && $("#table-0 a.horsename")[0].click()
        } else 1 !== compAll && (document.title = "!! СОРЕВ  НЕТ !!", alert("Соревнований, удовлетворяющих заданным критериям, нет. Попробуйте повторить позже. \n Для остановки скрипта нажмите 'Ок'"), clearTimeout(mainSet), clearTimeout(checkSet), localStorage.setItem("stopCup", 0), localStorage.setItem("isOpt", 0), localStorage.setItem("errLog", "Доступных соревнований нет"), location.reload())
    } else - 1 !== document.body.innerHTML.indexOf("доступных состязаний нет.") && 0 === growButton && ($("#table-0 a.horsename")[0].click(), growButton = 1)
}
if (1 == localStorage.getItem("isOpt")) var checkSet = setTimeout(function a() {
        clearNulls(), setTimeout(a, pause(7850))
    }, pause(7850)),
    mainSet = setTimeout(function a() {
        0 == localStorage.getItem("stopCup") && progon(), setTimeout(a, pause(0))
    }, pause(0));
