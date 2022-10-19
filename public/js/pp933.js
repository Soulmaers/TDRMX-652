



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
            os()
            console.log('нажал ось')

        })
    })
}
modul()

function os() {
    linkSelectOs.forEach(e =>
        e.addEventListener('click', () => {
            if (e.textContent == 'Прицеп') {
                array[array.length - 1].style.backgroundImage = "url('../image/line_red.png')";
            }
            else if (e.textContent == 'Тягач')
                array[array.length - 1].style.backgroundImage = "url('../image/line.png')";
        }))

    linkSelectTires.forEach(e =>
        e.addEventListener('click', () => {
            array[array.length - 1].previousElementSibling.children[0].style.display = 'none';
            array[array.length - 1].previousElementSibling.children[1].style.display = 'none';
            array[array.length - 1].nextElementSibling.children[0].style.display = 'none';
            array[array.length - 1].nextElementSibling.children[1].style.display = 'none';
            if (e.textContent == 2) {
                array[array.length - 1].previousElementSibling.children[0].style.display = 'flex';
                array[array.length - 1].nextElementSibling.children[0].style.display = 'flex';
            }
            if (e.textContent == 4) {
                array[array.length - 1].previousElementSibling.children[0].style.display = 'flex';
                array[array.length - 1].previousElementSibling.children[1].style.display = 'flex';
                array[array.length - 1].nextElementSibling.children[0].style.display = 'flex';
                array[array.length - 1].nextElementSibling.children[1].style.display = 'flex';
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
            // getMainInfo();
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
            sensors = Object.entries(arr1[5][0].lmsg.p)
            //console.log(sensors)
            //sens(sensors);
            // homes.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            //  test = [['1', '2'], ['3', '4']]
            view(sensors)
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
    arr.forEach((el, index) => {
        arg[index].textContent = `${el[0]}:${el[1]}`
    })
    msgAct(arg)
}


tiresLink.forEach(e => {
    e.addEventListener('click', () => {
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
        console.log('нажал')

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




function msgAct(arg) {
    arg.forEach(e => e.addEventListener('click', () => {
        arg.forEach(el => el.classList.remove('act'))
        e.classList.add('act')
        arrAct = [...e.textContent]
        arrAct.forEach(el => {
            if (el === ':') {
                value = arrAct.splice(arrAct.indexOf(el) + 1, arrAct.length - 1).join('')
                console.log(value)
            }
        })

        tiresLink.forEach(e => {
            if (e.classList.contains('tiresActiv') && btnsens[0].classList.contains('actBTN')) {
                value.length > 10 ?
                    e.children[0].textContent = '-' :
                    e.children[0].textContent = value

            }

            if (e.classList.contains('tiresActiv') && btnsens[1].classList.contains('actBTN')) {
                value.length > 10 ?
                    e.children[1].textContent = '-' :
                    e.children[1].textContent = value
            }
        })



        // console.log(value)
    }))

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
}
