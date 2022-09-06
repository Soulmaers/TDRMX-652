





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

function init() {
    wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");
    wialon.core.Session.getInstance().loginToken("0f481b03d94e32db858c7bf2d8415204289C57FB5B35C22FC84E9F4ED84D5063558E1178", "", // try to login
        function (code) {
            if (code) {
                return;
            }
            getMainInfo();
            grafTwo();
            setInterval(getMainInfo, 5000);
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
            arrayD.push(arr[5]); arrayD.push(arr[4]); arrayD.push(arr[25]); arrayD.push(arr[26]);
            arrayT = [];
            arrayT.push(arr[18]); arrayT.push(arr[17]); arrayT.push(arr[14]); arrayT.push(arr[16]);
            arrayT.push(arr[13]); arrayT.push(arr[15]); arrayT.push(arr[10]); arrayT.push(arr[12]);
            arrayT.push(arr[11]); arrayT.push(arr[19]); arrayT.push(arr[28]); arrayT.push(arr[27]);

            funcRandom(arrayD, arrayT);
            tiresFnProfil(arrayD);
            //tiresOs(arrayD);
            go(arrayD, arrayT);
            //got(arrayD);
            //return window['arrayD'] = arrayD, arrayT, arr
        });

    const flags = 1 + 1024
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
            odom = arr1[5][1].lmsg.p.mileage.toFixed(2);
            oil = ((arr1[5][1].lmsg.p.rs232fuel_level) / 163.8275).toFixed(2);
            document.querySelector('.title_two').textContent = arr1[5][1].nm;
            chekOut = check.toFixed(1);
            akb(chekOut);
            odomFn(odom);
            oilFn(oil);
        });

}



//выводим топливо
function oilFn(elem) {
    oilBenz = document.querySelector('.oilText');
    oilBenz.textContent = elem;

}
//выводим бортовое питание
function akb(elem) {
    akbVt = document.querySelector('.akbText');
    akbVt.textContent = elem + 'V';

}

//выводим одометр
function odomFn(elem) {
    odomOd = document.querySelectorAll('.odom');
    odomOd.forEach(item => {
        item.textContent = elem;
    })

}

const detaly = document.querySelector('.detaly');

detaly.addEventListener('click', detalyFn)
function detalyFn(e) {
    e.preventDefault();
    detalisation = document.querySelector('.detalisation');
    wrapperLeft = document.querySelector('.wrapper_left');
    wrapperRigth = document.querySelector('.wrapper_right');
    detalisation.style.display = 'flex';
    wrapperLeft.style.display = 'none';
    wrapperRigth.style.display = 'none';

}



/*
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
*/
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
function generRear(el) {
    let generatedValue;
    if (el >= 9 && el <= 12)
        generatedValue = 3;
    if (el > 8 && el < 9 || el > 12 && el <= 13)
        generatedValue = 2;
    if (el > -100 && el < 8 || el > 13)
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
//кладем значения в каждое колесо

const tiresFnProfil = (el1) => {
    arrFrontProfilres = el1.slice(0, 6);
    arrFrontProfil = [];
    arrFrontProfil.push(arrFrontProfilres[0]);
    arrFrontProfil.push(arrFrontProfilres[1]);
    arrFrontProfil.push(arrFrontProfilres[3]);
    arrFrontProfil.push(arrFrontProfilres[4]);
    arrFrontProfil.push(arrFrontProfilres[2]);
    arrFrontProfil.push(arrFrontProfilres[5]);

    arrRearProfil = el1.slice(6, 12);
    const frontTiresProfil = document.querySelectorAll('.tiresProfil');
    const rearTiresProfil = document.querySelectorAll('.tiresProfilr');

    frontTiresProfil.forEach((elem, index) => {
        elem.style.background = objColor[generFront(arrFrontProfil[index])];
    })
    rearTiresProfil.forEach((elem, index) => {
        elem.style.background = objColor[generRear(arrRearProfil[index])];
    })
}
const funcRandom = (el1, el2) => {
    const alls = document.querySelectorAll('.tiresD733');
    const allsRear = document.querySelectorAll('.tiresD7333');
    const allsT = document.querySelectorAll('.tiresT733');
    // logic733(el1, el2);

    //const logic733 = (el1, el2) => {
    arrTiresFront = el1.slice(0, 6);
    arrTiresRear = el1.slice(6, 12);

    alls.forEach((elem, index) => {
        if (arrTiresFront[index] !== -348201.3876) {
            elem.style.background = objColor[generFront(arrTiresFront[index])];
            localStorage.setItem('id', elem.style.background);
            elem.textContent = parseFloat(arrTiresFront[index]) + '\nБар';
        }
        else {
            elem.textContent = '-';
            elem.style.background = localStorage.getItem('id');
        }
    })

    allsRear.forEach(function (elem, index) {
        if (arrTiresRear[index] === -348201.3876) {
            elem.style.background = localStorage.getItem('id1');
            elem.textContent = '-';
        }
        else {
            elem.style.background = objColor[generRear(arrTiresRear[index])];
            localStorage.setItem('id1', elem.style.background);
            elem.textContent = parseFloat(arrTiresRear[index]) + '\nБар';
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
}

/*
function math() {
    return Math.floor(Math.random() * 5);
}*/


//arrtests = [[], [], [], [], [], [], [], [], [], [], [], []];



//arTTT = [[2, 3, 4, 5, 5, 5], [2, 3, 5, 2], [2, 3, 5, 4], [2, 5, 5, 3], [4, 5, 6, 7], [6, 7, 5, 4]]
/*function got(item1, item2) {

    //arrDDD = Array(12).fill(0).map(math);
    arrD = item1.slice(0, 6);
    arrRear = item1.slice(6, 12)

    // console.log(arTTT[0].lastIndexOf(!5));

    alls.forEach(function (elem, index) {
        if (arrD[index][arrD[index].length - 1] === -348201.3876 && arrD[index][arrD[index].length - 2] !== -348201.3876) {
            elem.style.background = objColor[generFront(arrD[index][arrD[index].length - 2])];
        } if (arrD[index][arrD[index].length - 1] !== -348201.3876 && arrD[index][arrD[index].length - 2] === -348201.3876) {
            elem.style.background = objColor[generFront(arrD[index][arrD[index].length - 1])];
        }
        if (arrD[index][arrD[index].length - 1] !== -348201.3876 && arrD[index][arrD[index].length - 2] !== -348201.3876) {
            elem.style.background = objColor[generFront(arrD[index][arrD[index].length - 1])];
        } if (arrD[index][arrD[index].length - 1] === 5 && arrD[index][arrD[index].length - 2] === 5) {
            arrD[index].reverse();
            arrD[index].forEach(el => {
                if (el !== -348201.3876) {
                    arrD[index][el] = el;
                    r = arrD[index][el]
                    elem.style.background = objColor[generFront(r)];
                    //arTTT[0][el] = el;
                    return arrD[index].reverse();
                }

            })
        }
    })
    allsRear.forEach(function (elem, index) {
        if (arrRear[index][arrRear[index].length - 1] === -348201.3876 && arrRear[index][arrRear[index].length - 2] !== -348201.3876) {
            elem.style.background = objColor[generRear(arrRear[index][arrRear[index].length - 2])];
        } if (arrRear[index][arrRear[index].length - 1] !== -348201.3876 && arrRear[index][arrRear[index].length - 2] === -348201.3876) {
            elem.style.background = objColor[generRear(arrRear[index][arrRear[index].length - 1])];
        }
        if (arrRear[index][arrRear[index].length - 1] !== -348201.3876 && arrRear[index][arrRear[index].length - 2] !== -348201.3876) {
            elem.style.background = objColor[generRear(arrD[index][arrD[index].length - 1])];
        } if (arrRear[index][arrRear[index].length - 1] === -348201.3876 && arrRear[index][arrRear[index].length - 2] === -348201.3876) {
            arrRear[index].reverse();
            arrRear[index].forEach(el => {
                if (el !== -348201.3876) {
                    arrRear[index][el] = el;
                    t = arrRear[index][el]
                    elem.style.background = objColor[generRear(t)];
                    //arTTT[0][el] = el;
                    return arrRear[index].reverse();
                }

            })
        }
    })
    allsT.forEach(function (elem, index) {
        if (item2[index][item2[index].length - 1] === -348201.3876 && item2[index][item2[index].length - 2] !== -348201.3876) {
            elem.style.background = objColor[generT(item2[index][item2[index].length - 2])];
        } if (item2[index][item2[index].length - 1] !== -348201.3876 && item2[index][item2[index].length - 2] === -348201.3876) {
            elem.style.background = objColor[generT(item2[index][item2[index].length - 1])];
        }
        if (item2[index][item2[index].length - 1] !== -348201.3876 && item2[index][item2[index].length - 2] !== -348201.3876) {
            elem.style.background = objColor[generT(item2[index][item2[index].length - 1])];
        } if (item2[index][item2[index].length - 1] === -348201.3876 && item2[index][item2[index].length - 2] === -348201.3876) {
            item2[index].reverse();
            item2[index].forEach(el => {
                if (el !== -348201.3876) {
                    item2[index][el] = el;
                    temp = item2[index][el]
                    elem.style.background = objColor[generT(temp)];
                    //arTTT[0][el] = el;
                    return item2[index].reverse();
                }

            })
        }
    })

}
*/

const tires_link = document.querySelectorAll('.tires_link');
const arrTireslink = Array.from(tires_link);

//проваливаемся в колесо
arrTireslink.forEach(function (elem, index) {
    elem.addEventListener('click', tiresActive);
    function tiresActive() {

        validation = document.querySelectorAll('validation')
        validation.forEach(el => {
            el.addEventListener("keyup", function () {
                this.value = this.value.replace(/[^\d]/g, "");
            });

        })
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
        leftwidjet = document.querySelector('.left_widjet')
        leftwidjet.style.display = 'flex';
        wrapperDash = document.querySelector('.wrapper_right_dash')
        wrapperDash.style.display = 'none';
        grafik = document.querySelector('.grafik');
        grafik.style.display = 'block';
        btn24 = document.querySelector('.btn24');
        btn24.style.display = 'block';



        tiresLinkfunc(elem, index);
        grafTwo()
        calcPSI();
    }
    local();

});

btn24 = document.querySelector('.btn24');
btn24.addEventListener('click', modal)
function modal() {
    grafik1 = document.querySelector('.grafik1');
    if (grafik1.style.display === 'block') {
        grafik1.style.display = 'none';
    } else {
        grafik1.style.display = 'block';
    }
}


function grafTwo() {
    let nowDate = Math.round(new Date().getTime() / 1000)
    let nDate = new Date();
    let timeFrom = Math.round(nDate.setHours(nDate.getHours() - 24) / 1000);

    const prms2 = {
        "itemId": 25594204,
        "timeFrom": timeFrom,//1657205816,
        "timeTo": nowDate,//2757209816,
        "flags": 1,
        "flagsMask": 65281,
        "loadCount": 8271
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
            arrIterTimeDateT = arrIterTimeDate.filter(e => (++t) % 8 === 0);

        });


    const prms3 = {
        "source": "",
        "indexFrom": 0,
        "indexTo": 8271,
        "unitId": 25594204,
        "sensorId": 0
    };
    const remote3 = wialon.core.Remote.getInstance();
    remote3.remoteCall('unit/calc_sensors', prms3,
        function (code, result) {
            if (code) {
                console.log(wialon.core.Errors.getErrorText(code));
            }

            arr3 = Object.values(result);
            arrIter = [];
            arrIterT = [];
            //array24D = [];
            for (let subArr in arr3) {
                arsss = Object.values(arr3[subArr]);
                arChange = [];
                arChangeT = [];
                arChange.push(arsss[0]); arChange.push(arsss[2]); arChange.push(arsss[1]); arChange.push(arsss[9]);
                arChange.push(arsss[8]); arChange.push(arsss[7]); arChange.push(arsss[6]); arChange.push(arsss[3]);
                arChange.push(arsss[5]); arChange.push(arsss[4]); arChange.push(arsss[25]); arChange.push(arsss[26]);
                arrIter.push(arChange)

                arChangeT.push(arsss[18]); arChangeT.push(arsss[17]); arChangeT.push(arsss[14]); arChangeT.push(arsss[16]);
                arChangeT.push(arsss[13]); arChangeT.push(arsss[15]); arChangeT.push(arsss[10]); arChangeT.push(arsss[12]);
                arChangeT.push(arsss[11]); arChangeT.push(arsss[19]); arChangeT.push(arsss[28]); arChangeT.push(arsss[27]);
                arrIterT.push(arChangeT)
                let i = 0;
                arrIter24 = arrIter.filter(e => (++i) % 8 === 0);
                let i2 = 0;
                arrIter24T = arrIterT.filter(e => (++i2) % 8 === 0);


            }

            //arrIter.map((arr) => { arr.splice(10, 15); arr.splice(12, 2); });
            /*
            arrIter.map((arr) => { arr.splice(10, 15); arr.splice(12, 2); });
            let i = 0;
            arrIter24 = arrIter.filter(e => (++i) % 8 === 0);
            //console.log(arrIter);
            arrIterT.map((arr) => { arr.splice(0, 10); arr.splice(10, 7); });
            let i2 = 0;
            arrIter24T = arrIterT.filter(e => (++i2) % 8 === 0);
            //console.log(arrIter);*/

            arrIterDav = new Array(12);
            arrIterDav[0] = new Array();
            arrIterDav[1] = new Array();
            arrIterDav[2] = new Array();
            arrIterDav[3] = new Array();
            arrIterDav[4] = new Array();
            arrIterDav[5] = new Array();
            arrIterDav[6] = new Array();
            arrIterDav[7] = new Array();
            arrIterDav[8] = new Array();
            arrIterDav[9] = new Array();
            arrIterDav[10] = new Array();
            arrIterDav[11] = new Array();

            arrIter24.forEach(el => {
                arrIterDav[0].push(el[0]);
                arrIterDav[1].push(el[1]);
                arrIterDav[2].push(el[2]);
                arrIterDav[3].push(el[3]);
                arrIterDav[4].push(el[4]);
                arrIterDav[5].push(el[5]);
                arrIterDav[6].push(el[6]);
                arrIterDav[7].push(el[7]);
                arrIterDav[8].push(el[8]);
                arrIterDav[9].push(el[9]);
                arrIterDav[10].push(el[10]);
                arrIterDav[11].push(el[11]);

            })
            arrIterDavT = new Array(12);
            arrIterDavT[0] = new Array();
            arrIterDavT[1] = new Array();
            arrIterDavT[2] = new Array();
            arrIterDavT[3] = new Array();
            arrIterDavT[4] = new Array();
            arrIterDavT[5] = new Array();
            arrIterDavT[6] = new Array();
            arrIterDavT[7] = new Array();
            arrIterDavT[8] = new Array();
            arrIterDavT[9] = new Array();
            arrIterDavT[10] = new Array();
            arrIterDavT[11] = new Array();

            arrIter24T.forEach(el => {
                arrIterDavT[0].push(el[0]);
                arrIterDavT[1].push(el[1]);
                arrIterDavT[2].push(el[2]);
                arrIterDavT[3].push(el[3]);
                arrIterDavT[4].push(el[4]);
                arrIterDavT[5].push(el[5]);
                arrIterDavT[6].push(el[6]);
                arrIterDavT[7].push(el[7]);
                arrIterDavT[8].push(el[8]);
                arrIterDavT[9].push(el[9]);
                arrIterDavT[10].push(el[10]);
                arrIterDavT[11].push(el[11]);

            })

        });


}


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

//считаем разницу значений и выводим бары и км
function calcPSI() {
    inputPSI = document.querySelectorAll('.jobDav')
    inputBar = document.querySelectorAll('.bar')

    inputBarLeft = document.querySelectorAll('.br')
    inputToProb = document.querySelectorAll('.toProb');
    inputPassprob = document.querySelectorAll('.passProb');
    inputResProb = document.querySelectorAll('.resProb');

    inputPassprob.forEach((el2, index) => {
        inputResProb[index].textContent = el2.value - inputToProb[index].value;
        el2.addEventListener('input', () => {
            inputResProb[index].textContent = el2.value - inputToProb[index].value;
        })
    })
    inputToProb.forEach((el2, index) => {
        inputResProb[index].textContent = inputPassprob[index].value - el2.value;
        el2.addEventListener('input', () => {
            inputResProb[index].textContent = inputPassprob[index].value - el2.value;
        })
    })
    inputPSI.forEach((el, index) => {
        el.addEventListener('input', valPSI)
        function valPSI() {
            inputBar[index].textContent = (el.value / 14.504).toFixed(1);
            localStorage.setItem(id, inputBar[index].textContent);

        }
        const id = inputBar[index].getAttribute('id');
        inputBar[index].textContent = localStorage.getItem(id);

    })


}

//добавляем значения в график давления и темп и запускаем график
function tiresLinkfunc(elem, index) {
    function tiresGrafik() {
        elem = arrAll1[index];
        davl = elem;

        //dav10 = davl.slice(-10);
        elem = arrAll2[index];
        davl2 = elem;

        return davl, davl2;
    }
    tiresGrafik(arrAll1, arrAll2)

    function tiresGrafik24() {
        elem = arrIterDav[index];
        davl24 = elem;

        //dav10 = davl.slice(-10);
        elem = arrIterDavT[index];
        davl224 = elem;
        return davl24, davl224;
    }
    tiresGrafik24(arrIterDav, arrIterDavT)

    // tiresGrafik(arrAll2)
    //графики
    chrt();
    chrt1();
}




function chrt() {

    //Chart.register(ChartDataLabels);
    myChartg = new Chart(myChartg, {
        type: 'line',
        data: {
            datasets: [{
                data: davl,
                label: 'Давление',
                fill: false,
                borderColor: 'green',
                yAxisID: 'left-y-axis',
                pointRadius: 1,
                borderWidth: 1,
                pointBorderWidth: 0.01,
                pointBackgroundColor: 'green'
            }, {
                data: davl2,
                label: 'Температура',
                fill: false,
                borderColor: 'blue',
                yAxisID: 'right-y-axis',
                pointRadius: 1,
                borderWidth: 1,
                pointBorderWidth: 0.01,
                pointBackgroundColor: 'blue'
            }],
            labels: arrTime
        },
        options: {
            plugins: {

                legend: {
                    labels: {
                        font: {
                            size: 15,
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
                    max: 14,
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
                    max: 60,
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
        myChartg.data.datasets[0].data = davl.slice(-10);
        myChartg.data.datasets[1].data = davl2.slice(-10);
        myChartg.data.labels = arrTime.slice(-10);
        myChartg.update();
    }
    setInterval(upDia, 2000);
}


function chrt1() {
    // Chart.unregister(ChartDataLabels);
    //  Chart.register(ChartDataLabels);
    //Chart.defaults.global.tooltips.enabled = false;
    myChartg1 = new Chart(myChartg1, {
        type: 'line',
        data: {

            datasets: [{
                data: davl24,
                label: 'Давление',
                fill: false,
                borderColor: 'green',
                yAxisID: 'left-y-axis',
                pointRadius: 1,
                borderWidth: 1,
                pointBorderWidth: 0.01,
                pointBackgroundColor: 'green'
            }, {
                data: davl224,
                label: 'Температура',
                fill: false,
                borderColor: 'blue',
                yAxisID: 'right-y-axis',
                pointRadius: 1,
                borderWidth: 1,
                pointBorderWidth: 0.01,
                pointBackgroundColor: 'blue'
            }],
            labels: arrIterTimeDateT

        },

        //Chart1.Series["ИмяГрафика"]["PieLabelStyle"] = "Disabled"
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
                    max: 14,
                    lineWidth: 1,
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
                    max: 60,
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
    });

    const upDia1 = () => {
        myChartg1.data.datasets[0].data = davl24;
        myChartg1.data.datasets[1].data = davl224;
        //myChartg1.data.labels = arrTime;
        myChartg1.update();
    }
    //upDia1();
    setInterval(upDia1, 1500);
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
    //got(arrAll1, arrAll2)
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
            data: setInterval(dashDav, 1000),
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
        if (el >= -50 && el <= 35) {
            countGreen++
        }

        if (el >= 36 || el === -348201.3876) {
            countRed++
        }
    })
    resultRed = Math.round(countRed / arrDall.length * 100);
    //resultYellow = Math.round(countYellow / arrDall.length * 100);
    resultGreen = Math.round(countGreen / arrDall.length * 100);
    return arrT = [resultRed, resultGreen];
}

const ctx2 = document.getElementById('myChart2').getContext('2d');
const chart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: [
            'Критически',

            'Норма'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: setInterval(dashDat, 1000),
            backgroundColor: [
                '#e03636',
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

setInterval(upRender, 1500);




//const rrr = [[], [], []]

/*
var rrr = new Array(3);//Создание массива на 3 элемента
rrr[0] = new Array(); //вставл. в первый элемент массив на 3 элемента
rrr[1] = new Array(); //вставл. в второй элемент массив на 3 элемента
rrr[2] = new Array();


const arrayTest = [[2, 8, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6],
[3, 8, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6],
[5, 8, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]]
arrayTest.forEach((el, index) => {

    rrr[0].push(el[0]);
    rrr[1].push(el[1]);
    rrr[2].push(el[2]);
    
    //rrr[index].push(el[1]);
})*/



function localNumber() {
    const number = document.querySelector('.number');
    const number2 = document.querySelector('.number2');
    number.addEventListener('input', function valueNumber(e) {
        number2.value = e.target.value;
        localStorage.setItem(id, e.target.value);
        //const idNumber02 = document.getAttribute('n02');

    }
    )
    number2.addEventListener('input', function valueNumber2(e) {
        number.value = e.target.value;
        localStorage.setItem(id, e.target.value);
        //const idNumber01 = document.getAttribute('n01');

    }
    )
    const idNumber01 = number.getAttribute('n01');
    number.value = localStorage.getItem(idNumber01);
    const idNumber02 = number.getAttribute('n02');
    number2.value = localStorage.getItem(idNumber02);
}
localNumber();


