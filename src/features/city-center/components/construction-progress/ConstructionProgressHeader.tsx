import { CITY_CENTER_CONSTRUCTION } from "../../constants/construction";

export function ConstructionProgressHeader() {
  return (
    <div className="px-4 md:px-8 py-5 flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h3 className="text-primary font-extrabold text-xl md:text-2xl">تقدم الإنشاءات</h3>
        <p className="text-gray-400 text-xs mt-1">
          آخر تحديث: {CITY_CENTER_CONSTRUCTION.lastUpdated}
        </p>
      </div>
      <div className="bg-primary/10 border border-primary/20 text-primary text-sm font-bold px-4 py-1.5 rounded-full">
        المرحلة الحالية: {CITY_CENTER_CONSTRUCTION.currentPhaseLabel}
      </div>
    </div>
  );
}
