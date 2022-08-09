class Weather {
    constructor(city = null) {
        this.apikey = "110d1c9e8bbb414459e9c6c663fe1ead";
        this.city = city;
        this.fetch_api();

    }

    fetch_api() {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&appid=110d1c9e8bbb414459e9c6c663fe1ead")
            .then(resp => resp.json())
            .then(data => {
                //console.log(data)
                this.Display_Weather(data)
            }).catch(() => { alert("Something going wrong.") })
        //console.log("fetching")
    }

    Display_Weather(data) {
        //console.log("displaying data " , data)
        document.querySelector(".cityname").innerHTML = "Weather in " + data.name;
        document.querySelector(".temperature").innerHTML = (data.main.temp - 273.16).toFixed(2) + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.querySelector(".clouddiscrip").innerHTML = data.weather[0].description;
        document.querySelector(".windspeed").innerHTML = "Wind: " + data.wind.speed;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.name +"' )"
        //this.city

        ////console.log(temp , humid , cloud_descrip , wind , this.city )
    }

    set_city(city) {//console.log(city)
        this.city = city;
        this.fetch_api();


    }
}

let default_city_name = "sialkot";
let weather = new Weather(default_city_name);


document.querySelector(".btnsearch").addEventListener("click", () => {
    //console.log("search",document.querySelector(".searchbox").value)
    weather.set_city(document.querySelector(".searchbox").value);

})


