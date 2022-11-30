import { divClear } from './func.js'
import { view } from '../pp933.js'
const osi = document.querySelectorAll('.osi')
const tires = document.querySelectorAll('.tires')
const tiresInside = document.querySelectorAll('.tiresInside')
const centerOs = document.querySelectorAll('.centerOs');


//запрос данный с базы (параметры датчиков)
/*
export function viewDB() {
    fetch('api/wialon', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((res) => {
            const data = res

            data.values.sort((prev, next) => {
                if (prev.name < next.name) return -1;
                if (prev.name < next.name) return 1;
            })
            // console.log(data.values.length)

            view(data.values)
            //console.log(obj);
            //  modals(user.values)
        })

}*/

export const loadModel = () => {
    fetch('api/model', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((res) => {
            const model = res
            console.log(model.values)
            if (model.values.length > 0) {
                model.values.forEach(el => {
                    osi[el.osi - 1].style.display = 'flex';
                    centerOs[el.osi - 1].style.display = 'flex';
                    el.trailer == 'Прицеп' ?
                        centerOs[el.osi - 1].style.backgroundImage = "url('../image/line_red.png')" :
                        centerOs[el.osi - 1].style.backgroundImage = "url('../image/line_gray.png')"
                    if (el.tyres == 2) {
                        centerOs[el.osi - 1].previousElementSibling.children[0].style.display = 'flex';
                        centerOs[el.osi - 1].nextElementSibling.children[1].style.display = 'flex';
                        centerOs[el.osi - 1].previousElementSibling.children[1].style.display = 'none';
                        centerOs[el.osi - 1].nextElementSibling.children[0].style.display = 'none';
                    }
                    else {
                        centerOs[el.osi - 1].previousElementSibling.children[0].style.display = 'flex';
                        centerOs[el.osi - 1].previousElementSibling.children[1].style.display = 'flex';
                        centerOs[el.osi - 1].nextElementSibling.children[0].style.display = 'flex';
                        centerOs[el.osi - 1].nextElementSibling.children[1].style.display = 'flex';
                    }
                })
            }
            else {
                console.log('база пустая')
            }
        }),
        fetch('api/tyres', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                const params = res
                console.log(params.values)

                fetch('api/wialon', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => res.json())
                    .then((res) => {
                        const data = res

                        data.values.sort((prev, next) => {
                            if (prev.name < next.name) return -1;
                            if (prev.name < next.name) return 1;
                        })
                        view(data.values, params.values)
                    })
            })
}

export const reqDelete = () => {
    fetch('api/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
    divClear(osi)
    divClear(tiresInside)
    divClear(tires)
    centerOs.forEach(e => {
        e.style.backgroundImage = "url('../image/line.png')"
    })

}

export const paramsDelete = () => {
    fetch('api/paramsDelete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((res) => console.log(res))

}

export function postModel(arrTwo) {
    console.log(arrTwo)
    // const base = [];
    // base.push(osy, trailer, tyres)
    //   console.log(tu)
    fetch('api/model', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arrTwo),
    })
        .then((res) => res.json())
}


