// Variables 
let countryName = document.querySelector(".country__information--name");
let countryPayer = document.querySelector(".country__payer-times");
let countryDate = document.querySelector(".hijri");
let chooseCountry = document.querySelector("#country");

// Choose Country to Extract Country Name And City Name
chooseCountry.addEventListener("input", function () {
  country = this.value;
  city = this.options[this.selectedIndex].getAttribute("data-city");
  // Get Data Function Call
  getData(city, country);
});

// Get Data Function Use Axios Library
function getData(city = "Cairo", country = "Egypt") {
  fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`)
    .then((response) => {
      let result = response.json();
      return result;
    })
    .then((result) => {
      // Change Country Name
      countryName.innerHTML = `${country}, ${city}`;
      // Change Country Date
      let date = result.data.date.hijri;
      let dayName = date.weekday.ar;
      let monthName = date.month.ar;
      let year = date.year;
      countryDate.innerHTML = `${dayName}, ${monthName}, ${year}`;
      // Change Country Times Payer
      countryPayer.innerHTML = "";
      let timings = result.data.timings;
      for (let i = 0; i < 7; ++i) {
        if (Object.keys(timings)[i] === "Sunset") continue;
        countryPayer.innerHTML += `
          <div class="payer">
            <p class="payer__name">${Object.keys(timings)[i]}</p>
            <p class="payer__time">${Object.values(timings)[i]}</p>
          </div>
        `
      }
    })
};

getData();