import { useState } from "react";

import Country from "./components/Country";
import data from "./data/countries.json";
import "./styles.css";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function alphaSort(list) {
  return list.sort(alphaCompare);
}
function ascCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

function filter(list, option) {
  if (option === "all") {
    return list;
  } else if (option === "asia") {
    return list.filter((item) => item.continent.toLowerCase() === "asia");
  } else if (option === "africa") {
    return list.filter((item) => item.continent.toLowerCase() === "africa");
  } else if (option === "europe") {
    return list.filter((item) => item.continent.toLowerCase() === "europe");
  } else if (option === "north america") {
    return list.filter(
      (item) => item.continent.toLowerCase() === "north america"
    );
  } else if (option === "south america") {
    return list.filter(
      (item) => item.continent.toLowerCase() === "south america"
    );
  } else {
    return list.filter((item) => {
      switch (option) {
        case "1":
          return item.population < 100000000;
        case "2":
          return item.population >= 100000000;
        case "3":
          return item.population >= 200000000;
        case "4":
          return item.population >= 500000000;
        case "5":
          return item.population >= 1000000000;
        default:
          return true;
      }
    });
  }
}

function pop(popList, popOption) {
  console.log("Option:", popOption);
  return popList.pop((item) => {
    console.log("Population:", item.population);
    switch (popOption) {
      case "1":
        return item.population < 100000000;
      case "2":
        return item.population >= 100000000;
      case "3":
        return item.population >= 200000000;
      case "4":
        return item.population >= 500000000;
      case "5":
        return item.population >= 1000000000;
      default:
        return true;
    }
  });
}

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  const countries = data.countries;

  let sortedCountries = sort(countries.slice(), ascCompare);

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sortCountries() {
    if (sortOption === "alpha") {
      return alphaSort(countries.slice());
    } else if (sortOption === "<") {
      return sort(countries.slice(), ascCompare);
    } else {
      return sort(countries.slice(), descCompare);
    }
  }

  sortedCountries = sortCountries();
  const filteredCountries = filter(sortedCountries.slice(), filterOption);

  return (
    <div className="App">
      <div className="countries">
        <h1>World's largest countries by population</h1>
        <div className="filters">
          <label>
            Sort by:
            <select onChange={handleSort}>
              <option value="alpha">Alphabetically</option>
              <option value="<">Population Asc</option>
              <option value=">">Population Desc</option>
              <option value="shuffle">Shuffle</option>
            </select>
          </label>

          <label>
            Filters:
            <select onChange={handleFilter} value={filterOption}>
              <optgroup label="By continent">
                <option value="all">All</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="europe">Europe</option>
                <option value="north america">North America</option>
                <option value="south america">South America</option>
              </optgroup>
              <optgroup label="By population size">
                <option value="1">Less than 100M</option>
                <option value="2">100M or more</option>
                <option value="3">200M or more</option>
                <option value="4">500M or more</option>
                <option value="5">1B or more</option>
              </optgroup>
            </select>
          </label>
        </div>
        {filteredCountries.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
      {/* <Country details={countries[5]} /> */}
    </div>
  );
}
