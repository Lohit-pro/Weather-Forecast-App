import cn from "@/utils/cn";
import React from "react";
import { BiTargetLock } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn("flex relative items-center justify-center h-10", props.className)}
    >
      <input
        type="text"
        name="searchbar"
        placeholder="Search city"
        value={props.value}
        onChange={props.onChange}
        className="py-2 pl-2 w-[230px] h-full border border-gray-400 rounded-l-md hover:border-gray-800 focus:outline-none focus:border-blue-500"
      />
      <button className="px-4 py-[9px] h-full text-white rounded-r-md bg-blue-600 hover:bg-blue-700 border border-blue-600">
        <IoIosSearch />
      </button>
    </form>
  );
}
