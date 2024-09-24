"use client";

import { useQuery } from "react-query";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "@/components/Loading";
import React from "react";
import { format, parseISO } from "date-fns";
import TodayCard from "@/components/TodayCard";
import kelvinToCelsius from "@/utils/kelvinToCelsius";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=hubli&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );

        console.log(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  );

  const firstData = data?.list[0];
  console.log(firstData);

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-gray-200">
      {!isLoading ? (
        <React.Fragment>
          <Navbar city={data?.city.name} />
          <main className="border-2 border-red-400 px-3 max-w-7xl mx-auto flex flex-col gap-2 w-full pb-10 pt-4">
            {/* Todays data */}
            <section>
              <h2 className="text-2xl gap-2 pl-3">
                {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
              </h2>
            </section>

            <section className="h-full">
              <TodayCard
              className={firstData?.weather[0].main === "Clouds" ? "clouds" : "thunderstorm"}
                currentTemp={kelvinToCelsius(firstData?.main.temp ?? 0)}
                feelsLikeTemp={firstData?.main.feels_like}
                tempMax={kelvinToCelsius(firstData?.main.temp_max ?? 0)}
                tempMin={kelvinToCelsius(firstData?.main.temp_min ?? 0)}
              />
            </section>
          </main>
        </React.Fragment>
      ) : (
        <div className="flex items-center justify-center">
          <Loading color={"#000000"} size={30} />
          <Loading color={"#000000"} size={30} />
          <Loading color={"#000000"} size={30} />
        </div>
      )}
    </div>
  );
}

// https://api.openweathermap.org/data/2.5/forecast?q=hubli&appid=137d9b7d152476e133198ee2fea73657
