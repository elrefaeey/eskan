"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  placeholder: string;
  options?: SelectOption[];
  className?: string;
  disabled?: boolean;
  labelClass?: string;
}

const SelectInput = ({
  name,
  placeholder,
  options = [],
  className = "",
  disabled = false,
  labelClass,
}: SelectInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value === "") {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, value);
    }

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const currentValue = searchParams.get(name) || "";

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 sm:pl-4 pointer-events-none">
        <IoMdArrowDropdown className="text-white text-base sm:text-xl" />
      </div>
      <select
        name={name}
        value={currentValue}
        onChange={handleSelectChange}
        disabled={disabled}
        className="
          appearance-none
          w-full
          bg-[#626262]
          text-white
          text-center
          py-2 sm:py-3
          px-2 sm:px-4
          pl-7 sm:pl-10
          pr-2 sm:pr-4
          rounded-lg
          border-none
          outline-none
          cursor-pointer
          hover:bg-gray-700
          transition-colors
          duration-200
        lg:text-base xl:text-lg
          font-medium
          leading-tight
        "
      >
        <option value="" className={`${labelClass}`}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={`bg-gray-600 text-white ${labelClass}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
