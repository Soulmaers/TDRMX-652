


export const map = L.map('map')
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.setView([59.9386, 30.3141], 8);
//L.marker([59.9386, 30.3141]).addTo(map);
