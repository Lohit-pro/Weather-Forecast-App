import React from "react";
import { WeatherDetail } from "@/types/WeatherInterface";
import kelvinToCelsius from "@/utils/kelvinToCelsius";
import { format, parseISO } from "date-fns";
import WeatherIcon from "./WeatherIcon";

type Props = {
  data: WeatherDetail[] | undefined;
};

export default function TodayCard(props: Props) {
  return (
    <div className="h-full py-10 w-full ml-5 rounded-md flex overflow-x-auto">
      {props.data ? (
        props.data.slice(0, 10).map((detail, index) => {
          const weatherClass = detail.weather[0].main;
          return (
            <div
              key={index}
              className={`px-9 py-10 mx-2 rounded-md flex flex-col items-center text-center text-nowrap ${weatherClass.toLowerCase()} `}
              style={{ minWidth: "120px", height: "180px" }} // Set uniform height and minWidth
            >
              <div className="flex-1 flex items-center justify-center"> {/* Ensures icon is centered */}
                <WeatherIcon weatherCode={detail.weather[0].icon.slice(0, -1) ?? ""} />
              </div>
              <p className="text-lg">{kelvinToCelsius(detail.main.temp)}°</p>
              <p className="text-xs">{format(parseISO(detail?.dt_txt ?? ""), "h:mm a")}</p>
            </div>
          );
        })
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}


