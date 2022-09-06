
// ==UserScript==
// @name         Гринд
// @version      0.1
// @description  Гринд...
// @namespace    http://tampermonkey.net/
// @author       4eDo (https://github.com/4eDo/lowadi)
// @match        https://www.lowadi.com/elevage/chevaux/*
// @match        https://www.lowadi.com/elevage/bureau/
// ==/UserScript==

(function() {
    'use strict';
	
	function showGrindSettings() {
		$('section.content__middle > ul.tab > li.selected').attr('class', 'tab-style-6-0-0');
		$('#tab-grind-settings').attr('class', 'tab-style-6-0-0 selected');
		
		let temp_middle;
		let temp_ul = $('section.content__middle > ul').html();
		let grind_settings = '<div id="grindSettings"></div>';
		let hr = '<hr class="spacer-bottom">';
		
		temp_middle = '<ul style="" class="tab tab-style-6">' + temp_ul + '</ul>' + hr + grind_settings;
		$('section.content__middle').html(temp_middle);
		
		$('#grindSettings').append('<h2>Основные настройки скрипта</h2><div id="grindAll"></div>'); // Кач или прогон
		$('#grindSettings').append(hr + '<h2>Кач лошади</h2><div id="grindConcret"></div>'); // Настройки, если кач
		$('#grindSettings').append(hr + '<h2>Прогон табуна</h2><div id="grindVulg"></div>'); // Настройки, если прогон
		$('#grindSettings').append(hr + '<h2>Прогон БЛ</h2><div id="grindDeuses"></div>'); // Настройки для богов
		
	// ОБЩИЕ НАСТРОЙКИ
		$('#grindAll').append('<p>Кач или прогон: <select id="grAllActType">'
									+'<option value="1">	Кач				</option>'
									+'<option value="0">	Прогон табуна	</option>'
								+'</select></p>');
		$('#grindAll').append(hr);
		$('#grindAll').append('<p>Сколько голов качать/гонять: <input id="grAll" type="number" min="0" value="1"> <i>Если необходимо прогнать всё, что есть в заводе, можно ввести заведомо большее число: скрипт остановится, когда прогонит всех в заводе.</i></p>');
		$('#grindAll').append(hr);
		
	// НАСТРОЙКИ КАЧА
		$('#grindConcret').append('<table style="width: 100%;"><tbody><tr>'
				+'<td id="grindConcretLeft" style="vertical-align: top; width: 60%;"></td>'
				+'<td id="grindConcretRight" style="vertical-align: top;"></td>'
			+'</tr></tbody></table>');
		$('#grindConcretLeft').append('<p class="spacer-bottom bold">При записи выбираются ТОЛЬКО те КСК, где ЕСТЬ душ и поилка!</p>');
		$('#grindConcretLeft').append(hr);
		$('#grindConcretLeft').append('<p>Запись в КСК: <select id="grConc">'
									+'<option value="0">	Общий	</option>'
									+'<option value="1">	Резерв	</option>'
								+'</select> <i>(Если в резерве нет, то общий)</i></p>');
		$('#grindConcretLeft').append('<p>Тип КСК: <select id="grConc">'
									+'<option value="0">	Любой	</option>'
									+'<option value="1">	Лес		</option>'
									+'<option value="2">	Горы	</option>'
									+'<option value="3">	Пляж	</option>'
								+'</select> <i>(Если в резерве нет, то общий)</i></p>');
		$('#grindConcretLeft').append(hr);
		$('#grindConcretLeft').append('<p>Седло и уздечка: <select id="grConc">'
									+'<option value="0">	То, которое есть в КСК или самое дешёвое из имеющегося	</option>'
									+'<option value="1">	1*	</option>'
									+'<option value="2">	2**	</option>'
									+'<option value="3">	3***</option>'
								+'</select></p>');
		$('#grindConcretLeft').append('<p>Бинты и налобник: <select id="grConc">'
									+'<option value="0">	Только из КСК (при наличии)	</option>'
									+'<option value="1">	Из инвентаря	</option>'
									+'<option value="2">	Не использовать	</option>'
								+'</select></p>');
		
		$('#grindConcretLeft').append('<br><p class="spacer-bottom bold">Выжеребка</p>');
		$('#grindConcretLeft').append('<p>Выборка: <select id="grConc">'
									+'<option value="0">	Рожать только нужный пол	</option>'
									+'<option value="1">	Рожать всё подряд			</option>'
								+'</select></p>');
		$('#grindConcretLeft').append('<p>Через сколько неудачных случек использовать МЗ (0, если НЕ использовать): <input id="grConc" type="number" min="0" value="0"></p>');
		$('#grindConcretLeft').append('<p>Сколько случек в команду: <input id="grConc" type="number" min="0" value="5"></p>');
		$('#grindConcretLeft').append(hr);
		$('#grindConcretLeft').append('<p>Завод (оставьте поле пустым, если беззаводье): <input id="grConc" type="text" maxlength="20"></p>');
		$('#grindConcretLeft').append(hr);
		$('#grindConcretLeft').append('<p>Аффикс: <input id="grConc" type="text"></p>');
		$('#grindConcretLeft').append('<p>Имена: <select id="grConc">'
									+'<option value="0">	Для жеребцов и кобыл	</option>'
									+'<option value="1">	Из списка	</option>'
								+'</select></p>');
		$('#grindConcretLeft').append('<p><i>Если в имени нужно указывать ГП, то пишите в начале или конце имени БЕЗ кавычек:</i></p>'
									+'<p>`<code>{{l_gp}}</code>` - <i>для ГП вида "ИмяЛошади 12345.67", </i></p>'
									+'<p>`<code>{{gp}}</code>` - <i>для ГП вида "ИмяЛошади 345.67", </i></p>'
									+'<p>`<code>{{full_vn}}</code>` - <i>для ВН вида "ИмяЛошади 1234.56"</i></p>');
		$('#grindConcretLeft').append(hr);
		$('#grindConcretLeft').append('<p>Имена(ЖЕРЕБЦЫ): <input id="grConc" type="text" value="Жеребец {{l_gp}}" maxlength="20"></p>');
		$('#grindConcretLeft').append('<p>Имена(КОБЫЛЫ): <input id="grConc" type="text" value="Кобылица {{l_gp}}" maxlength="20"></p>');
		$('#grindConcretLeft').append('<p>Имена(СПИСОК ЧЕРЕЗ ЗАПЯТУЮ): <i>(Выбираются поочерёдно, если закончатся - будут выбираться согласно полу из указанных выше. Слишком длинные будут обрезаны. Лучше следите сами, скрипт не умеет обрезать красиво)</i></p> <textarea id="grConc" style="height: 70px;width: 500px;"></textarea>');

		$('#grindConcretRight').append('<p>Урок: <select id="grConc">'
									+'<option value="0">	Делать	</option>'
									+'<option value="1">	Не делать	</option>'
								+'</select></p>');
		$('#grindConcretRight').append('<p>Игры: <select id="grConc">'
									+'<option value="0">	Делать	</option>'
									+'<option value="1">	Не делать	</option>'
								+'</select></p>');
		$('#grindConcretRight').append('<p class="spacer-bottom bold">Порядок кача</p>');
		$('#grindConcretRight').append('<p>1 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>2 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>3 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>4 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>5 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>6 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>7 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>8 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>9 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>10 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>11 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>12 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>13 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
		$('#grindConcretRight').append('<p>14 : <select id="grConc"><option value="0">(пусто)</option> <optgroup label="Прогулки"><option value="Лес">Лес</option><option value="Горы">Горы</option><option value="Пляж">Пляж</option></optgroup> <optgroup label="Тренировки"><option value="тВыносливость">Выносливость (тренировка)</option><option value="тСкорость">Скорость (тренировка)</option><option value="тВыездка">Выездка (тренировка)</option><option value="тГалоп">Галоп (тренировка)</option><option value="тРысь">Рысь (тренировка)</option><option value="тПрыжки">Прыжки (тренировка)</option></optgroup> <optgroup label="Соревнования"><option value="cРысь">Рысь (соревнование)</option><option value="cГалоп">Галоп (соревнование)</option><option value="cВыездка">Выездка (соревнование)</option><option value="cКросс">Кросс (соревнование)</option><option value="cКонкур">Конкур (соревнование)</option><option value="cГВБ">Гонки вокруг бочек (соревнование)</option><option value="сКаттинг">Каттинг (соревнование)</option><option value="сТрейл">Трейл (соревнование)</option><option value="сРейнинг">Рейнинг (соревнование)</option><option value="сВестернПлеже">Вестерн плеже (соревнование)</option></optgroup></select></p>');
								
	// НАСТРОЙКИ ПРОГОНА
		$('#grindVulg').append('<p>Кач или прогон: <select id="grVulg">'
									+'<option value="1">	Кач				</option>'
									+'<option value="0">	Прогон табуна	</option>'
								+'</select></p>');
								
	// БОЖЕСТВЕННЫЕ НАСТРОЙКИ
		$('#grindDeuses').append('<p>Кач или прогон: <select id="grDeus">'
									+'<option value="1">	Кач				</option>'
									+'<option value="0">	Прогон табуна	</option>'
								+'</select></p>');
	}
	
	
    if(location.href.indexOf('elevage/bureau/') !== -1) {
		$('section.content__middle > ul.tab').append('<li id="tab-grind-settings" class="tab-style-6-0-0"><div><a style="" class="tab-action"onclick="showGrindSettings();">Настройки скрипта</a></div></li>');
	}
	

})();
