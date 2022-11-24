
'use strict'
import { foreachArr, checked, speed, init, liCreate, sensor } from './modules/func.js'
import { map } from './modules/osm.js'
import { reqDelete, loadModel, postModel, viewDB } from './modules/requests.js'
import { graf } from './modules/wialon.js'

const linkSelect = document.querySelectorAll('.linkSelect');
const centerOs = document.querySelectorAll('.centerOs');
const moduleConfig = document.querySelector('.moduleConfig')
const tiresLink = document.querySelectorAll('.tires_link')
const linkSelectOs = document.querySelectorAll('.linkSelectOs')
const linkSelectTires = document.querySelectorAll('.linkSelectTires')
const wrapperButton = document.querySelector('.wrapper_button')
const btnsens = document.querySelectorAll('.btnsens')
const titleSens = document.querySelector('.title_sens')
const obo = document.querySelector('.obo')
const osi = document.querySelectorAll('.osi')
const speedGraf = document.querySelector('.speedGraf')
const car = document.querySelector('.title_two')
const inputDate = document.querySelectorAll('.input_date')
const selectSpeed = document.querySelector('.select_speed')
const btnClear = document.querySelector('.btn_clear')

//валидация токена на wialon
init();
//загрузка текущей модели конфигуратора из базы
loadModel();
//очистка модели из базы и удаление отрисовки
btnClear.addEventListener('click', reqDelete)
//обработка выбора графика скорости за интервал
checked()
//управление графиком скорости
speed()
//генерация списка под параметры датчиков с базы
liCreate()
//запрос в базу и получение параметров датчиков
setInterval(viewDB, 5000)


export function dataInput() {
    selectSpeed.value = 0;
    const arrDate = [];
    inputDate.forEach(e => {
        arrDate.push(e.value)
    })
    let t01 = new Date(arrDate[0])
    let timeFrom = Math.floor(t01.setHours(t01.getHours()) / 1000)
    let t02 = new Date(arrDate[1])
    let nowDate = Math.floor(t02.setHours(t02.getHours()) / 1000)
    graf(timeFrom, nowDate, 30)
}

let nowDate = Math.round(new Date().getTime() / 1000)
let nDate = new Date();
export function dataSelect() {
    switch (selectSpeed.value) {
        case '1': {
            let timeFrom = Math.round(nDate.setHours(nDate.getHours() - 24) / 1000);
            graf(timeFrom, nowDate, 30)
        }
            break;
        case '2': {
            let timeFrom = Math.round(nDate.setDate(nDate.getDate() - 7) / 1000);
            graf(timeFrom, nowDate, 100)
        }
            break;
        case '3': {
            let timeFrom = Math.round(nDate.setMonth(nDate.getMonth() - 1) / 1000);
            graf(timeFrom, nowDate, 300)
        }
            break;
    }
}

car.addEventListener('click', () => {
    console.log('нажал на машину')
    speedGraf.style.display = 'block';
    obo.style.display = 'none'
    titleSens.style.display = 'none'
    wrapperButton.style.display = 'none'
})

const array = [];
function modul() {
    centerOs.forEach(el => {
        el.addEventListener('click', () => {
            centerOs.forEach(el => el.classList.remove('os'));
            el.classList.add('os')
            moduleConfig.style.display = 'flex'
            array.push(el)
            console.log('нажал ось')
        })
    })
    os(array)
}
modul()

function os(arr) {
    const arrayTrailer = [];
    linkSelectOs.forEach(e =>
        e.addEventListener('click', () => {
            arrayTrailer.push(e)
            e.textContent == 'Прицеп' ?
                arr[arr.length - 1].style.backgroundImage = "url('../image/line_red.png')" :
                arr[arr.length - 1].style.backgroundImage = "url('../image/line_gray.png')"
        }))

    linkSelectTires.forEach(e =>
        e.addEventListener('click', () => {
            const arrayTyres = []
            arrayTyres.push(e)
            console.log(arrayTrailer)
            // console.log(arr[arr.length - 1])
            arr[arr.length - 1].previousElementSibling.children[0].style.display = 'none';
            arr[arr.length - 1].previousElementSibling.children[1].style.display = 'none';
            arr[arr.length - 1].nextElementSibling.children[0].style.display = 'none';
            arr[arr.length - 1].nextElementSibling.children[1].style.display = 'none';
            if (e.textContent == 2) {
                arr[arr.length - 1].previousElementSibling.children[0].style.display = 'flex';
                arr[arr.length - 1].nextElementSibling.children[0].style.display = 'flex';
            }
            if (e.textContent == 4) {
                arr[arr.length - 1].previousElementSibling.children[0].style.display = 'flex';
                arr[arr.length - 1].previousElementSibling.children[1].style.display = 'flex';
                arr[arr.length - 1].nextElementSibling.children[0].style.display = 'flex';
                arr[arr.length - 1].nextElementSibling.children[1].style.display = 'flex';
            }
            console.log('запуск saveBase')
            validation(arrayTrailer, arrayTyres)
        }))
}

function validation(arrayTrailer, arrayTyres) {
    console.log(arrayTrailer, arrayTyres)
    const osy = array[array.length - 1].id;
    const trailer = arrayTrailer.length ? arrayTrailer[arrayTrailer.length - 1].textContent : 'Тягач'
    const tyres = arrayTyres[arrayTyres.length - 1].textContent
    postModel(osy, trailer, tyres)

}

function select() {
    linkSelect.forEach(el =>
        el.addEventListener('click', () => {
            console.log('нажал конфиг')
            moduleConfig.style.display = 'none'
            osi.forEach(it =>
                it.style.display = 'none')
            switch (el.textContent) {
                case '1':
                    foreachArr(osi, centerOs, 1)
                    break;
                case '2':
                    foreachArr(osi, centerOs, 2)
                    break;
                case '3':
                    foreachArr(osi, centerOs, 3)
                    break;
                case '4':
                    foreachArr(osi, centerOs, 4)
                    break;
                case '5':
                    foreachArr(osi, centerOs, 5)
                    break;
                case '6':
                    foreachArr(osi, centerOs, 6)
                    break;
                case '7':
                    foreachArr(osi, centerOs, 7)
                    break;
                case '8':
                    foreachArr(osi, centerOs, 8)
                    break;
            }
        }))
}
select()



export function view(arr) {
    const msg = document.querySelectorAll('.msg')
    let arg = msg
    //  console.log(arg)
    arr.forEach((el, index) => {
        arg[index].textContent = `${el.name}:${el.value}`
    })
    msgAct(arg)
}

tiresLink.forEach(e => {
    e.addEventListener('click', () => {
        t.push(e)
        speedGraf.style.display = 'none';
        sensor()
        tiresLink.forEach(e => {
            obo.style.display = 'none'
            titleSens.style.display = 'none'
            wrapperButton.style.display = 'none'
            const msg = document.querySelectorAll('.msg')
            msg.forEach(el => el.classList.remove('act'))
            //  console.log('убрали')
        });
        wrapperButton.style.display = 'flex';
        //  console.log('поставили')
        tiresLink.forEach(el => el.classList.remove('tiresActiv'));
        e.classList.add('tiresActiv')
        //console.log('нажал')

    })
})

let counter;
const t = [];
const p = [];
function fnt() {
    tiresLink.forEach(it => {
        if (it.classList.contains('tiresActiv') && btnsens[0].classList.contains('actBTN')) {
            const iterValue = [...counter.textContent]
            let value;
            iterValue.forEach(el => {
                if (el === ':') {
                    value = iterValue.splice(iterValue.indexOf(el) + 1, iterValue.length - 1).join('')
                }
            })
            value.length > 10 ?
                it.children[1].textContent = '-' :
                it.children[0].textContent = value + '\nБар'
            it.children[0].style.background = objColor[generFront(value)];
        }
        if (it.classList.contains('tiresActiv') && btnsens[1].classList.contains('actBTN')) {
            iterValue = [...counter.textContent]
            iterValue.forEach(el => {
                if (el === ':') {
                    value = iterValue.splice(iterValue.indexOf(el) + 1, iterValue.length - 1).join('')
                }
            })
            value.length > 10 ?
                it.children[1].textContent = '-' :
                it.children[1].textContent = value + '°'
            it.children[1].style.background = objColor[generT(value)];
        }
    })

}
function msgAct(arg) {
    arg.forEach(e => e.addEventListener('click', () => {
        counter = e;
        p.push(e)
        arg.forEach(el => el.classList.remove('act'))
        e.classList.add('act')
        const arrAct = [...e.textContent]
        let value;
        arrAct.forEach(el => {
            if (el === ':') {
                value = arrAct.splice(arrAct.indexOf(el) + 1, arrAct.length - 1).join('')
            }
        })
        tiresLink.forEach(e => {
            if (e.classList.contains('tiresActiv') && btnsens[0].classList.contains('actBTN')) {
                value.length > 10 ?
                    e.children[0].textContent = '-' :
                    e.children[0].textContent = value + '\nБар'
                e.children[0].style.background = objColor[generFront(value)];
            }
            if (e.classList.contains('tiresActiv') && btnsens[1].classList.contains('actBTN')) {
                value.length > 10 ?
                    e.children[1].textContent = '-' :
                    e.children[1].textContent = value + '°'
                e.children[1].style.background = objColor[generT(value)];
            }
        })
    }))
    arg.forEach(elem => {
        if (elem.classList.contains('act') && btnsens[0].classList.contains('actBTN'))
            fnt()
    })
}

//условия для подсветки шин D и T
function generFront(el) {
    let generatedValue;
    if (el >= 8 && el <= 9)
        generatedValue = 3;
    if (el >= 7.5 && el < 8 || el > 9 && el <= 13)
        generatedValue = 2;
    if (el > -100 && el < 7.5 || el > 13)
        generatedValue = 1;
    return generatedValue;
};

function generT(el) {
    let generatedValue;
    if (el >= -50 && el <= 35)
        generatedValue = 4;
    if (el > 36)
        generatedValue = 1;

    return generatedValue;
};
//создаем объект где ключ-результат условия, а свойства - соответсующее условию значение
const objColor = {
    1: '#e03636',
    2: '#9ba805',
    3: '#3eb051',
    4: '#ffffff'
}