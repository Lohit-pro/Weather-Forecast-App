import React, { useState } from "react";
import { MdLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import { BiTargetLock } from "react-icons/bi";

type NavbarProps = {
  cityName: string | undefined;
  onCityChange: (newCity: string) => void;
};

export default function Navbar({ cityName, onCityChange }: NavbarProps) {
  const [newCity, setNewCity] = useState("");

  const handleCityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onCityChange(newCity);
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

        <section className="flex items-center justify-center mt-1 space-x-2">
          <BiTargetLock className="text-2xl cursor-pointer" />
          <SearchBox
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onSubmit={handleCityUpdate}
          />
        </section>
      </div>
    </nav>
  );
}
