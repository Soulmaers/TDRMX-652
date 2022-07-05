
/*
function foo() {
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('POST', 'https://hst-api.wialon.com/wialon/ajax.html?svc=token/login&params={%22token%22:%220f481b03d94e32db858c7bf2d84152041F49949D880D9189DE1A3C3E3E554FA5D7F4B74C%22}');

    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    return console.log(httpRequest.responseText);
}
foo()
*/
// wialon api запросы

//localStorage.getItem('name');
//console.log(localStorage.getItem('name'));
//console.log(localStorage.getItem('name'));




function init() {
    wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");
    wialon.core.Session.getInstance().loginToken("0f481b03d94e32db858c7bf2d8415204289C57FB5B35C22FC84E9F4ED84D5063558E1178", "", // try to login
        function (code) {
            if (code) {
                return;
            }
            getMainInfo();
            setInterval(getMainInfo, 2000);
        });
};
init();
function getMainInfo() {
    wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com"); // get instance of current Session
    var prms1 = {
        "unitId": 25594204,
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
            arrayD.push(arr[8]); arrayD.push(arr[7]); arrayD.push(arr[6]); arrayD.push(arr[3]);
            arrayD.push(arr[5]); arrayD.push(arr[4]); arrayD.push(arr[25]); arrayD.push(arr[25]);
            arrayT = [];
            arrayT.push(arr[18]); arrayT.push(arr[17]); arrayT.push(arr[14]); arrayT.push(arr[16]);
            arrayT.push(arr[13]); arrayT.push(arr[15]); arrayT.push(arr[10]); arrayT.push(arr[12]);
            arrayT.push(arr[11]); arrayT.push(arr[19]); arrayT.push(arr[28]); arrayT.push(arr[27]);

            funcRandom(arrayD, arrayT);
            tiresOs(arrayD);
            go(arrayD, arrayT);
            //return window['arrayD'] = arrayD, arrayT, arr
        });

    const flags = 1 + 1025
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
            check = arr1[5][1].lmsg.p.pwr_ext;
            chekOut = check.toFixed(1);
            akb(chekOut);
        });

}

//выводим бортовое питание
function akb(elem) {
    akbVt = document.querySelector('.akbText');
    akbVt.textContent = elem + 'V';


}
//подсветка оси
function tiresOs(arr) {
    arrFront = arr.slice(0, 2);
    arrCenter = arr.slice(2, 6);
    arrRear1 = arr.slice(6, 8);
    arrRear2 = arr.slice(8, 10);
    arrRear3 = arr.slice(10, 12);
    tiresTest(arrFront, arrCenter, arrRear1, arrRear2, arrRear3)
}
function tiresTest(arr1, arr2, arr3, arr4, arr5) {
    lowDiv = document.querySelectorAll('.lowDiv ');

    if (arr1[0] >= 8 && arr1[0] <= 9 || arr1[1] >= 8 && arr1[1] <= 9) {
        lowDiv[0].style.backgroundColor = '#3eb051'
    }
    if (arr1[0] >= 7.5 && arr1[0] < 8 || arr1[0] > 9 && arr1[0] <= 13 || arr1[1] >= 7.5 && arr1[1] < 8 || arr1[1] > 9 && arr1[1] <= 13) {
        lowDiv[0].style.backgroundColor = '#9ba805'
    }
    if (arr1[0] > -100 && arr1[0] < 7.5 || arr1[0] > 13 || arr1[1] > -100 && arr1[1] < 7.5 || arr1[1] > 13) {
        lowDiv[0].style.backgroundColor = '#e03636'
    }
    if (arr3[0] >= 9 && arr3[0] <= 12 || arr3[1] >= 9 && arr3[1] <= 12) {
        lowDiv[2].style.backgroundColor = '#3eb051'
    }
    if (arr3[0] >= 8 && arr3[0] < 9 || arr3[0] > 12 && arr3[0] <= 13 || arr3[1] >= 8 && arr3[1] < 9 || arr3[1] > 12 && arr3[1] <= 13) {
        lowDiv[2].style.backgroundColor = '#9ba805'
    }
    if (arr3[0] > -100 && arr3[0] < 8 || arr3[0] > 13 || arr3[1] > -100 && arr3[1] < 8 || arr3[1] > 13) {
        lowDiv[2].style.backgroundColor = '#e03636'
    }
    if (arr4[0] >= 9 && arr4[0] <= 12 || arr4[1] >= 9 && arr4[1] <= 12) {
        lowDiv[3].style.backgroundColor = '#3eb051'
    }
    if (arr4[0] >= 8 && arr4[0] < 9 || arr4[0] > 12 && arr4[0] <= 13 || arr4[1] >= 8 && arr4[1] < 9 || arr4[1] > 12 && arr4[1] <= 13) {
        lowDiv[3].style.backgroundColor = '#9ba805'
    }
    if (arr4[0] > -100 && arr4[0] < 8 || arr4[0] > 13 || arr4[1] > -100 && arr4[1] < 8 || arr4[1] > 13) {
        lowDiv[3].style.backgroundColor = '#e03636'
    }
    if (arr5[0] >= 9 && arr5[0] <= 12 || arr5[1] >= 9 && arr5[1] <= 12) {
        lowDiv[4].style.backgroundColor = '#3eb051'
    }
    if (arr5[0] >= 8 && arr5[0] < 9 || arr5[0] > 12 && arr5[0] <= 13 || arr5[1] >= 8 && arr5[1] < 9 || arr5[1] > 12 && arr5[1] <= 13) {
        lowDiv[4].style.backgroundColor = '#9ba805'
    }
    if (arr5[0] > -100 && arr5[0] < 8 || arr5[0] > 13 || arr5[1] > -100 && arr5[1] < 8 || arr5[1] > 13) {
        lowDiv[4].style.backgroundColor = '#e03636'
    }
    if (arr2[0] >= 8 && arr2[0] <= 9 || arr2[1] >= 8 && arr2[1] <= 9 || arr2[2] >= 8 && arr2[2] <= 9
        || arr2[2] >= 8 && arr2[2] <= 9 || arr2[3] >= 8 && arr2[3] <= 9 || arr2[3] >= 8 && arr2[3] <= 9) {
        lowDiv[1].style.backgroundColor = '#3eb051'
    }
    if (arr2[0] >= 7.5 && arr2[0] < 8 || arr2[0] > 9 && arr2[0] <= 13 || arr2[1] >= 7.5 && arr2[1] < 8 || arr2[1] > 9 && arr2[1] <= 13
        || arr2[2] >= 7.5 && arr2[2] < 8 || arr2[2] > 9 && arr2[2] <= 13 || arr2[3] >= 7.5 && arr2[3] < 8 || arr2[3] > 9 && arr2[3] <= 13) {
        lowDiv[1].style.backgroundColor = '#9ba805'
    }
    if (arr2[0] > -100 && arr2[0] < 7.5 || arr2[0] > 13 || arr2[1] > -100 && arr2[1] < 7.5 || arr2[1] > 13
        || arr2[2] > -100 && arr2[2] < 7.5 || arr2[2] > 13 || arr2[3] > -100 && arr2[3] < 7.5 || arr2[3] > 13) {
        lowDiv[1].style.backgroundColor = '#e03636'
    }

}
//условия для подсветки шин D и T
function generFront(el) {
    let generatedValue;
    if (el >= 8 && el <= 9)
        generatedValue = 3;
    if (el >= 7.5 && el < 8 || el > 9 && el <= 13)
        generatedValue = 2;
    if (el > -100 && el < 7.5 || el > 13 || el === -348201.3876)
        generatedValue = 1;
    return generatedValue;
};
function generRear(el) {
    let generatedValue;
    if (el >= 9 && el <= 12)
        generatedValue = 3;
    if (el > 8 && el < 9 || el > 12 && el <= 13)
        generatedValue = 2;
    if (el > -100 && el < 8 || el > 13 || el === -348201.3876)
        generatedValue = 1;
    return generatedValue;
};

function generT(el) {
    let generatedValue;
    if (el >= 33 && el <= 38)
        generatedValue = 3;
    if (el >= 32 && el < 33 || el > 38 && el <= 39)
        generatedValue = 2;
    if (el >= -1000 && el < 32 || el > 39 || el === -348201.3876)
        generatedValue = 1;
    return generatedValue;
};
//создаем объект где ключ-результат условия, а свойства - соответсующее условию значение
const objColor = {
    1: '#e03636',
    2: '#9ba805',
    3: '#3eb051'
}
//кладем значения в каждое колесо

const funcRandom = (el1, el2) => {
    const alls = document.querySelectorAll('.tiresD733');
    const allsRear = document.querySelectorAll('.tiresD7333');
    const allsT = document.querySelectorAll('.tiresT733');
    // logic733(el1, el2);

    //const logic733 = (el1, el2) => {
    arrTiresFront = el1.slice(0, 6);
    arrTiresRear = el1.slice(6, 12);

    alls.forEach(function (elem, index) {
        if (arrTiresFront[index] === -348201.3876) {
            elem.textContent = '-';
            // localStorage.setItem('name', elem.textContent)
            // localStorage.getItem('name');
            // console.log(localStorage.getItem('name'));
        }
        else {
            elem.textContent = parseFloat(arrTiresFront[index]) + '\nБар';
            // localStorage.setItem('name', elem.textContent);
            // localStorage.getItem('name');
            //console.log(localStorage.getItem('name'));
        }
    });
    allsRear.forEach(function (elem, index) {
        if (arrTiresRear[index] === -348201.3876) {
            elem.textContent = '-';
        }
        else {
            elem.textContent = parseFloat(arrTiresRear[index]) + '\nБар';
        }
    })
    allsT.forEach(function (elem, index) {
        if (el2[index] == -348201.3876 || el2[index] == -128) {
            elem.textContent = '-';
        }
        else {
            elem.textContent = el2[index] + '°';
        }
    })
    alls.forEach(function (elem, index) {
        elem.style.background = objColor[generFront(arrTiresFront[index])];

    })
    allsRear.forEach(function (elem, index) {
        elem.style.background = objColor[generRear(arrTiresRear[index])];

    })
    allsT.forEach(function (elem, index) {
        elem.style.background = objColor[generT(el2[index])];
    })
}


/*
function math() {
    return Math.floor(Math.random() * 11);
}

arrtests = [[], [], [], [], [], []];

const alls = document.querySelectorAll('.tiresD733');
function got() {
    arrDDD = Array(6).fill(0).map(math);
    arrDDD.forEach((el, index) => {
        arrtests[index].push(el);
    })
    alls.forEach(function (elem, index) {
        if (arrtests[index][arrtests[index].length - 1] === 8 && arrtests[index][arrtests[index].length - 2] !== 8) {
            elem.style.background = objColor[generFront(arrtests[index][arrtests[index].length - 2])];
        } if (arrtests[index][arrtests[index].length - 1] !== 8 && arrtests[index][arrtests[index].length - 2] === 8) {
            elem.style.background = objColor[generFront(arrtests[index][arrtests[index].length - 1])];
        }
        if (arrtests[index][arrtests[index].length - 1] !== 8 && arrtests[index][arrtests[index].length - 2] !== 8) {
            elem.style.background = objColor[generFront(arrtests[index][arrtests[index].length - 1])];
        } if (arrtests[index][arrtests[index].length - 1] === 8 && arrtests[index][arrtests[index].length - 2] === 8) {
            return false
        }
    })

    return console.log(arrtests[0]);
}
got();
//setInterval(got, 2000);
*/


const tires_link = document.querySelectorAll('.tires_link');
const arrTireslink = Array.from(tires_link);


//проваливаемся в колесо
arrTireslink.forEach(function (elem, index) {
    elem.addEventListener('click', tiresActive);
    function tiresActive() {
        arrTireslink.forEach(function (elem, index) {
            tD = document.querySelectorAll('.tiresD');
            tT = document.querySelectorAll('.tiresT');
            elem = tD[index].classList.remove('tiresActiveD');
            elem = tT[index].classList.remove('tiresActiveT');
            inp = document.querySelectorAll('.techForm')
            elem = inp[index].classList.remove('techForm_active');
        })
        inpInfo = document.querySelector('.techInfo')
        inpInfo.style.display = 'block';
        inp = document.querySelectorAll('.techForm')
        elem = inp[index].classList.toggle('techForm_active');
        tD = document.querySelectorAll('.tiresD');
        tT = document.querySelectorAll('.tiresT');
        elem = tD[index].classList.toggle('tiresActiveD');
        elem = tT[index].classList.toggle('tiresActiveT');
        wrapperDash = document.querySelector('.wrapper_right_dash')
        wrapperDash.style.display = 'none';
        grafik = document.querySelector('.grafik');
        grafik.style.display = 'block';
        tiresLinkfunc(elem, index);
    }
    local();
});

//сохраняем изменения в localstorage
function local() {
    const inpInput = document.querySelectorAll('.techInput')
    inpInput.forEach(el => {
        el.addEventListener('input', checkValidity)
        function checkValidity() {
            localStorage.setItem(id, el.value);
        }
        const id = el.getAttribute('id');
        el.value = localStorage.getItem(id);
    })
}

//добавляем значения в график давления и темп и запускаем график
function tiresLinkfunc(elem, index) {
    function tiresGrafik() {
        elem = arrAll1[index];
        davl = elem;
        elem = arrAll2[index];
        davl2 = elem;
        return davl, davl2;
    }
    tiresGrafik(arrAll1)
    tiresGrafik(arrAll2)
    //графики
    chrt();
}



function chrt() {
    Chart.register(ChartDataLabels);
    myChartg = new Chart(myChartg, {
        type: 'line',
        data: {
            datasets: [{
                data: davl,
                label: 'Давление',
                fill: false,
                borderColor: 'lightgreen',
                yAxisID: 'left-y-axis'
            }, {
                data: davl2,
                label: 'Температура',
                fill: false,
                borderColor: 'lightblue',
                yAxisID: 'right-y-axis'
            }],
            labels: arrTime
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 12,
                        },
                        color: 'gray'
                    }
                }
            },
            scales: {
                'left-y-axis': {
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 12,
                    ticks: {
                        font: {
                            size: 15,
                        }
                    }
                },
                'right-y-axis': {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    max: 50,
                    ticks: {
                        font: {
                            size: 15,
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 8
                        }
                    }
                }
            },
        }
    });

    const upDia = () => {
        myChartg.data.datasets[0].data = davl;
        myChartg.data.datasets[1].data = davl2;
        myChartg.update();
    }
    setInterval(upDia, 100);
}

const arrAll1 = [[], [], [], [], [], [], [], [], [], [], [], []];
const arrAll2 = [[], [], [], [], [], [], [], [], [], [], [], []];
arrTime = [];

function getNowtime1() {
    let now = new Date();
    let hours = now.getHours();
    if (now.getHours() < 10) {
        hours = "0" + hours;
    }
    let minutes = now.getMinutes();
    if (now.getMinutes() < 10) {
        minutes = "0" + minutes;
    }
    let seconds = now.getSeconds();
    if (now.getSeconds() < 10) {
        seconds = "0" + seconds;
    }
    let nowTime = (`${hours}:${minutes}:${seconds}`);
    return nowTime;
}



function go(item1, item2) {
    arrTime.push(getNowtime1());
    //arrDate = arrTime.slice(-10);
    item1.forEach((el, index) => {
        arrAll1[index].push(parseFloat(el.toFixed(0)));
    })
    item2.forEach((el, index) => {
        arrAll2[index].push(parseFloat(el.toFixed(0)));
    })
    return arrAll1, arrAll2;
}



function dashDav() {
    const arrTiresFront = arrayD.slice(0, 6);
    const arrTiresRear = arrayD.slice(6, 12);
    countRed = 0;
    countYellow = 0;
    countGreen = 0;
    arrTiresFront.forEach((el) => {
        if (el >= 8 && el <= 9) {
            countGreen++
        }
        if (el >= 7.5 && el < 8 || el > 9 && el <= 13) {
            countYellow++
        }
        if (el > -100 && el < 7.5 || el > 13 || el === -348201.3876) {
            countRed++
        }
    })
    arrTiresRear.forEach((el) => {
        if (el >= 9 && el <= 12) {
            countGreen++
        }
        if (el > 8 && el < 9 || el > 12 && el <= 13) {
            countYellow++
        }
        if (el > -100 && el < 8 || el > 13 || el === -348201.3876) {
            countRed++
        }
    })
    resultRed = Math.round(countRed / arrayD.length * 100);
    resultYellow = Math.round(countYellow / arrayD.length * 100);
    resultGreen = Math.round(countGreen / arrayD.length * 100);
    return arrD = [resultRed, resultYellow, resultGreen];
}


Chart.register(ChartDataLabels);
const ctx = document.getElementById('myChart').getContext('2d');
chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Критически',
            'Повышенное/Пониженное',
            'Норма'
        ],
        datasets: [{
            label: 'Дашбоард',
            data: setInterval(dashDav, 2000),
            backgroundColor: [
                '#e03636',
                '#9ba805',
                '#3eb051'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 10
                    }
                }
            },
            datalabels: {
                color: '#423737',
                textAlign: 'center',
                font: {
                    size: 16,
                    lineHeight: 1.6
                },
                formatter: function (value) {
                    return value + '%';
                }
            }
        }
    }
});

function dashDat() {
    const arrDall = arrayT;
    countRed = 0;
    countYellow = 0;
    countGreen = 0;
    arrDall.forEach((el) => {
        if (el >= 33 && el <= 38) {
            countGreen++
        }
        if (el >= 32 && el < 33 || el > 38 && el <= 39) {
            countYellow++
        }
        if (el >= -1000 && el < 32 || el > 39 || el === -348201.3876) {
            countRed++
        }
    })
    resultRed = Math.round(countRed / arrDall.length * 100);
    resultYellow = Math.round(countYellow / arrDall.length * 100);
    resultGreen = Math.round(countGreen / arrDall.length * 100);
    return arrT = [resultRed, resultYellow, resultGreen];
}

const ctx2 = document.getElementById('myChart2').getContext('2d');
const chart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: [
            'Критически',
            'Повышенное/Пониженное',
            'Норма'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: setInterval(dashDat, 2000),
            backgroundColor: [
                '#e03636',
                '#9ba805',
                '#3eb051'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 10
                    }
                }
            },
            datalabels: {
                color: '#423737',
                textAlign: 'center',
                font: {
                    size: 16,
                    lineHeight: 1.6
                },
                formatter: function (value) {
                    return value + '%';
                }
            }
        }
    }
});

const upRender = () => {
    chart.data.datasets[0].data = arrD;
    chart2.data.datasets[0].data = arrT;
    chart.update();
    chart2.update();
}

setInterval(upRender, 2000);





