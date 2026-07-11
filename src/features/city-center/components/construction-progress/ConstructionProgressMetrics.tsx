import { CITY_CENTER_CONSTRUCTION } from "../../constants/construction";
import { ConstructionCircularProgress } from "./ConstructionCircularProgress";
import { ConstructionProgressBar } from "./ConstructionProgressBar";

export function ConstructionProgressMetrics() {
  return (
    <div className="px-4 md:px-8 pb-6">
      <div className="flex items-center gap-6 flex-row-reverse">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-gray-400 text-xs">0%</span>
            <span className="text-gray-400 text-xs">100%</span>
          </div>
          <ConstructionProgressBar />
          <p className="text-gray-500 text-body-sm mt-3">{CITY_CENTER_CONSTRUCTION.summary}</p>
        </div>
        <ConstructionCircularProgress />
      </div>
    </div>
  );
}
