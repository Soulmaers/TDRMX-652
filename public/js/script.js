
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
            // go(arrayD, arrayT);
            //return window['arrayD'] = arrayD, arrayT, arr
        });


    /*
        var flags = 1 + 4096
        var prms = {
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
                //arrayD1 = arr.slice(0, 10);
                //arrayT1 = arr.slice(10, 20);
                // funcRandom(arrayD, arrayT);
                // go(arrayD, arrayT);
                // return window['arrayD'] = arrayD1, arrayT1, arr1
            });
    */
}


//проверяем условия
function generFront(el) {
    let generatedValue;
    if (el >= 8 && el <= 9)
        generatedValue = 3;
    if (el >= 7.5 && el < 8 || el > 9 && el <= 13)
        generatedValue = 2;
    if (el < 7.5 || el > 13)
        generatedValue = 1;
    return generatedValue;
};
function generRear(el) {
    let generatedValue;
    if (el >= 9 && el <= 12)
        generatedValue = 3;
    if (el > 8 && el < 9 || el > 12 && el <= 13)
        generatedValue = 2;
    if (el <= 8 || el > 13)
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
}/*
const time = document.querySelectorAll('.time');
const stat = document.querySelectorAll('.bg_stat');
time[0].textContent = getNowtime();*/
const funcRandom = (el1, el2) => {
    //кладем значения в каждое колесо
    logic733(el1, el2);
}
const logic733 = (el1, el2) => {
    arrTiresFront = el1.slice(0, 6);
    arrTiresRear = el1.slice(6, 12);
    const alls = document.querySelectorAll('.tiresD733');
    const allsRear = document.querySelectorAll('.tiresD7333');
    const allsT = document.querySelectorAll('.tiresT733');
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
            elem.textContent = el2[index] + '°C';
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

//текущее время
function getNowtime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    if (now.getMonth() < 10) {
        month = "0" + month;
    }
    let date = now.getDate();
    if (now.getDate() < 10) {
        date = "0" + date;
    }
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
    let nowTime = (`${date}-${month}-${year}   ${hours}:${minutes}:${seconds}`);
    return nowTime;
}

//рандомная дата
function randomDate(start, end) {
    return new Date(start.getTime()
        + Math.random() * (end.getTime() - start.getTime()));
}
const date01 = randomDate(new Date(2010, 0, 1), new Date()); const date02 = randomDate(new Date(2010, 0, 1), new Date());
const date03 = randomDate(new Date(2010, 0, 1), new Date()); const date04 = randomDate(new Date(2010, 0, 1), new Date());
const date05 = randomDate(new Date(2010, 0, 1), new Date()); const date06 = randomDate(new Date(2010, 0, 1), new Date());
const date07 = randomDate(new Date(2010, 0, 1), new Date()); const date08 = randomDate(new Date(2010, 0, 1), new Date());
const date09 = randomDate(new Date(2010, 0, 1), new Date()); const date10 = randomDate(new Date(2010, 0, 1), new Date());

const arrDates = [date01, date02, date03, date04, date05, date06, date07, date08, date09, date10];

function dataVunc() {
    arData = [];
    arrDates.forEach((elem) => {
        ar = (`${elem.getFullYear()}-${('0' + (elem.getMonth() + 1)).slice(-2)}-${('0' + elem.getDate()).slice(-2)}`);
        arData.push(ar);
        return arData;
    })
}
dataVunc()

function runTires() {
    return Math.floor(Math.random() * 10000);
}

const tires_link = document.querySelectorAll('.tires_link');
const arrTireslink = Array.from(tires_link);

//проваливаемся в колесо
/*
arrTireslink.forEach(function (elem, index) {
    elem.addEventListener('click', tiresActive);
    function tiresActive() {
        arrTireslink.forEach(function (elem, index) {
            tD = document.querySelectorAll('.tiresD');
            tT = document.querySelectorAll('.tiresT');
            elem = tD[index].classList.remove('tiresActiveD');
            elem = tT[index].classList.remove('tiresActiveT');
        })
        tD = document.querySelectorAll('.tiresD');
        tT = document.querySelectorAll('.tiresT');
        elem = tD[index].classList.toggle('tiresActiveD');
        elem = tT[index].classList.toggle('tiresActiveT');
        check = document.querySelector('.check')
        //check.style.display = 'none';
        dataActive = document.querySelector('.dataActive')
        dataActive.style.display = 'block';
        wCA = document.querySelector('.wrapper_containt')
        wCA.classList.add('wrapper_containt_active')
        grafik = document.querySelector('.grafik');
        grafik.style.display = 'block';
    }
 
});
 
arrTireslink.forEach((elem, index) => {
    elem.addEventListener('click', tiresLinkfunc);
    function tiresLinkfunc() {
        const dataMade = document.querySelector('.data_made');
        const probeg = document.querySelector('.probeg');
        const runShine = Array(10).fill(0).map(runTires);
        function tiresActivedatchik() {
            elem = runShine[index];
            probeg.textContent = elem + ' ' + 'км';
        }
        tiresActivedatchik();
        function dataMadefunc() {
            elem = arData[index];
            dataMade.textContent = elem;
        }
        dataMadefunc();
 
        function tiresGrafik() {
            elem = arrAll1[index];
            davl = elem;
            elem = arrAll2[index];
            davl2 = elem;
            return davl, davl2
        }
        tiresGrafik(arrAll1)
        tiresGrafik(arrAll2)
        //графики
        chrt();
    }
});
 
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
                            size: 20,
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
                            size: 18,
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
                            size: 18,
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 10
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
}*/
const arrAll1 = [[], [], [], [], [], [], [], [], [], []];
const arrAll2 = [[], [], [], [], [], [], [], [], [], []];
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
/*
function go(item1, item2) {
    arrTime.push(getNowtime1());
    item1.forEach((el, index) => {
        arrAll1[index].push(parseFloat(el.toFixed(0)));
    })
    item2.forEach((el, index) => {
        arrAll2[index].push(parseFloat(el.toFixed(0)));
    })
    return arrAll1, arrAll2
}*/





/*
function getSensors() { // construct sensors Select list for selected unit
    if (!$("#units").val()) { msg("Select unit"); return; } // exit if no unit selected
    $("#sensors").html("<option></option>"); // add first empty element
    var sess = wialon.core.Session.getInstance(); // get instance of current Session
    var unit = sess.getItem($("#units").val()); // get unit by id
    var sens = unit.getSensors(); // get unit's sensors
    for (var i in sens) // construct select list
        $("#sensors").append("<option value='" + sens[i].id + "'>" + sens[i].n + "</option>");
}
let result;
function getSensorInfo() { // get and show information about selected Sensor
    if (!$("#units").val()) { msg("Select unit"); return; } // exit if no unit selected
    if (!$("#sensors").val()) return; // exit if no unit selected
    var sess = wialon.core.Session.getInstance(); // get instance of current Session
    var unit = sess.getItem($("#units").val()); // get unit by id
    var sens = unit.getSensors($("#sensors").val()); // get sensor by id
    // calculate sensor value
    let result = unit.calculateSensorValue(sens, unit.getLastMessage());
    if (result == -348201.3876) result = "N/A"; // compare result with invalid sensor value constant
    // print result message
    console.log(sens);
    console.log(result);
    msg(result);
}*/



function dashDav() {
    const arrDall = arrayD;
    countRed = 0;
    countYellow = 0;
    countGreen = 0;
    arrDall.forEach((el) => {
        if (el >= 8 && el <= 10) {
            countGreen++
        }
        if (el >= 7 && el < 8 || el > 10 && el <= 11) {
            countYellow++
        }
        if (el >= -1000 && el < 7 || el > 11 || el === -348201.3876) {
            countRed++
        }
    })
    resultRed = Math.round(countRed / arrDall.length * 100);
    resultYellow = Math.round(countYellow / arrDall.length * 100);
    resultGreen = Math.round(countGreen / arrDall.length * 100);
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