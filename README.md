# Morpher

[![Build Status](https://travis-ci.org/masterWeber/morpher-ws3-js-client.svg?branch=main)](https://travis-ci.org/masterWeber/morpher-ws3-js-client)

JavaScript-клиент веб-сервиса ["Морфер 3.0"](https://morpher.ru/ws3/)

Библиотека реализует следующие функции веб-сервиса:

* Склонение по падежам на русском и украинском языках;
* Выделение в строке фамилии, имени и отчества;
* Пропись чисел и склонение единицы измерения (3 новых письма, 10 комментариев, 14 календарных дней)
* Пропись чисел в виде порядковых числительных («сто первый километр»)
* Пропись дат в любом падеже («пятого мая две тысячи первого года»)
* Определение пола по ФИО, например, для вывода «действующий» или «действующая на основании...»
* Склонение прилагательных по родам
* Расстановка ударений в текстах
* Образование прилагательных от названий городов и стран

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

Для склонения слов и словосочетаний используется метод 
`russian.declension(phrase, flags)`:

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
