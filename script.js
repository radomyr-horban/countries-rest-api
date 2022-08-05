const userInput = document.querySelector("input");
const searchButton = document.querySelector("button");

function startSearch() {
  const countryNameInput = document
    .getElementById("input-country-name")
    .value.toLowerCase()
    .trim();
  if (countryNameInput) {
    fetchCountryAPI(countryNameInput);
  } else {
    console.log("empty search input");
  }
  userInput.value = "";
}

// Event listener for hitting "Enter"
userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    startSearch();
  }
});

// get country currencies
const getCountryCurrencies = function (country) {
  let countryCurrenciesList = [];
  const currenciesObj = country[0].currencies;
  for (let key in currenciesObj) {
    for (let x in currenciesObj[key]) {
      // showing currency symbol in parentheses
      if (x === "symbol") {
        countryCurrenciesList.push(`(${currenciesObj[key][x]})`);
      } else {
        countryCurrenciesList.push(currenciesObj[key][x]);
      }
    }
  }
  return countryCurrenciesList.join(" ");
};

// get country languages
const getCountryLanguages = function (country) {
  let countryLanguagesList = [];
  const languagesObj = country[0].languages;
  for (let key in languagesObj) {
    countryLanguagesList.push(languagesObj[key]);
  }
  return countryLanguagesList.join(", ");
};

const getCountryBorders = function (country) {
  if (country[0].borders) {
    return country[0].borders.join(", ");
  } else {
    return " - ";
  }
};

// fetch country API
function fetchCountryAPI(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((response) => response.json())
    .then((json) => {
      let country = json;
      console.log("success", country);
      document.querySelector(".container").innerHTML = `
              <ul>
                <li id="country-flag"><img src="${
                  country[0].flags.png
                }" alt="flag"></li>
        
                <li>
                  <div class="country-details">
                    Name: <span id="country-name"> ${
                      country[0].name.common
                    }</span> <span id="country-short-name">(${
        country[0].altSpellings[0]
      })</span>
                  </div>
                </li>
                <li>
                  <div class="country-details">
                    Capital: <span id="country-capital">${
                      country[0].capital[0]
                    }</span>
                  </div>
                </li>
                <li>
                  <div class="country-details">Area: <span id="country-area">${country[0].area.toLocaleString(
                    "en-US"
                  )}</span><span> km2</span></div>
                </li>
                <li>
                  <div class="country-details">Region: <span id="country-region">${
                    country[0].region
                  }</span></div>
                </li>
                <li>
                  <div class="country-details">Population: <span id="country-population">${country[0].population.toLocaleString(
                    "en-US"
                  )}</span></div>
                </li>
        
                <li>
                  <div class="country-details">Languages: <span id="country-languages">${getCountryLanguages(
                    country
                  )}</span></div>
                </li>
                <li>
                  <div class="country-details">Currency: <span id="country-currency">${getCountryCurrencies(
                    country
                  )}<span></span></span>
                  </div>
                </li>
                <li>
                  <div class="country-details">Timezone: <span id="country-timezone"> ${country[0].timezones.join(
                    ", "
                  )}</span></div>
                </li>
                <li>
                  <div class="country-details">Border countries: <span id="country-borders">${getCountryBorders(
                    country
                  )}</span></div>
                </li>
                <li>
                  <div class="country-details">Show in <a href=${
                    country[0].maps.googleMaps
                  } target="_blank"                     id="country-google-maps">Google
                      maps</a></div>
                </li>
              </ul>`;
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(
        ".container"
      ).innerHTML = `<p >Sorry, we can't find a country with the name "<span id = "input-error">${countryName}</span>". Check the spelling and try again. </p>`;
    });
}
