"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./App.css";
import {
  RemoteSearchResultItem,
  SearchResultItemType,
} from "@/models/SearchResultItemType";
import SearchResultItem from "@/components/SearchResultItem";
import { RemoteCityWeather } from "@/models/RemoteCityWeather";
import { CityWeather } from "@/models/CityWeather";

export const APP_ID = "2c1fac36cbadaea095718a649c206d49";

const App = () => {
  const [city, setCity] = useState<CityWeather>();
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultItemType[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsDropdownOpen(true);
      fetchCities();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchCities = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APP_ID}`
    )
      .then((r) => r.json())
      .then((cities: RemoteSearchResultItem[]) => {
        setSearchResults(cities.map((city) => new SearchResultItemType(city)));
        setIsDropdownOpen(true);
      });
  };

  const onItemClick = (item: SearchResultItemType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${item.latitude}&lon=${item.longitude}&appid=${APP_ID}&units=metric`
    )
      .then((r) => r.json())
      .then((cityWeather: RemoteCityWeather) => {
        console.log("cityWeather", cityWeather);
        setCity(new CityWeather(cityWeather));
        setIsDropdownOpen(false);
      });
  };

  return (
    <main className="app">
      <h1>Weather Application</h1>
      <div className="text-black">
        <input
          type="text"
          data-testid="search-input"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="Enter city name (e.g. Melbourne, New York)"
        />
      </div>
      {isDropdownOpen && (
        <div className="search-results-popup">
          {searchResults.length > 0 && (
            <ul data-testid="search-results">
              {searchResults.map((city, index) => (
                <SearchResultItem
                  key={index}
                  item={city}
                  onItemClick={onItemClick}
                />
              ))}
            </ul>
          )}
        </div>
      )}
      <div data-testid="favorite-cities">
        {city && (
          <div className="city">
            <span className="text-gray-600">{city.name}</span>
            <span className="text-gray-600">{city.degree}°C</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
