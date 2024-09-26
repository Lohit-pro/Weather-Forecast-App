import cn from "@/utils/cn";
import React from "react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

type Props = {
  className?: string;
  currentTemp: number | undefined;
  feelsLikeTemp: number | undefined;
  weather: string | undefined;
  tempMax: number | undefined;
  tempMin: number | undefined;
};

export default function NowCard(props: Props) {
  return (
    <div className={cn("flex flex-col", props.className)}>
      <div className="w-full flex flex-col py-2 px-5 rounded-md">
        <p className="text-9xl">{props.currentTemp}°</p>
        <p className="text-xl">Feels like {props.currentTemp}°</p>
        <p className="text-lg">{props.weather}</p>
        <div className="flex gap-1 mt-8 items-center justify-center text-xl">
          <div className="flex items-center justify-center">
            <p className="font-bold">{props.tempMax}°</p>
            <IoMdArrowRoundUp />
          </div>
          <div className="flex items-center justify-center">
            <p className="font-bold">{props.tempMin}°</p>
            <IoMdArrowRoundDown />
          </div>
        </div>
      </div>
    </div>
  );
}
