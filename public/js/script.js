
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
            grafTwo();
            setInterval(getMainInfo, 120000);
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
            tiresOs(arrayD);
            go(arrayD, arrayT);
            //got(arrayD);
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
    if (el >= 33 && el <= 38)
        generatedValue = 3;
    if (el >= 32 && el < 33 || el > 38 && el <= 39)
        generatedValue = 2;
    if (el >= -1000 && el < 32 || el > 39)
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
        btn24 = document.querySelector('.btn24');
        btn24.style.display = 'block';

        tiresLinkfunc(elem, index);
        grafTwo()
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
        "loadCount": 6518
    };

    const remote2 = wialon.core.Remote.getInstance();
    remote2.remoteCall('messages/load_interval', prms2,
        function (code, result) {
            if (code) {
                console.log(wialon.core.Errors.getErrorText(code));
            }
            arr2 = Object.values(result);
            arrIterTime = [];
            arr2[1].forEach(el => {
                arrIterTime.push(el.t);
            })

        });

    const prms3 = {
        "source": "",
        "indexFrom": 0,
        "indexTo": 6518,
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
                arrIter.push(arsss)
            }
            for (let subArr in arr3) {
                arsss = Object.values(arr3[subArr]);
                arrIterT.push(arsss)
            }
            arrIter.map((arr) => { arr.splice(9, 15); arr.splice(12, 3); });
            //console.log(arrIter);
            arrIterT.map((arr) => { arr.splice(0, 10); arr.splice(10, 7); });
            //console.log(arrIter);

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

            arrIter.forEach(el => {
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

            arrIterT.forEach(el => {
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
            /*
            array24D.push(arrIter[0]); array24D.push(arrIter[2]); array24D.push(arrIter[1]); array24D.push(arrIter[9]);
            array24D.push(arrIter[8]); array24D.push(arrIter[7]); array24D.push(arrIter[6]); array24D.push(arrIter[3]);
            array24D.push(arrIter[5]); array24D.push(arrIter[4]); array24D.push(arrIter[10]); array24D.push(arrIter[11]);
            console.log(array24D);* /


            
                        const arrTest1 = [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]]
            
                        arrTest1.map((arr) => { arr.splice(2, 1); arr.splice(3, 2); });
                        console.log(arrTest1);
            /*
            array24D[0].push(arrIter[0][0]); array24D[0].push(arrIter[0][2]); array24D[0].push(arrIter[0][1]); array24D[0].push(arrIter[0][9]);
            array24D[0].push(arrIter[0][8]); array24D[0].push(arrIter[0][7]); array24D[0].push(arrIter[0][8]); array24D[0].push(arrIter[0][3]);
            array24D[0].push(arrIter[0][5]); array24D[0].push(arrIter[0][4]); array24D[0].push(arrIter[0][25]); array24D[0].push(arrIter[0][26]);
            array24D[1].push(arrIter[1][0]); array24D[1].push(arrIter[1][2]); array24D[1].push(arrIter[1][1]); array24D[1].push(arrIter[1][9]);
            array24D[1].push(arrIter[1][8]); array24D[1].push(arrIter[1][7]); array24D[1].push(arrIter[1][8]); array24D[1].push(arrIter[1][3]);
            array24D[1].push(arrIter[1][5]); array24D[1].push(arrIter[1][4]); array24D[1].push(arrIter[1][25]); array24D[1].push(arrIter[1][26]);
            array24D[2].push(arrIter[2][0]); array24D[2].push(arrIter[2][2]); array24D[2].push(arrIter[2][1]); array24D[2].push(arrIter[2][9]);
            array24D[2].push(arrIter[2][8]); array24D[2].push(arrIter[2][7]); array24D[2].push(arrIter[2][8]); array24D[2].push(arrIter[2][3]);
            array24D[2].push(arrIter[2][5]); array24D[2].push(arrIter[2][4]); array24D[2].push(arrIter[2][25]); array24D[2].push(arrIter[2][26]);
            array24D[3].push(arrIter[3][0]); array24D[3].push(arrIter[3][2]); array24D[3].push(arrIter[3][1]); array24D[3].push(arrIter[3][9]);
            array24D[3].push(arrIter[3][8]); array24D[3].push(arrIter[3][7]); array24D[3].push(arrIter[3][8]); array24D[3].push(arrIter[3][3]);
            array24D[3].push(arrIter[3][5]); array24D[3].push(arrIter[3][4]); array24D[3].push(arrIter[3][25]); array24D[3].push(arrIter[3][26]);
            array24D[4].push(arrIter[4][0]); array24D[4].push(arrIter[4][2]); array24D[4].push(arrIter[4][1]); array24D[4].push(arrIter[4][9]);
            array24D[4].push(arrIter[4][8]); array24D[4].push(arrIter[4][7]); array24D[4].push(arrIter[4][8]); array24D[4].push(arrIter[4][3]);
            array24D[4].push(arrIter[4][5]); array24D[4].push(arrIter[4][4]); array24D[4].push(arrIter[4][25]); array24D[4].push(arrIter[4][26]);
            array24D[5].push(arrIter[5][0]); array24D[5].push(arrIter[5][2]); array24D[5].push(arrIter[5][1]); array24D[5].push(arrIter[5][9]);
            array24D[5].push(arrIter[5][8]); array24D[5].push(arrIter[5][7]); array24D[5].push(arrIter[5][8]); array24D[5].push(arrIter[5][3]);
            array24D[5].push(arrIter[5][5]); array24D[5].push(arrIter[5][4]); array24D[5].push(arrIter[5][25]); array24D[5].push(arrIter[5][26]);
            array24D[6].push(arrIter[6][0]); array24D[6].push(arrIter[6][2]); array24D[6].push(arrIter[6][1]); array24D[6].push(arrIter[6][9]);
            array24D[6].push(arrIter[6][8]); array24D[6].push(arrIter[6][7]); array24D[6].push(arrIter[6][8]); array24D[6].push(arrIter[6][3]);
            array24D[6].push(arrIter[6][5]); array24D[6].push(arrIter[6][4]); array24D[6].push(arrIter[6][25]); array24D[6].push(arrIter[6][26]);
            array24D[7].push(arrIter[7][0]); array24D[7].push(arrIter[7][2]); array24D[7].push(arrIter[7][1]); array24D[7].push(arrIter[7][9]);
            array24D[7].push(arrIter[7][8]); array24D[7].push(arrIter[7][7]); array24D[7].push(arrIter[7][8]); array24D[7].push(arrIter[7][3]);
            array24D[7].push(arrIter[7][5]); array24D[7].push(arrIter[7][4]); array24D[7].push(arrIter[7][25]); array24D[7].push(arrIter[7][26]);
            array24D[8].push(arrIter[8][0]); array24D[8].push(arrIter[8][2]); array24D[8].push(arrIter[8][1]); array24D[8].push(arrIter[8][9]);
            array24D[8].push(arrIter[8][8]); array24D[8].push(arrIter[8][7]); array24D[8].push(arrIter[8][8]); array24D[8].push(arrIter[8][3]);
            array24D[8].push(arrIter[8][5]); array24D[8].push(arrIter[8][4]); array24D[8].push(arrIter[8][25]); array24D[8].push(arrIter[8][26]);
            array24D[9].push(arrIter[9][0]); array24D[9].push(arrIter[9][2]); array24D[9].push(arrIter[9][1]); array24D[9].push(arrIter[9][9]);
            array24D[9].push(arrIter[9][8]); array24D[9].push(arrIter[9][7]); array24D[9].push(arrIter[9][8]); array24D[9].push(arrIter[9][3]);
            array24D[9].push(arrIter[9][5]); array24D[9].push(arrIter[9][4]); array24D[9].push(arrIter[9][25]); array24D[9].push(arrIter[9][26]);

            array24T = [[], [], [], [], [], [], [], [], [], []];
            array24T[0].push(arrIter[0][0]); array24T[0].push(arrIter[0][2]); array24T[0].push(arrIter[0][1]); array24T[0].push(arrIter[0][9]);
            array24T[0].push(arrIter[0][8]); array24T[0].push(arrIter[0][7]); array24T[0].push(arrIter[0][8]); array24T[0].push(arrIter[0][3]);
            array24T[0].push(arrIter[0][5]); array24T[0].push(arrIter[0][4]); array24T[0].push(arrIter[0][25]); array24T[0].push(arrIter[0][26]);
            array24T[1].push(arrIter[1][0]); array24T[1].push(arrIter[1][2]); array24T[1].push(arrIter[1][1]); array24T[1].push(arrIter[1][9]);
            array24T[1].push(arrIter[1][8]); array24T[1].push(arrIter[1][7]); array24T[1].push(arrIter[1][8]); array24T[1].push(arrIter[1][3]);
            array24T[1].push(arrIter[1][5]); array24T[1].push(arrIter[1][4]); array24T[1].push(arrIter[1][25]); array24T[1].push(arrIter[1][26]);
            array24T[2].push(arrIter[2][0]); array24T[2].push(arrIter[2][2]); array24T[2].push(arrIter[2][1]); array24T[2].push(arrIter[2][9]);
            array24T[2].push(arrIter[2][8]); array24T[2].push(arrIter[2][7]); array24T[2].push(arrIter[2][8]); array24T[2].push(arrIter[2][3]);
            array24T[2].push(arrIter[2][5]); array24T[2].push(arrIter[2][4]); array24T[2].push(arrIter[2][25]); array24T[2].push(arrIter[2][26]);
            array24T[3].push(arrIter[3][0]); array24T[3].push(arrIter[3][2]); array24T[3].push(arrIter[3][1]); array24T[3].push(arrIter[3][9]);
            array24T[3].push(arrIter[3][8]); array24T[3].push(arrIter[3][7]); array24T[3].push(arrIter[3][8]); array24T[3].push(arrIter[3][3]);
            array24T[3].push(arrIter[3][5]); array24T[3].push(arrIter[3][4]); array24T[3].push(arrIter[3][25]); array24T[3].push(arrIter[3][26]);
            array24T[4].push(arrIter[4][0]); array24T[4].push(arrIter[4][2]); array24T[4].push(arrIter[4][1]); array24T[4].push(arrIter[4][9]);
            array24T[4].push(arrIter[4][8]); array24T[4].push(arrIter[4][7]); array24T[4].push(arrIter[4][8]); array24T[4].push(arrIter[4][3]);
            array24T[4].push(arrIter[4][5]); array24T[4].push(arrIter[4][4]); array24T[4].push(arrIter[4][25]); array24T[4].push(arrIter[4][26]);
            array24T[5].push(arrIter[5][0]); array24T[5].push(arrIter[5][2]); array24T[5].push(arrIter[5][1]); array24T[5].push(arrIter[5][9]);
            array24T[5].push(arrIter[5][8]); array24T[5].push(arrIter[5][7]); array24T[5].push(arrIter[5][8]); array24T[5].push(arrIter[5][3]);
            array24T[5].push(arrIter[5][5]); array24T[5].push(arrIter[5][4]); array24T[5].push(arrIter[5][25]); array24T[5].push(arrIter[5][26]);
            array24T[6].push(arrIter[6][0]); array24T[6].push(arrIter[6][2]); array24T[6].push(arrIter[6][1]); array24T[6].push(arrIter[6][9]);
            array24T[6].push(arrIter[6][8]); array24T[6].push(arrIter[6][7]); array24T[6].push(arrIter[6][8]); array24T[6].push(arrIter[6][3]);
            array24T[6].push(arrIter[6][5]); array24T[6].push(arrIter[6][4]); array24T[6].push(arrIter[6][25]); array24T[6].push(arrIter[6][26]);
            array24T[7].push(arrIter[7][0]); array24T[7].push(arrIter[7][2]); array24T[7].push(arrIter[7][1]); array24T[7].push(arrIter[7][9]);
            array24T[7].push(arrIter[7][8]); array24T[7].push(arrIter[7][7]); array24T[7].push(arrIter[7][8]); array24T[7].push(arrIter[7][3]);
            array24T[7].push(arrIter[7][5]); array24T[7].push(arrIter[7][4]); array24T[7].push(arrIter[7][25]); array24T[7].push(arrIter[7][26]);
            array24T[8].push(arrIter[8][0]); array24T[8].push(arrIter[8][2]); array24T[8].push(arrIter[8][1]); array24T[8].push(arrIter[8][9]);
            array24T[8].push(arrIter[8][8]); array24T[8].push(arrIter[8][7]); array24T[8].push(arrIter[8][8]); array24T[8].push(arrIter[8][3]);
            array24T[8].push(arrIter[8][5]); array24T[8].push(arrIter[8][4]); array24T[8].push(arrIter[8][25]); array24T[8].push(arrIter[8][26]);
            array24T[9].push(arrIter[9][0]); array24T[9].push(arrIter[9][2]); array24T[9].push(arrIter[9][1]); array24T[9].push(arrIter[9][9]);
            array24T[9].push(arrIter[9][8]); array24T[9].push(arrIter[9][7]); array24T[9].push(arrIter[9][8]); array24T[9].push(arrIter[9][3]);
            array24T[9].push(arrIter[9][5]); array24T[9].push(arrIter[9][4]); array24T[9].push(arrIter[9][25]); array24T[9].push(arrIter[9][26]);
*/

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
    chrt1()
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
        myChartg.data.datasets[0].data = davl.slice(-10);
        myChartg.data.datasets[1].data = davl2.slice(-10);
        myChartg.data.labels = arrTime.slice(-10);
        myChartg.update();
    }
    setInterval(upDia, 2000);
}


function chrt1() {

    Chart.register(ChartDataLabels);
    //Chart.defaults.global.tooltips.enabled = false;
    myChartg1 = new Chart(myChartg1, {
        type: 'line',
        data: {
            datasets: [{
                data: davl24,
                label: 'Давление',
                fill: false,
                borderColor: 'lightgreen',
                yAxisID: 'left-y-axis'
            }, {
                data: davl224,
                label: 'Температура',
                fill: false,
                borderColor: 'lightblue',
                yAxisID: 'right-y-axis'
            }],
            labels: arrIterTime
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
                tooltips: {
                    enabled: false
                },
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
    setInterval(upDia1, 2000);
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



