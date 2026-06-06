import { Shield, Bus, Dumbbell, Tv2, Car, ArrowUpDown } from "lucide-react";

const cardData = [
  { icon: Shield, title: "أمن وحراسة", color: "text-primary", bg: "bg-primary/10" },
  { icon: ArrowUpDown, title: "مصاعد ومداخل خاصة للسكان", color: "text-primary", bg: "bg-primary/10" },
  { icon: Bus, title: "خدمات نقل للسكان", color: "text-primary", bg: "bg-primary/10" },
  { icon: Dumbbell, title: "نادي ترفيهي", color: "text-primary", bg: "bg-primary/10" },
  { icon: Tv2, title: "دش مركزي", color: "text-primary", bg: "bg-primary/10" },
  { icon: Car, title: "جراج للسيارات", color: "text-primary", bg: "bg-primary/10" },
];

const CardsInfo = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
      {cardData.map((card, index) => (
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
