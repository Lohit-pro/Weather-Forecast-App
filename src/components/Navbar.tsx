import React, { useState } from "react";
import { MdLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import { BiTargetLock } from "react-icons/bi";
import axios from "axios";

type NavbarProps = {
  cityName: string | undefined;
  onCityChange: (newCity: string) => void;
};

export default function Navbar({ cityName, onCityChange }: NavbarProps) {
  const [newCity, setNewCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSuggestionClick(value: string) {
    setNewCity(value);
    setShowSuggestions(false);
  }

  async function handleInputChange(value: string) {
    setNewCity(value);

    if (value.length >= 2) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );

        const suggestions = res.data.map(
          (item: any) => `${item.name}, ${item.country}`
        );
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
        setError("Error fetching suggestions");
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  const handleCityUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found!");
    } else {
      setError("");
      setShowSuggestions(false);
      onCityChange(newCity); // Update the city
    }
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white/50">
      <div className="h-[80px] w-full flex items-center justify-between max-w-7xl mx-auto">
        <section className="flex items-center space-x-1">
          <div className="text-3xl">Weather</div>
          <MdWbSunny className="text-3xl mt-2 text-yellow-400" />
        </section>

        <section className="flex items-center justify-center mt-1">
          <MdLocationOn className="text-xl" />
          <div className="text-lg">{cityName}</div>
        </section>

        <section className="flex relative items-center justify-center mt-1 space-x-2">
          <BiTargetLock className="text-2xl cursor-pointer" />
          <SearchBox
            value={newCity}
            onChange={(e) => handleInputChange(e.target.value)}
            onSubmit={handleCityUpdate}
          />
          <SuggestionBox
            {...{ showSuggestions, suggestions, handleSuggestionClick, error }}
          />
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 0) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
