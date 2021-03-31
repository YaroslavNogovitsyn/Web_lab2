// Избранное

favorites = window.localStorage;
const KEY = '5aa741a37ff6512516bcb3da3ea973f0';

// Добавление
let Form = document.getElementById('form');
Form.addEventListener("submit", function (event){
    event.preventDefault();
    let name = document.getElementById('POST-name');
    favorites.setItem(name.value.toLowerCase(), name.value);
    name.value = "";
    loadStorage();
});


//Загрузка избранного
function loadStorage(){
    //Прорадитель избранного
    let favor = document.querySelector('.menu');

    //цикл очищения
    while (favor.firstChild){
        favor.removeChild(favor.lastChild)
    }

    //Цикл заполнения
    for(let i=0; i<favorites.length; i++) {
        let key = favorites.key(i);
        fill(key, favor);
    }
}

//Функция генерации элемента
function fill(key, favor){

    let city = document.createElement("li");
    city.hidden = true;

    let load = document.createElement('li');
    load.classList.add('load');
    load.classList.add('city');
    let text = document.createElement('p');
    load.appendChild(text);
    text.textContent = "Подождите данные загружаются...";
    favor.appendChild(load);

    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + favorites.getItem(key) + '&units=metric&lang=ru&appid=' + KEY;

    fetch(url).then(function (resp) {return resp.json() }).then(function (data) {

        city.classList.add('city');

        let head = document.createElement("div");
        head.classList.add('flex');
        city.appendChild(head);

        let name = document.createElement("h3");
        name.textContent = data.name;
        let temp = document.createElement("p");
        temp.textContent = data.main.temp + '°C';
        let img = document.createElement("span");
        img.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        let btn = document.createElement("button");
        btn.classList.add('delete');

        //Функция удаления города
        btn.addEventListener("click", () => {
            favorites.removeItem(key);
            load.remove();
            city.remove();

        }, false);


        btn.innerHTML =  `<img src="img1/1.webp">`;

        head.appendChild(name);
        head.appendChild(temp);
        head.appendChild(img);
        head.appendChild(btn);




        let data_city = document.createElement("ul");
        data_city.classList.add('weather');
        city.appendChild(data_city);

        let wind_li = document.createElement("li");
        wind_li.textContent = "Ветер";
        data_city.appendChild(wind_li);
        let wind_data_city = document.createElement('span');
        wind_data_city.classList.add('wind');
        wind_li.appendChild(wind_data_city);
        wind_data_city.textContent = data.wind.speed + ' m/s';

        let cloud_li = document.createElement("li");
        cloud_li.textContent = "Облачность";
        data_city.appendChild(cloud_li);
        let cloud_data_city = document.createElement('span');
        cloud_data_city.classList.add('cloud');
        cloud_li.appendChild(cloud_data_city);
        cloud_data_city.textContent = data.clouds.all + '%';

        let pressure_li = document.createElement("li");
        pressure_li.textContent = "Давление";
        data_city.appendChild(pressure_li);
        let pressure_data_city = document.createElement('span');
        pressure_data_city.classList.add('pressure');
        pressure_li.appendChild(pressure_data_city);
        pressure_data_city.textContent = data.main.pressure + ' hpa';

        let humidity_li = document.createElement("li");
        humidity_li.textContent = "Влажность";
        data_city.appendChild(humidity_li);
        let humidity_data_city = document.createElement('span');
        humidity_data_city.classList.add('humidity');
        humidity_li.appendChild(humidity_data_city);
        humidity_data_city.textContent = data.main.humidity +'%';

        let coord_li = document.createElement("li");
        coord_li.textContent = "Координаты";
        data_city.appendChild(coord_li);
        let coord_data_city = document.createElement('span');
        coord_data_city.classList.add('coord');
        coord_li.appendChild(coord_data_city);
        coord_data_city.textContent = '['+data.coord.lat + ', ' + data.coord.lon + ']';
        favor.appendChild(city);

        load.hidden = true;
        city.hidden = false;
    })
        /*--- Обработка ошибок ---*/
        .catch(function () {
            //Обрабатываем ошибки
            alert(`Города ${localStorage.getItem(key)} нет в базе данных`);
            load.remove();
            favorites.removeItem(key);
        });
}

loadStorage();

