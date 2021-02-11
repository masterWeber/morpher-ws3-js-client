# Morpher

[![Build Status](https://travis-ci.org/masterWeber/morpher-ws3-js-client.svg?branch=main)](https://travis-ci.org/masterWeber/morpher-ws3-js-client)
[![npm version](https://badge.fury.io/js/morpher-ws3-client.svg)](https://badge.fury.io/js/morpher-ws3-client)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/masterWeber/morpher-ws3-client/main/LICENSE)
[![npm](https://img.shields.io/npm/dt/morpher-ws3-client)](https://npmcharts.com/compare/morpher-ws3-client?interval=30&log=false&minimal=true)

JavaScript-клиент веб-сервиса ["Морфер 3.0"](https://morpher.ru/ws3/)

Библиотека реализует следующие функции веб-сервиса:

* [Склонение по падежам на русском](#russian-declension) и украинском языках;
* [Выделение в строке фамилии, имени и отчества](#russian-full-name);
* [Пропись чисел и склонение единицы измерения](#russian-spell) (3 новых письма, 10 комментариев, 14 календарных дней)];
* [Пропись чисел в виде порядковых числительных](#russian-spell-ordinal) («сто первый километр»);
* [Пропись дат в любом падеже](#russian-spell-date) («пятого мая две тысячи первого года»);
* [Склонение прилагательных по родам](#russian-adjective-genders);
* [Образование прилагательных от названий городов и стран](#russian-adjectivize);
* Расстановка ударений в текстах.

На казахском языке:

* [Склонение по падежам, числам и лицам](#qazaq-declension);

Веб-сервис ["Морфер 3.0"](https://morpher.ru/ws3/) предусматривает [бесплатное (с ограничениями)](https://morpher.ru/ws3/#limitations)
и [платное](https://morpher.ru/ws3/buy/) использование. Подробнее смотрите на [сайте проекта](https://morpher.ru).

## Загрузка

* [morpher.js](https://raw.githubusercontent.com/masterWeber/morpher-ws3-js-client/main/dist/morpher.js) ~5 kB gzipped
* [morpher.min.js](https://raw.githubusercontent.com/masterWeber/morpher-ws3-js-client/main/dist/morpher.min.js) ~3 kB gzipped

## Установка

### Браузер
```html
<script src="morpher.min.js"></script>
```

### Node.js
При использовании [npm](https://www.npmjs.com/):
```sh
npm i morpher-ws3-client
```
Примечание: добавьте `--save`, если вы используете npm < 5.0.0

## Использование

```javascript
const morpher = new Morpher({
    baseUrl: 'https://localhost', // по умолчанию https://ws3.morpher.ru
    token: 'YOUR_TOKEN',          // по умолчанию null
    timeoutMs: 1000,              // по умолчанию 3000
});
```

Можно вызвать конструктор без аргументов, в этом случае будут использоваться
параметры по умолчанию.
```javascript
const morpher = new Morpher();
```
<p id="russian-declension"></p>

### Склонение по падежам на русском языке

Для склонения слов и словосочетаний используется метод `russian.declension(phrase, flags)`:
```javascript
const morpher = new Morpher();
 
morpher.russian.declension('Программист').then(
    result => {
        console.log(result['родительный']);                  // Программиста
        console.log(result['множественное']['родительный']); // Программистов
        console.log(result.множественное.родительный);       // Программистов
        console.log(result.plural.genitive);                 // Программистов
    },
    error => {
        if (typeof error === 'MorpherError')
            console.error(error.message + ' Код ошибки: ' + error.code);
        } else {
            console.error(error);
        }
    }
);
```

`result` &mdash; объект `DeclensionResult` со следующими свойствами:

* `именительный`  (`nominative`) &mdash; текст в именительном падеже;
* `родительный`   (`genitive`) &mdash; текст в родительном падеже;
* `дательный`     (`dative`) &mdash; текст в дательном падеже;
* `винительный`   (`accusative`) &mdash; текст в винительном падеже;
* `творительный`  (`instrumental`) &mdash; текст в творительном падеже;
* `предложный`    (`prepositional`) &mdash; текст в предложном падеже;
* `множественное` (`plural`) &mdash; возвращает объект со свойствами-падежами для текста во множественном числе.

При использовании платного аккаунта на сервисе, определяются дополнительные свойства:

* `предложный_О` (`prepositional_O`) — предложный падеж с предлогом О/ОБ/ОБО, предлог выбирается автоматически;
* `род`          (`gender`) &mdash; род (masculine, feminine или neuter);
* `где`          (`gde`, `where`, `locative`) — в местном падеже (локатив) с предлогом;
* `куда`         (`kuda`, `where_to`) — в направительном падеже (аллатив) с предлогом;
* `откуда`       (`otkuda`, `where_from`, `whence`) — в исходном падеже (аблатив) с предлогом.

#### Флаги для разрешения неоднозначностей

Есть слова, которые могут склоняться по-разному, например:

* фамилия Резник склоняется у мужчин и не склоняется у женщин;
* Ростов в творительном падеже будет Ростовым, если это фамилия, и Ростовом, если это город;
* тестер в винительном падеже будет тестера, если это человек, и тестер, если имеется в виду прибор.

Для повышения качества склонения вы можете сообщить веб-сервису дополнительную информацию через флаги.
Несколько флагов можно передать через запятую:
```javascript
const morpher = new Morpher();
 
morpher.russian.declension('Слепов Сергей Николаевич', Morpher.FLAG_NAME, Morpher.FLAG_MASCULINE).then(
    result => {
        console.log(result['родительный']); // Слепова Сергея Николаевича
        console.log(result.fullName.name);  // Сергей
    }
);
```

Флаги поддерживаемые для `russian.declension(phrase, flags)`:

* Morpher.FLAG_FEMININE &mdash; Женский род;
* Morpher.FLAG_MASCULINE &mdash; Мужской род;
* Morpher.FLAG_ANIMATE &mdash; Одушевлённое;
* Morpher.FLAG_INANIMATE &mdash; Неодушевлённое;
* Morpher.FLAG_COMMON &mdash; Нарицательное;
* Morpher.FLAG_NAME &mdash; ФИО.

<p id="russian-full-name"></p>

### Выделение в строке фамилии, имени и отчества

Если входная строка распознана как ФИО, то объект `DeclensionResult` будет содержать разбивку строки на фамилию, имя и отчество:

* `родительный`   (`genitive`) &mdash; ФИО в родительном падеже;
* `дательный`     (`dative`) &mdash; ФИО в дательном падеже;
* `винительный`   (`accusative`) &mdash; ФИО в винительном падеже;
* `творительный`  (`instrumental`) &mdash; ФИО в творительном падеже;
* `предложный`    (`prepositional`) &mdash; ФИО в предложном падеже;
* `имя`           (`name`);
* `фамилия`       (`surname`);
* `отчество`      (`patronymic`).

<p id="russian-spell"></p>

### Пропись чисел и согласование с числом

Метод `russian.spell(number, unit)` решает задачу получения прописи числа
(тысяча сто двадцать пять) и согласование единицы измерения с предшествующем
числом (1 попугай, 2 попугая, 5 попугаев):
```javascript
const morpher = new Morpher();
 
morpher.russian.spell(235, 'рубль').then(
    result => {
        console.log(result['n']['родительный']);    // двухсот тридцати пяти
        console.log(result.n.genitive);             // двухсот тридцати пяти
        
        console.log(result['unit']['родительный']); // рублей
        console.log(result.unit.genitive);          // рублей
    }
);
```

Комбинируя соответствующие падежные формы n и unit, можно получить вывод «суммы прописью» на любой вкус:

* 235 рублей
* Двести тридцать пять рублей
* 235 (двести тридцать пять) рублей и т.п.

<p id="russian-spell-ordinal"></p>

### Пропись чисел в виде порядковых числительных

Метод `russian.spellOrdinal(number, unit)` похож на `russian.spell(number, unit)`, 
но возвращает пропись числа в форме порядкового числительного:
```javascript
const morpher = new Morpher();
 
morpher.russian.spellOrdinal(5, 'колесо').then(
    result => {
        console.log(result['n']['родительный']);    // пятого
        console.log(result['unit']['родительный']); // колеса
        
        console.log(result.n.genitive);             // пятого
        console.log(result.unit.genitive);          // колеса
    }
);
```

<p id="russian-spell-date"></p>

### Пропись дат

Метод `russian.spellDate(date)` склоняет по падежам дату, заданную в формате ГГГГ-ММ-ДД:
```javascript
const morpher = new Morpher();
 
morpher.russian.spellDate('2019-06-29').then(
    result => {
        console.log(result['родительный']);  // двадцать девятого июня две тысячи девятнадцатого года
        console.log(result.genitive);        // двадцать девятого июня две тысячи девятнадцатого года
        
        console.log(result['творительный']); // двадцать девятому июня две тысячи девятнадцатого года
        console.log(result.instrumental);    // двадцать девятому июня две тысячи девятнадцатого года
    }
);
```

<p id="russian-adjective-genders"></p>

### Склонение прилагательных по родам

Метод `russian.adjectiveGenders(lemma)` склоняет данное ему прилагательное, преобразуя его 
из мужского рода в женский, средний и во множественное число:
```javascript
const morpher = new Morpher();
 
morpher.russian.adjectiveGenders('уважаемый').then(
    result => {
        console.log(result['женский']);    // уважаемая
        console.log(result.feminine);      // уважаемая

        console.log(result.средний);       // уважаемое
        console.log(result.neuter);        // уважаемое

        console.log(result.множественное); // уважаемые
        console.log(result.plural);        // уважаемые
    }
);
```
Требования к входному прилагательному:

* Оно должно быть в мужском роде, в единственном числе.
* Оно должно быть полным, т.е. "полный", а не "полон".
* Оно должно быть одним словом. Внутри слова допустимы дефис и 
апостроф: рабоче-крестьянский, Кот-д'Ивуарский. Вокруг слова допустимы пробелы, 
кавычки и другие знаки.

<p id="russian-adjectivize"></p>

### Образование прилагательных

Метод `russian.adjectivize(lemma)` образует прилагательные от названий городов и 
стран: Москва – московский, Ростов – ростовский, Швеция – шведский, Греция – греческий.

Пример:
```javascript
const morpher = new Morpher();
 
morpher.russian.adjectivize('Москва').then(
    result => {
        console.log(result); // ['московский']
    }
);
```
Метод возвращает массив строк. Что они означают, описано [здесь](https://morpher.ru/adjectivizer/).

<p id='qazaq-declension'></p>

### Склонение по падежам, числам и лицам на казахском языке

Для склонения слов и словосочетаний используется метод `qazaq.declension(phrase)`:
```javascript
const morpher = new Morpher();
 
morpher.qazaq.declension('Нұрсултан Әбішұлы Назарбаев').then(
    result => {
        console.log(result['ілік']);          // Нұрсултан Әбішұлы Назарбаевтың
        console.log(result.genitive);         // Нұрсултан Әбішұлы Назарбаевтың
        
        console.log(result['көпше']['ілік']); // Нұрсултан Әбішұлы Назарбаевтартың
        console.log(result.plural.genitive);  // Нұрсултан Әбішұлы Назарбаевтартың
    }
);
```

`result` &mdash; объект `DeclensionResult` со следующими свойствами:

* `атау`     (`nominative`) &mdash; текст в именительном падеже;
* `ілік`     (`genitive`) &mdash; текст в родительном падеже;
* `барыс`    (`dative`) &mdash; текст в дательно-направительном падеже;
* `табыс`    (`accusative`) &mdash; текст в винительном падеже;
* `шығыс`    (`ablative`) &mdash; текст в исходном падеже;
* `жатыс`    (`locative`) &mdash; текст в местном падеже;
* `көмектес` (`instrumental`) &mdash; текст в творительном падеже;
* `көпше`    (`plural`) &mdash; возвращает объект со свойствами-падежами для текста во множественном числе.

## Разработка

Node: Убедитесь, что [установлена](https://nodejs.org/ru/download/) версия Node.js не ниже ^12. Проверить это можно с помощью node -v.

### Установка
Сделайте форк репозитория `morpher-ws3-js-client`.

Затем выполните:

```sh
$ git clone https://github.com/<your-github-username>/morpher-ws3-js-client
$ cd morpher-ws3-js-client
```

### Запуск тестов

unit:
```sh
$ npm test
```

e2e:
```sh
$ npm test:e2e
```

### Сборка
```sh
$ npm build
```

## License

[MIT](LICENSE)
