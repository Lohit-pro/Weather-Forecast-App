"use client";

import { useQuery } from "react-query";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "@/components/Loading";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import NowCard from "@/components/NowCard";
import kelvinToCelsius from "@/utils/kelvinToCelsius";
import TodayCard from "@/components/TodayCard";
import { WeatherData } from "@/types/WeatherInterface";

const weatherClassMap: { [key: string]: string } = {
  Clear: "clear",
  Clouds: "clouds",
  Rain: "rain text-white",
  Drizzle: "drizzle text-white",
  Thunderstorm: "thunderstorm text-white",
  Snow: "snow text-dark",
  Mist: "mist",
  Smoke: "smoke",
  Haze: "haze",
  Dust: "dust",
  Fog: "fog",
  Sand: "sand",
  Ash: "ash",
  Squall: "squall",
  Tornado: "tornado text-white",
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const updateCity = (newCity: string) => {
    setSelectedCity(newCity);
  };

  const { isLoading, error, data } = useQuery<WeatherData>(
    ["weatherData", selectedCity],
    async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  );

  const firstData = data?.list[0];
  console.log(data);
  console.log(firstData);

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-gray-200">
      {!isLoading ? (
        <>
          <Navbar cityName={data?.city.name} onCityChange={updateCity} />
          <main className="px-3 max-w-7xl mx-auto flex flex-col gap-2 w-full pb-10 pt-4">
            <section>
              <h2 className="text-2xl gap-2 pl-3">
                {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
              </h2>
            </section>

            <section className="h-full flex items-center">
              <NowCard
                className={
                  firstData?.weather[0].main
                    ? weatherClassMap[firstData.weather[0].main] 
                    : "clouds"
                }
                currentTemp={kelvinToCelsius(firstData?.main.temp ?? 0)}
                feelsLikeTemp={firstData?.main.feels_like}
                weather={firstData?.weather[0].main}
                tempMax={kelvinToCelsius(firstData?.main.temp_max ?? 0)}
                tempMin={kelvinToCelsius(firstData?.main.temp_min ?? 0)}
              />
              <TodayCard data={data?.list} />
            </section>

          </main>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Loading color={"#000000"} size={30} />
        </div>
      )}
    </div>
  );
}
