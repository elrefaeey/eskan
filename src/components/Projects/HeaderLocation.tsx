import React from "react";
import { IoLocationSharp } from "react-icons/io5";

function HeaderLocation({
  title,
  location,
}: {
  title: string;
  location: string;
}) {
  return (
    <div className="mb-2">
      <h2 className="text-primary mb-1 lg:mb-3  h2">{title}</h2>
      <h4 className="flex font-semibold lg:text-xl text-sm text-[#9c9c9c] lg:gap-2 gap-1 items-center">
        {" "}
        <IoLocationSharp className={``} /> {location}
      </h4>
    </div>
  );
}

export default HeaderLocation;
