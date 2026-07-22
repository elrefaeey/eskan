import type { UnitCardConfig, BaseUnit } from "./UnitCard";

// Config for Elbadry Towers (أبراج البدري)
export const elbadryTowersConfig: UnitCardConfig = {
  showSpecialOffer: false,
  showRevenueBanner: false,
  imageButtonLabels: {
    showUnit: "عرض صورة الوحدة",
    showFloor: "عرض صورة البلوك",
  },
  leftFields: (unit: BaseUnit) => [
    { label: "المساحة", value: `${parseInt(unit.space.toString())} متر` },
    { label: "مدة التسليم", value: unit.duration },
    { label: "المقدم", value: `${unit.advance} ج.م` },
    {
      label: "الدور",
      value:
        typeof unit.level_id === "object" && unit.level_id
          ? unit.level_id.name
          : "",
      show: !!unit.level_id && unit.level_id !== "null",
    },
  ],
  rightFields: (unit: BaseUnit) => [
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    {
      label: "القسط",
      value: `${parseInt((unit.installment || 0).toString())} ج.م`,
      show: !!unit.installment,
    },
    {
      label: "عدد الغرف",
      value: parseInt((unit.rooms || 0).toString()),
      show: !!unit.rooms,
    },
  ],
};

// Config for Elbadry Trade (البدري تريد - تجاري مع عائد)
export const elbadryTradeConfig: UnitCardConfig = {
  showSpecialOffer: false,
  showRevenueBanner: false,
  showUnitNumber: false,
  leftFields: (unit: BaseUnit) => [
    { label: "رقم الوحدة", value: unit.number },
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    { label: "المساحة", value: `${parseInt(unit.space.toString())} متر` },
  ],
  rightFields: (unit: BaseUnit) => [
    { label: "المقدم", value: `ج.م ${unit.advance}` },
    {
      label: "الدور",
      value:
        typeof unit.level_id === "object" && unit.level_id
          ? unit.level_id.name
          : "",
      show: !!unit.level_id && unit.level_id !== "null",
    },
    { label: "مدة التسليم", value: unit.duration },
  ],
};

// Config for Madina Towers (أبراج المدينة)
export const madinaTowersConfig: UnitCardConfig = {
  showSpecialOffer: true,
  showRevenueBanner: false,
  leftFields: (unit: BaseUnit) => [
    { label: "المساحة", value: `${parseInt(unit.space.toString())} متر` },
    { label: "مدة التسليم", value: unit.duration },
    { label: "المقدم", value: `${unit.advance} ج.م` },
    {
      label: "دفعة الاستلام",
      value: unit.receiving || 0,
      show: !!unit.receiving && unit.type !== "تجارى",
    },
  ],
  rightFields: (unit: BaseUnit) => [
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    {
      label: "القسط",
      value: `${parseInt((unit.installment || 0).toString())} ج.م`,
      show: unit.type !== "تجارى",
    },
    {
      label: "عدد الغرف",
      value: unit.rooms || 0,
      show: !!unit.rooms && unit.type !== "تجارى",
    },
    {
      label: "الدور",
      value:
        typeof unit.level_id === "object" && unit.level_id
          ? unit.level_id.name
          : "",
      show: !!unit.level_id && unit.level_id !== "null",
    },
  ],
};

// Config for Gallery Ground (أرض المعارض)
export const galleryGroundConfig: UnitCardConfig = {
  showSpecialOffer: true,
  showRevenueBanner: false,
  leftFields: (unit: BaseUnit) => [
    { label: "المساحة", value: `${parseInt(unit.space.toString())} متر` },
    { label: "مدة التسليم", value: unit.duration },
    { label: "المقدم", value: `${unit.advance} ج.م` },
  ],
  rightFields: (unit: BaseUnit) => [
    { label: "القسط", value: `${unit.installment} ج.م` },
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    {
      label: "الموقع",
      value: unit.location || "",
      show: !!unit.location,
    },
  ],
};

// Config for Cafe & Restaurants (المقاهي والمطاعم)
export const cafeRestaurantsConfig: UnitCardConfig = {
  showSpecialOffer: false,
  showUnitNumber: false,
  showRevenueBanner: false,
  imageButtonLabels: {
    showUnit: "عرض صورة الوحدة",
    showFloor: "عرض صورة الوحدة",
  },
  leftFields: (unit: BaseUnit) => [
    { label: "رقم الوحدة", value: unit.number },
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    { label: "المساحة", value: unit.space },
  ],
  rightFields: (unit: BaseUnit) => [
    { label: "المقدم", value: `ج.م ${unit.advance}` },
    {
      label: "الدور",
      value:
        typeof unit.level_id === "object" && unit.level_id
          ? unit.level_id.name
          : "",
      show: !!unit.level_id && unit.level_id !== "null",
    },
    { label: "مدة التسليم", value: unit.duration },
  ],
};

// Config for Medical City Center (مركز المدينة الطبي)
export const medicalCityConfig: UnitCardConfig = {
  showRevenueBanner: false,
  rightFields: (unit: BaseUnit) => [
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    {
      label: "القسط",
      value: `${parseInt((unit.installment || 0).toString())} ج.م`,
      show: !!unit.installment,
    },
    {
      label: "الدور",
      value:
        typeof unit.level_id === "object" && unit.level_id
          ? unit.level_id.name
          : "",
      show: !!unit.level_id && unit.level_id !== "null",
    },
  ],
  leftFields: (unit: BaseUnit) => [
    { label: "المساحة", value: `${parseInt(unit.space.toString())} متر` },
    { label: "مدة التسليم", value: unit.duration },
    { label: "المقدم", value: `${unit.advance} ج.م` },

    {
      label: "دفعة الاستلام",
      value: unit.receiving || 0,
      show: !!unit.receiving,
    },
  ],
};
