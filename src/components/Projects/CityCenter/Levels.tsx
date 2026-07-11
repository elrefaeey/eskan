import LevelCard from "./LevelCard";
const Levels = ({
  loading = false,
  img,
}: {
  loading?: boolean;
  img: string;
}) => {
  const levelsData = [
    {
      title: "دور البازار",
      units: 95,
      area: 11,
      advance: 270,
      years: 4,
      link: "/bazar-level",
      img: img,
      loading,
    },
    {
      title: "دور الالكترونيات",
      units: 94,
      area: 7,
      advance: 285,
      years: 4,
      link: "/electronics-level",
      img: img,
      loading,
    },
    {
      title: "دور الملابس",
      units: 60,
      area: 14,
      advance: 350,
      years: 3,
      link: "/clothes-level",
      img: img,

      loading,
    },
    {
      title: "دور المطاعم والكافيهات",
      units: 39,
      area: 19,
      link: "/restaurant",
      loading,
      status: "تم الانتهاء من التعاقد",
      img: img,
    },

    {
      title: "هايبر ماركت",
      status: "تم الانتهاء من التعاقد",
      img: img,
      loading,
    },
    {
      title: "ملاهى",
      status: "تم الانتهاء من التعاقد",
      img: img,
      loading,
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
        اختر النشاط التجاري المناسب لك
      </h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {levelsData.map((level, index) => (
          <LevelCard key={index} {...level} />
        ))}
      </div>
    </div>
  );
};

export default Levels;
