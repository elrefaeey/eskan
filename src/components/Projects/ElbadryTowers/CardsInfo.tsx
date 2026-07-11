import { ELBADRY_SERVICE_CARDS } from "@/features/elbadry-towers/constants";

const CardsInfo = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
      {ELBADRY_SERVICE_CARDS.map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2 px-2 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <h3 className="text-[#444] text-center text-xs md:text-sm font-semibold leading-tight">
            {card.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CardsInfo;
