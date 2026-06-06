import ProjectCard from "./ProjectCard";
import type { Project } from "@/features/projects/types";

const projectLinks: Record<number, string> = {
  1: "/abrag-elbadry",
  3: "/city-center",
  4: "/elbadry-trade",
  5: "/abrag-elmadina",
  7: "/gallery-ground",
  12: "/medical-city-center",
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function getProjects(): Promise<Project[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://back.mansoura-eco-build.com";

    const res = await fetch(`${apiUrl}/api/projects`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch projects: ${res.status} ${res.statusText}`,
      );
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      console.error("Invalid data structure:", data);
      throw new Error("Invalid data structure");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Return empty array instead of throwing
  }
}

const cityCenterDescription =
  "سيتي سنتر المنصورة أكبر مول ومركز تجاري بواجهة كبيرة تتخطى الـ100 متر لخدمة سكان الدقهلية والدلتا. موقع مميز واستراتيجي يربط بين اهم مدن الدلتا (دمياط - المنصورة - طنطا - المحلة) ومراكزها (نبروه - طلخا - شرين - بلقاس - راس البر). يوفر لك الفرصة للاستثمار بعوائد ايجارية شهرية او لتملك مساحة تجارية للبدء في مشروع بأقل إمكانيات مع تحقيق أعلى معدل مبيعات لأنه يستهدف 10 مليون مواطن.";

const elbadryDescription =
  "يعتبر مول البدري طفرة واضافة كبيرة للاسواق التجارية بالمنصورة. تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة المطور العقاري للمشروع. اكبر مركز تجاري متعدد الاسواق بالمنصورة وعلي مسطحات بنائية تتجاوز ٢١ الف متر ليكون المقصد الرئيسي لأكتر من ١٠ مليون من ابناء الدقهلية للشراء والتسوق.";

const elbadrySegments = [
  { label: "أبراج البدري", tag: "سكني", href: "/abrag-elbadry" },
  { label: "مول البدري", tag: "تجاري", href: "/elbadry-trade" },
];

const madinaSegments = [
  { label: "أبراج المدينة", tag: "سكني", href: "/abrag-elmadina/residential" },
  { label: "أرض المعارض", tag: "تجاري", href: "/gallery-ground" },
  { label: "المركز التعليمي", tag: "إداري", href: "/vocational-center" },
];

const madinaDescription =
  "مجتمع عمراني متكامل على مساحة 15 ألف متر (سكني - تجاري - عيادات طبية - مجمع تعليمي - إداري). يتكون من عدد 14 عمارة مقسمة على 4 مراحل وعدد يزيد عن 200 وحدة سكنية تتميز بمساحات تناسب الأسرة المصرية تبدأ من 58 متر حتى 159 متر. يحقق المشروع المعادلة الصعبة التي تعطى مساحة وحدة سكنية صغيرة ومتوسطة بمقدم يبدأ من 25% وبالتقسيط على 6 سنوات وبدون فوايد.";

export async function ProjectsList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">لا توجد مشاريع حالياً</p>
      </div>
    );
  }

  const shuffledProjects = shuffleArray(projects).filter((p) => p.id !== 7 && p.id !== 4);

  return (
    <div className="mt-4 w-full md:mt-8 space-y-16">
      {shuffledProjects.map((project, index) => {
        const projectImage = project.imgs?.[0]?.img || "";

        return (
          <ProjectCard
            key={project.id}
            title={project.name}
            description={project.id === 5 ? madinaDescription : project.id === 1 ? elbadryDescription : project.id === 3 ? cityCenterDescription : project.description}
            location={project.location}
            type={project.id === 1 ? "سكني تجاري" : project.type}
            image={projectImage}
            buttonText="تفاصيل أكثر"
            link={projectLinks[project.id] || "#"}
            reverse={index % 2 !== 0}
            priority={index === 0}
            segments={project.id === 5 ? madinaSegments : project.id === 1 ? elbadrySegments : undefined}
          />
        );
      })}
    </div>
  );
}
