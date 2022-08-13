class Weather {
    constructor() {
        this.apikey = "110d1c9e8bbb414459e9c6c663fe1ead";
        this.city = null;


    }

    fetch_api(place) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + this.apikey)
            .then(resp => resp.json())
            .then(data => {

                (document.querySelector("#infocard").style.display) = 'block';
                document.querySelector("#errordiv").style.display = "none";
                console.log("inside then 2")
                this.Display_Weather(data)

            }).catch((x) => {
                console.log("Something going wrong.", x);
                (document.querySelector("#infocard").style.display) = 'none';
                document.querySelector("#errordiv").style.display = "block";

            })

    }

    Display_Weather(data) {

        console.log("INside Display weather method ", data)
        document.querySelector("#errordiv").innerHTML = data.message
        document.querySelector(".cityname").innerHTML = "Weather in " + data.name;
        document.querySelector(".temperature").innerHTML = (data.main.temp - 273.16).toFixed(2) + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.querySelector(".clouddiscrip").innerHTML = data.weather[0].description;
        document.querySelector(".windspeed").innerHTML = "Wind: " + data.wind.speed;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.name + "' )"

    }


}



document.querySelector("#errordiv").style.display = "none";
let weather = new Weather();
let current_loc_btn = document.querySelector(".currentlocbtn");
current_loc_btn.style.display = "none";


//For default weather at Current Location

navigator.geolocation.getCurrentPosition(locating)

function locating(x) {

    fetch("https://api.opencagedata.com/geocode/v1/json?q=" + x.coords.latitude + "+" + x.coords.longitude + "&key=b2d663fa361d47cb824715cd6997b142")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            (document.querySelector("#infocard").style.display) = 'block';
            document.querySelector("#errordiv").style.display = "none";

            (weather.fetch_api(data.results[0].components.city));
        }
        )
        .catch(x => {
            document.querySelector("#errordiv").innerHTML = "Something went wrong."
                (document.querySelector("#infocard").style.display) = 'none';
            document.querySelector("#errordiv").style.display = "block";


        })
}






document.querySelector(".btnsearch").addEventListener("click", () => {
    let search_box = document.querySelector(".searchbox").value;


    if (search_box !== "") {
        current_loc_btn.style.display = "block";

        current_loc_btn.addEventListener("click", () => {
            navigator.geolocation.getCurrentPosition(locating)
            current_loc_btn.style.display = "none";
        })
        weather.fetch_api(search_box);
    }
})


