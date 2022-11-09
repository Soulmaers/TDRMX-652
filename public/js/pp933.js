



const linkSelect = document.querySelectorAll('.linkSelect');
const centerOs = document.querySelectorAll('.centerOs');
const moduleConfig = document.querySelector('.moduleConfig')
const tires = document.querySelectorAll('.tires')
const tiresInside = document.querySelectorAll('.tiresInside')
const tiresLink = document.querySelectorAll('.tires_link')
const linkSelectOs = document.querySelectorAll('.linkSelectOs')
const linkSelectTires = document.querySelectorAll('.linkSelectTires')
const wrapperButton = document.querySelector('.wrapper_button')
const wrapperLeft = document.querySelector('.wrapper_left')
const btnsens = document.querySelectorAll('.btnsens')
const titleSens = document.querySelector('.title_sens')
const obo = document.querySelector('.obo')
const osi = document.querySelectorAll('.osi')
const tiresD = document.querySelectorAll('.tiresD')
const tiresT = document.querySelectorAll('.tiresT')
const tiresActiv = document.querySelector('.tiresActiv')
const speedGraf = document.querySelector('.speedGraf')
const car = document.querySelector('.title_two')
const optionInt = document.querySelectorAll('.option_int')
const inputDate = document.querySelectorAll('.input_date')
const btnForm = document.querySelectorAll('.btm_form')
const selectSpeed = document.querySelector('.select_speed')
const grafView = document.querySelector('.grafik1')


function dataInput() {
    selectSpeed.value = 0;
    arrDate = [];
    inputDate.forEach(e => {
        arrDate.push(e.value)
    })
    let t01 = new Date(arrDate[0])
    let timeFrom = Math.floor(t01.setHours(t01.getHours()) / 1000)
    let t02 = new Date(arrDate[1])
    let nowDate = Math.floor(t02.setHours(t02.getHours()) / 1000)
    graf(timeFrom, nowDate, 30)
}

function checked() {
    selectSpeed.addEventListener('click', () => {
        console.log('ченч')
        inputDate.forEach(e => {
            e.value = ''
        })
    })
}
checked()

function dataSelect() {
    if (selectSpeed.value == 1) {
        let nowDate = Math.round(new Date().getTime() / 1000)
        let nDate = new Date();
        let timeFrom = Math.round(nDate.setHours(nDate.getHours() - 24) / 1000);
        console.log(timeFrom, nowDate)
        console.log('сутки')
        graf(timeFrom, nowDate, 30)
    }
    if (selectSpeed.value == 2) {
        let nowDate = Math.round(new Date().getTime() / 1000)
        let nDate = new Date();
        let timeFrom = Math.round(nDate.setDate(nDate.getDate() - 7) / 1000);
        console.log(timeFrom, nowDate)
        console.log('неделя')
        graf(timeFrom, nowDate, 100)
    }
    if (selectSpeed.value == 3) {
        let nowDate = Math.round(new Date().getTime() / 1000)
        let nDate = new Date();
        let timeFrom = Math.round(nDate.setMonth(nDate.getMonth() - 1) / 1000);
        console.log(timeFrom, nowDate)
        console.log('месяц')
        graf(timeFrom, nowDate, 300)
    };
}
function speed() {
    btnForm.forEach(el =>
        el.addEventListener('click', () => {
            if (el.textContent === 'Выполнить' && inputDate[0].value !== '' && inputDate[1].value !== '') {
                grafView.style.display = 'block'
                dataInput()
            }
            if (el.textContent === 'Выполнить' && inputDate[0].value == '' && inputDate[1].value == '') {
                grafView.style.display = 'block'
                dataSelect()
            }
            if (el.textContent === 'Очистить') {
                selectSpeed.value = 0;
                inputDate.forEach(e => {
                    e.value = ''
                    //  console.log('очистил')
                    grafView.style.display = 'none'
                })
            }
        }))
}
speed()

function graf(t1, t2, int) {
    console.log(t1, t2, int)
    const prms2 = {
        "itemId": 25343786,
        "timeFrom": t1,//t1,//timeFrom,//1657205816,
        "timeTo": t2,//t2,//nowDate,//2757209816,
        "flags": 1,
        "flagsMask": 65281,
        "loadCount": 161000//82710
    }
    const remote2 = wialon.core.Remote.getInstance();
    remote2.remoteCall('messages/load_interval', prms2,
        function (code, result) {
            if (code) {
                console.log(wialon.core.Errors.getErrorText(code));
            }
            arr2 = Object.values(result);
            arrIterTime = [];
            arrIterTimeDate = [];
            arr2[1].forEach(el => {
                arrIterTime.push(el.t);
            })
            arrIterTime.forEach(item => {
                dateObj = new Date(item * 1000);
                utcString = dateObj.toString();
                arrTimeDate = utcString.slice(8, 24);
                arrIterTimeDate.push(arrTimeDate);
            })
            let t = 0;
            arrIterTimeDateT = arrIterTimeDate.filter(e => (++t) % int === 0);
            console.log(arrIterTimeDateT)
            arrSpee = [];
            arr2[1].forEach(el => {
                arrSpee.push(el.pos.s)
            })
            let s = 0;
            arrSpeed = arrSpee.filter(e => (++s) % int === 0)
            chrt1(arrSpeed);
            console.log(arrSpeed)
        });
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
        //el.style.backgroundImage = "url('../image/line.png')";
        el.addEventListener('click', () => {
            centerOs.forEach(el => el.classList.remove('os'));
            el.classList.add('os')
            //  wrapperButton.style.display = 'none'
            moduleConfig.style.display = 'flex'

            array.push(el)
            //console.log(array)
            os(array)
            console.log('нажал ось')

        })
    })
}
modul()

function os(arr) {
    linkSelectOs.forEach(e =>
        e.addEventListener('click', () => {
            if (e.textContent == 'Прицеп') {
                arr[arr.length - 1].style.backgroundImage = "url('../image/line_red.png')";
            }
            else if (e.textContent == 'Тягач')
                arr[arr.length - 1].style.backgroundImage = "url('../image/line.png')";
        }))

    linkSelectTires.forEach(e =>
        e.addEventListener('click', () => {
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
        }))

}


function select() {
    linkSelect.forEach(el =>
        el.addEventListener('click', () => {
            console.log('нажал конфиг')
            moduleConfig.style.display = 'none'
            osi.forEach(it =>
                it.style.display = 'none')
            if (el.textContent == '1') {
                osi[0].style.display = 'flex';
                centerOs[0].style.display = 'flex';
            }
            if (el.textContent == '2') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
            }
            if (el.textContent == '3') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                osi[2].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
                centerOs[2].style.display = 'flex';

            }
            if (el.textContent == '4') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                osi[2].style.display = 'flex';
                osi[3].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
                centerOs[2].style.display = 'flex';
                centerOs[3].style.display = 'flex';
            }
            if (el.textContent == '5') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                osi[2].style.display = 'flex';
                osi[3].style.display = 'flex';
                osi[4].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
                centerOs[2].style.display = 'flex';
                centerOs[3].style.display = 'flex';
                centerOs[4].style.display = 'flex';
            }
            if (el.textContent == '6') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                osi[2].style.display = 'flex';
                osi[3].style.display = 'flex';
                osi[4].style.display = 'flex';
                osi[5].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
                centerOs[2].style.display = 'flex';
                centerOs[3].style.display = 'flex';
                centerOs[4].style.display = 'flex';
                centerOs[5].style.display = 'flex';
            }
            if (el.textContent == '7') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                osi[2].style.display = 'flex';
                osi[3].style.display = 'flex';
                osi[4].style.display = 'flex';
                osi[5].style.display = 'flex';
                osi[6].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
                centerOs[2].style.display = 'flex';
                centerOs[3].style.display = 'flex';
                centerOs[4].style.display = 'flex';
                centerOs[5].style.display = 'flex';
                centerOs[6].style.display = 'flex';
            }
            if (el.textContent == '8') {
                osi[0].style.display = 'flex';
                osi[1].style.display = 'flex';
                osi[2].style.display = 'flex';
                osi[3].style.display = 'flex';
                osi[4].style.display = 'flex';
                osi[5].style.display = 'flex';
                osi[6].style.display = 'flex';
                osi[7].style.display = 'flex';
                centerOs[0].style.display = 'flex';
                centerOs[1].style.display = 'flex';
                centerOs[2].style.display = 'flex';
                centerOs[3].style.display = 'flex';
                centerOs[4].style.display = 'flex';
                centerOs[5].style.display = 'flex';
                centerOs[6].style.display = 'flex';
                centerOs[7].style.display = 'flex';
            }

        }))

}
select()

function init() {
    wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");
    wialon.core.Session.getInstance().loginToken("0f481b03d94e32db858c7bf2d8415204289C57FB5B35C22FC84E9F4ED84D5063558E1178", "", // try to login
        function (code) {
            if (code) {
                return;
            }
            getMainInfo();
            //grafTwo();
            setInterval(getMainInfo, 5000);
        });
};
init();
function getMainInfo() {
    wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com"); // get instance of current Session
    var prms1 = {
        "unitId": 25343786,
        "sensors": []
    };

    const remote = wialon.core.Remote.getInstance();
    remote.remoteCall('unit/calc_last_message', prms1,
        function (code, result) {
            if (code) {
                console.log(wialon.core.Errors.getErrorText(code));
            }
            arr = Object.values(result);
            arrayD = [];
            arrayD.push(arr[0]); arrayD.push(arr[2]); arrayD.push(arr[1]); arrayD.push(arr[9]);
            arrayD.push(arr[8]); arrayD.push(arr[7]); arrayD.push(arr[6]); arrayD.push(arr[5]);
            arrayD.push(arr[4]); arrayD.push(arr[3]);
            arrayT = [];
            arrayT.push(arr[19]); arrayT.push(arr[18]); arrayT.push(arr[17]); arrayT.push(arr[16]);
            arrayT.push(arr[15]); arrayT.push(arr[14]); arrayT.push(arr[13]); arrayT.push(arr[12]);
            arrayT.push(arr[11]); arrayT.push(arr[10]);

            // funcRandom(arrayD, arrayT);

            //tiresOs(arrayD);
            // go(arrayD, arrayT);
            //got(arrayD);
            //return window['arrayD'] = arrayD, arrayT, arr

        });


    const flags = 1 + 1026
    const prms = {
        "spec": {
            "itemsType": "avl_unit",
            "propName": "sys_name",
            "propValueMask": "*",
            "sortType": "sys_name"
        },
        "force": 1,
        "flags": flags,
        "from": 0,
        "to": 0
    };

    const remote1 = wialon.core.Remote.getInstance();
    remote1.remoteCall('core/search_items', prms,
        function (code, result) {
            if (code) {
                console.log(wialon.core.Errors.getErrorText(code));
            }
            arr1 = Object.values(result);
            // sensors = Object.entries(arr1[5][0].lmsg.p)
            // sensorss = arr1[5][0].lmsg.p;

            const sensorss = Object.keys(arr1[5][0].lmsg.p).sort().reduce(
                (obj, key) => {
                    obj[key] = arr1[5][0].lmsg.p[key];
                    return obj;
                },
                {}
            );
            sensors = Object.entries(sensorss)
            // console.log(sensors);
            // → '{"a":"baz","b":"foo","c":"bar"}'
            // console.log(arr1[5][0].lmsg.p)
            // console.log(arr1[5][0].lmsg.p)
            // homes.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            //test = [['4', '2'], ['3', '8'], ['3', '15'], ['2', '25'], ['1', '10'], ['3', '40']]
            //test.sort((a, b) => (b.price) - (a.price));
            //console.log(test)
            /*
            function math() {
                return Math.floor(Math.random() * 10);
            }
            arrD = [Array(2).fill(0).map(math)];
            arrD1 = [Array(2).fill(0).map(math)];
            arrDres = [];
            arrDres.push(arrD, arrD1)
            console.log(arrD)*/
            view(sensors)
            console.log(sensors)
        });

}


function liCreate() {
    count = 100;
    for (i = 0; i < count; i++) {
        let li = document.createElement('li');
        li.className = "msg";
        obo.append(li);
    }
}
liCreate()


function view(arr) {
    const msg = document.querySelectorAll('.msg')
    arg = msg
    //  console.log(arg)
    arr.forEach((el, index) => {
        arg[index].textContent = `${el[0]}:${el[1]}`
    })
    //console.log(arr)
    //console.log(arg)
    msgAct(arg)
}
/*
fetch('/db')
    .then(response => response.json())
    .then(json => console.log(json))
*/

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


function sensor() {
    btnsens.forEach(e =>
        e.addEventListener('click', () => {
            btnsens.forEach(el => {
                obo.style.display = 'none';
                titleSens.style.display = 'none';
                el.classList.remove('actBTN')
            })
            e.classList.add('actBTN')
            obo.style.display = 'flex';
            titleSens.style.display = 'block';
        }))
}

let counter;
const t = [];
const p = [];

function fnt() {

    tiresLink.forEach(it => {
        if (it.classList.contains('tiresActiv') && btnsens[0].classList.contains('actBTN')) {
            iterValue = [...counter.textContent]
            iterValue.forEach(el => {
                if (el === ':') {
                    value = iterValue.splice(iterValue.indexOf(el) + 1, iterValue.length - 1).join('')
                }
            })
            console.log(value)
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
        arrAct = [...e.textContent]

        arrAct.forEach(el => {
            if (el === ':') {
                value = arrAct.splice(arrAct.indexOf(el) + 1, arrAct.length - 1).join('')
                //counter = value;

                //console.log(value)
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


/*
const funcRandom = (el1, el2) => {
    const alls = document.querySelectorAll('.tiresD733');
    const allsT = document.querySelectorAll('.tiresT733');
    alls.forEach((elem, index) => {
        if (el1[index] !== -348201.3876) {
            elem.style.background = objColor[generFront(el1[index])];
            localStorage.setItem('id', elem.style.background);
            elem.textContent = parseFloat(el1[index]).toFixed(1) + '\nБар';
        }
        else {
            elem.textContent = '-';
            elem.style.background = localStorage.getItem('id');
        }
    })
    allsT.forEach(function (elem, index) {
        if (el2[index] == -348201.3876 || el2[index] == -128) {
            elem.style.background = localStorage.getItem('id2');
            elem.textContent = '-';
        }
        else {
            elem.style.background = objColor[generT(el2[index])];
            localStorage.setItem('id2', elem.style.background);
            elem.textContent = el2[index] + '°';
        }
    })
}*/



function chrt1(arr) {
    const config = {
        type: 'line',
        data: {
            datasets: [{
                data: arr,
                label: 'Скорость',
                fill: false,
                borderColor: 'green',
                yAxisID: 'left-y-axis',
                pointRadius: 1,
                borderWidth: 1,
                pointBorderWidth: 0.01,
                pointBackgroundColor: 'green'
            }],
            labels: arrIterTimeDateT
        },
        options: {
            plugins: {
                datalabels: {
                    display: false,
                },
                legend: {
                    labels: {
                        font: {
                            size: 15,
                        },
                        color: 'gray'
                    }
                },

            },
            scales: {
                'left-y-axis': {
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 100,
                    lineWidth: 1,
                    ticks: {

                        font: {

                            size: 15,
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 1
                        }
                    }
                }
            },
        }
    };
    console.log(arr)
    let chart = Chart.getChart('myChartg1'); // Pass the canvas ID

    if (chart) {
        chart.data.labels = arrIterTimeDateT;
        chart.data.datasets[0].data = arr;
        chart.update();
    } else {
        new Chart('myChartg1', config)
    }

}


