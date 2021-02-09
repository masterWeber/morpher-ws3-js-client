# Morpher

[![Build Status](https://travis-ci.org/masterWeber/morpher-ws3-js-client.svg?branch=main)](https://travis-ci.org/masterWeber/morpher-ws3-js-client)

JavaScript-клиент веб-сервиса ["Морфер 3.0"](https://morpher.ru/ws3/)

Библиотека реализует следующие функции веб-сервиса:

* Склонение по падежам на русском и украинском языках;
* Выделение в строке фамилии, имени и отчества;
* Пропись чисел и склонение единицы измерения (3 новых письма, 10 комментариев, 14 календарных дней);
* Пропись чисел в виде порядковых числительных («сто первый километр»);
* Пропись дат в любом падеже («пятого мая две тысячи первого года»);
* Определение пола по ФИО, например, для вывода «действующий» или «действующая на основании...»;
* Склонение прилагательных по родам;
* Расстановка ударений в текстах;
* Образование прилагательных от названий городов и стран.

На казахском языке:

* Склонение по падежам, числам и лицам


Веб-сервис ["Морфер 3.0"](https://morpher.ru/ws3/) предусматривает [бесплатное (с ограничениями)](https://morpher.ru/ws3/#limitations)
и [платное](https://morpher.ru/ws3/buy/) использование. Подробнее смотрите на [сайте проекта](https://morpher.ru).

## Установка

В браузере:
```html
<script src="morpher.min.js"></script>
```

При использовании npm:
```sh
npm i morpher-ws3-client
```
Примечание: добавьте `--save`, если вы используете npm < 5.0.0

В node.js:
```javascript
const Morpher = require('morpher-ws3-client');
```

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
        if (error instanceof MorpherError) {
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

* `предложный_О` (`prepositional_O`) — предложный падёж с предлогом О/ОБ/ОБО, предлог выбирается автоматически;
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
    },
    error => {
        if (error instanceof MorpherError) {
            console.error(error.message + ' Код ошибки: ' + error.code);
        } else {
            console.error(error);
        }
    }
);
```

Флаги поддерживаемые для `russian.declension(phrase, flags)`:
```javascript
Morpher.FLAG_FEMININE  \\ Женский род
Morpher.FLAG_MASCULINE \\ Мужской род
Morpher.FLAG_ANIMATE   \\ Одушевлённое
Morpher.FLAG_INANIMATE \\ Неодушевлённое
Morpher.FLAG_COMMON    \\ Нарицательное
Morpher.FLAG_NAME      \\ ФИО
```

Если входная строка распознана как ФИО, то объект `DeclensionResult` будет содержать разбивку строки на фамилию, имя и отчество:

* `родительный`   (`genitive`) &mdash; ФИО в родительном падеже;
* `дательный`     (`dative`) &mdash; ФИО в дательном падеже;
* `винительный`   (`accusative`) &mdash; ФИО в винительном падеже;
* `творительный`  (`instrumental`) &mdash; ФИО в творительном падеже;
* `предложный`    (`prepositional`) &mdash; ФИО в предложном падеже;
* `имя`           (`name`);
* `фамилия`       (`surname`);
* `отчество`      (`patronymic`).
