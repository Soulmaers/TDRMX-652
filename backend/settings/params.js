

//поиск значений датчиков по последнему сообщению
const prms1 = {
    "unitId": 25343786, //25594204 dtrmx,
    "sensors": []
};


//все параметры
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


module.exports = {
    prms1,
    prms
}