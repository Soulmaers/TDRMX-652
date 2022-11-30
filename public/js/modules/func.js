import { dataInput, dataSelect } from '../pp933.js'

const obo = document.querySelector('.obo')


export function init() {
    wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");
    wialon.core.Session.getInstance().loginToken("0f481b03d94e32db858c7bf2d8415204289C57FB5B35C22FC84E9F4ED84D5063558E1178", "", // try to login
        function (code) {
            if (code) {
                return;
            }
            //  getMainInfo();
            //grafTwo();
            //  setInterval(getMainInfo, 5000);
        });
};

//обработка массива для скрытия осей и других элементов
export const divClear = (arr) => {
    arr.forEach(e => {
        e.style.display = 'none';
    })
}

//обработка массива с отображением выбранныъ осей
export const foreachArr = (arr1, arr2, num) => {
    for (let i = 0; i < num; i++) {
        arr1[i].style.display = 'flex'
    }
    for (let i = 0; i < num; i++) {
        arr2[i].style.display = 'flex'
    }
}


export function checked() {
    const selectSpeed = document.querySelector('.select_speed');
    const inputDate = document.querySelectorAll('.input_date')
    selectSpeed.addEventListener('click', () => {
        inputDate.forEach(e => {
            e.value = ''
        })
    })
}

export function speed() {
    const btnForm = document.querySelectorAll('.btm_form')
    const inputDate = document.querySelectorAll('.input_date')
    const grafView = document.querySelector('.grafik1')
    const selectSpeed = document.querySelector('.select_speed')
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

export function liCreate() {
    const count = 97;
    for (let i = 0; i < count; i++) {
        let li = document.createElement('li');
        li.className = "msg";
        obo.append(li);
    }

}
export function sensor() {
    const btnsens = document.querySelectorAll('.btnsens')
    const titleSens = document.querySelector('.title_sens')
    btnsens.forEach(e =>
        e.addEventListener('click', () => {

            btnsens.forEach(el => {
                obo.style.display = 'none';
                titleSens.style.display = 'none';
                el.classList.remove('actBTN')
            })
            e.classList.add('actBTN')
            jobModal(e);
            obo.style.display = 'flex';
            titleSens.style.display = 'block';
        }))
}


const jobModal = (e) => {
    let job = document.querySelector('.job')
    console.log(e)
    if (e.textContent == 'Давление') {
        job.style.display = "block"
    } else {
        job.style.display = "none"
    }
}