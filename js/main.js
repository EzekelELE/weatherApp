var fa_search = document.querySelector(".fa-search");
var fa_times_circle = document.querySelector(".fa-times-circle");
var ice_cream_flavors = document.getElementById("countries");
var search = document.querySelector(".search");

fa_times_circle.addEventListener("click", function () {
    if (search.classList.contains('extend') && ice_cream_flavors.value != "") {
        ice_cream_flavors.value = "";
    } else if (search.classList.contains('extend') && ice_cream_flavors.value == "") {
        search.classList.remove("extend");
    }


});

fa_search.addEventListener("click", function () {

    search.classList.add("extend");

    if (search.classList.contains('extend') && ice_cream_flavors.value != "") {
        let long;
        let lat;
        var location = document.querySelector('.location');
        var temp = document.querySelector('.temp');
        var getLocation = ice_cream_flavors.value;
        var umiditate = document.querySelector(".umiditate");
        // var last_updated = document.querySelector(".last-updated");
        var feels_like = document.querySelector(".feels-like");
        var wind_speed = document.querySelector(".wind_speed");
        var temp_l = document.querySelector(".temp-l");
        var temp_h = document.querySelector(".temp-h");
        var condition = document.querySelector(".condition");
        var condition_img = document.querySelector(".condition-img");
        const api = `http://api.weatherapi.com/v1/forecast.json?key=48309957aa5647988e9143505212906&q=${getLocation}`;
        var time = document.querySelector(".time");
        var hourly_icon = document.querySelector(".hourly_icon");
        var hourly_temp = document.querySelector(".hourly_temp");
        var next_hours = document.querySelectorAll(".next_hours>div");
        var next_hours = document.querySelectorAll(".next_hours>div");
        var sun_rise_time = document.querySelector(".sun-rise-time");
        var sun_set_time = document.querySelector(".sun-set-time");


        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {

                console.log(data);
                location.textContent = data.location.country;
                temp.textContent = data.current.temp_c;
                umiditate.textContent = data.current.humidity + "%";
                // last_updated.textContent ="Last updated:" + data.current.last_updated;
                feels_like.textContent = Math.round(data.current.feelslike_c);
                wind_speed.textContent = Math.round(data.current.wind_kph) + " kph";
                temp_l.textContent = "L: " + Math.round(data.forecast.forecastday[0].day.mintemp_c);
                temp_h.textContent = "H: " + Math.round(data.forecast.forecastday[0].day.maxtemp_c);
                condition.textContent = data.current.condition.text;
                condition_img.setAttribute("src", data.current.condition.icon);
                for (let index = 0; index < next_hours.length; index++) {
                    next_hours[index].children[0].textContent = data.forecast.forecastday[0].hour[index * 2].time.slice(-5);
                    next_hours[index].children[1].setAttribute("src", data.forecast.forecastday[0].hour[index * 2].condition.icon);
                    next_hours[index].children[2].textContent = data.forecast.forecastday[0].hour[index * 2].temp_c;

                }

                sun_rise_time.textContent = data.forecast.forecastday[0].astro.sunrise.slice(0, data.forecast.forecastday[0].astro.sunrise.length - 2);
                sun_set_time.textContent = data.forecast.forecastday[0].astro.sunset.slice(0, data.forecast.forecastday[0].astro.sunrise.length - 2);
            })


    } else {
        console.log("no");
    }
});




window.addEventListener("load", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);
            var location = document.querySelector('.location');
            var temp = document.querySelector('.temp');
            var getLocation = ice_cream_flavors.value;
            var umiditate = document.querySelector(".umiditate");
            // var last_updated = document.querySelector(".last-updated");
            var feels_like = document.querySelector(".feels-like");
            var wind_speed = document.querySelector(".wind_speed");
            var temp_l = document.querySelector(".temp-l");
            var temp_h = document.querySelector(".temp-h");
            var condition = document.querySelector(".condition");
            var condition_img = document.querySelector(".condition-img");
            var time = document.querySelector(".time");
            var hourly_icon = document.querySelector(".hourly_icon");
            var hourly_temp = document.querySelector(".hourly_temp");
            var next_hours = document.querySelectorAll(".next_hours>div");
            var next_hours = document.querySelectorAll(".next_hours>div");
            var sun_rise_time = document.querySelector(".sun-rise-time");
            var sun_set_time = document.querySelector(".sun-set-time");

            const api = `http://api.weatherapi.com/v1/forecast.json?key=48309957aa5647988e9143505212906&q=${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    location.textContent = data.location.country;
                    temp.textContent = data.current.temp_c;
                    umiditate.textContent = data.current.humidity + "%";
                    // last_updated.textContent ="Last updated:" + data.current.last_updated;
                    feels_like.textContent = Math.round(data.current.feelslike_c);
                    wind_speed.textContent = Math.round(data.current.wind_kph) + " kph";
                    temp_l.textContent = "L: " + Math.round(data.forecast.forecastday[0].day.mintemp_c);
                    temp_h.textContent = "H: " + Math.round(data.forecast.forecastday[0].day.maxtemp_c);
                    condition.textContent = data.current.condition.text;
                    condition_img.setAttribute("src", data.current.condition.icon);


                    for (let index = 0; index < next_hours.length; index++) {
                        next_hours[index].children[0].textContent = data.forecast.forecastday[0].hour[index * 2].time.slice(-5);
                        next_hours[index].children[1].setAttribute("src", data.forecast.forecastday[0].hour[index * 2].condition.icon);
                        next_hours[index].children[2].textContent = data.forecast.forecastday[0].hour[index * 2].temp_c;

                    }

                    sun_rise_time.textContent = data.forecast.forecastday[0].astro.sunrise.slice(0, data.forecast.forecastday[0].astro.sunrise.length - 2);
                    sun_set_time.textContent = data.forecast.forecastday[0].astro.sunset.slice(0, data.forecast.forecastday[0].astro.sunrise.length - 2);
                })
        });

    }

});

