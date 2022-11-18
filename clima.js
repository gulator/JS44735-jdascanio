let key = "882bebf0e7525e7c891360b338149691";

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(posicion) {
  var lat = posicion.coords.latitude;
  var lon = posicion.coords.longitude;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ES&lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      key
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let weatherCard = document.createElement("div");
      weatherCard.className = "weather";
      let temperatura = parseInt(data.main.temp);
      let st = parseInt(data.main.feels_like);
      let icono = data.weather[0].icon;
      weatherCard.innerHTML = `<img class="imagenIcono" src=" https://openweathermap.org/img/wn/${icono}@2x.png">
                                <div class="info"><p class="txt-clima">${data.name}</p>
                                <p class="txt-clima">Temp: ${temperatura}°</p>`;
      let elemento = document.querySelector(".clima");
      elemento.append(weatherCard);
      
      let segundos = 10;
      let rotacion = "A";
      let intervalo1 = setInterval(function () {
        if (rotacion == "A") {
          segundos -= 1;
         
          if (segundos == 0) {
            rotacion = "B";
            segundos = 10;
            
          }  
          } else if (rotacion == "B") {
            weatherCard.innerHTML = `<img class="imagenIcono" src=" https://openweathermap.org/img/wn/${icono}@2x.png">
                                        <div class="info"><p class="txt-clima">${data.name}</p>
                                        <p class="txt-clima">ST: ${st}°</p>`;
            segundos -= 1;
            console.log(segundos);
            if (segundos == 0) {
              rotacion = "C";
              segundos = 10;
            }
          } else if (rotacion == "C") {
            weatherCard.innerHTML = `<img class="imagenIcono" src=" https://openweathermap.org/img/wn/${icono}@2x.png">
                                        <div class="info"><p class="txt-clima">${data.name}</p>
                                        <p class="txt-clima">Humedad: ${data.main.humidity}°</p>`;
            segundos -= 1;
            console.log(segundos);
            if (segundos == 0) {
              weatherCard.innerHTML = `<img class="imagenIcono" src=" https://openweathermap.org/img/wn/${icono}@2x.png">
                                <div class="info"><p class="txt-clima">${data.name}</p>
                                <p class="txt-clima">Temp: ${temperatura}°</p>`;
              rotacion = "A";
              segundos = 10;
            }
          }
        }, 1000);
        });
    };

