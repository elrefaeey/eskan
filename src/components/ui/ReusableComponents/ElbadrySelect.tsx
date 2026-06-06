"use client";
import React, { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IoIosArrowDown } from "react-icons/io";

interface SelectItem {
  id: number | string;
  label: string;
  value?: number | string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  data: SelectItem[];
  defaultLabel?: string;
  elName?: string;
  anotherBg?: boolean;
  loading?: boolean;
  onChange: (value: number | string, item: SelectItem) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "اختر...",
  data,
  defaultLabel,
  elName,
  anotherBg = false,
  loading = false,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | number>(
    defaultLabel || placeholder
  );

  const handleSelect = (item: SelectItem) => {
    const value = item.value ?? item.id;
    setSelected(item.label);
    onChange(value, item);
  };

  const renderMenuItems = useMemo(() => {
    return data.map((item) => (
      <DropdownMenuItem
        key={item.id}
        onClick={() => handleSelect(item)}
        className="cursor-pointer hover:bg-gray-100 transition-colors"
      >
        {item.label}
        {elName === "meter_price" && (
          <span className="ms-1 text-gray-500">ج</span>
        )}
        {elName === "space" && <span className="ms-1 text-gray-500">متر</span>}
      </DropdownMenuItem>
    ));
  }, [data]);

  if (loading) {
    return <Skeleton className="h-[45px] w-full rounded-xl" />;
  }

  return (
    <div className="w-full text-end">
      {label && (
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-between rounded-xl border border-gray-200 ${
              anotherBg ? "bg-[#F1F1F1]" : "bg-white"
            } text-right h-[45px] px-4 hover:bg-gray-50 transition-all`}
          >
            <span
              className={`truncate ${
                selected === placeholder ? "text-gray-400" : "text-black"
              }`}
            >
              {selected}
            </span>
            <IoIosArrowDown className="text-gray-400 ms-2 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-full rounded-xl border border-gray-100 shadow-md max-h-[250px] overflow-y-auto"
          align="end"
        >
          {defaultLabel && (
            <DropdownMenuItem
              onClick={() =>
                handleSelect({ id: 0, label: defaultLabel, value: 0 })
              }
              className="text-gray-500 hover:bg-gray-100 cursor-pointer"
            >
              {defaultLabel}
            </DropdownMenuItem>
          )}

          {renderMenuItems}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default React.memo(Select);
