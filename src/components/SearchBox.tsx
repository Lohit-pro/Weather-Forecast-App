import React from "react";
import { IoIosSearch } from "react-icons/io";

type SearchBoxProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function SearchBox(props: SearchBoxProps) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="flex relative items-center justify-center h-10"
    >
      <input
        type="text"
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
