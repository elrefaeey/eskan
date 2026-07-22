"use client";

import { BrandSpinner } from "@/components/common/BrandSpinner";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import SalesUserForm from "./SalesUserForm";
import SalesPageHero from "./SalesPageHero";
import SalesAgentCard from "./SalesAgentCard";
import SalesProjectBrief from "./SalesProjectBrief";
import SalesPageUnavailable from "./SalesPageUnavailable";
import { useSalesSite } from "../hooks/useSalesSite";
import { LEAD_FORM_DELAY } from "../animations";

interface SalesPageUserProps {
  userId: string | null;
  projectId: string | null;
}

function SalesPageUser({ userId, projectId }: SalesPageUserProps) {
  const isInvalid = !userId || !projectId;
  const { data, isLoading, isError } = useSalesSite(userId, projectId);

  if (isInvalid) {
    return <SalesPageUnavailable />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <BrandSpinner size="md" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <SalesPageUnavailable
        title="تعذر تحميل الصفحة"
        description="تعذر تحميل بيانات مسؤول المبيعات أو المشروع. تأكد من صحة الرابط وحاول مرة أخرى."
      />
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(31,80,59,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(31,80,59,0.06),_transparent_45%)]"
      />

      <SalesPageHero
        name={data.sellproject.name}
        img={data.sellproject.img}
      />

      <div className="container relative z-20 mx-auto -mt-8 px-4 md:-mt-12 md:px-6">
        <SalesAgentCard user={data.user} />

        <SalesProjectBrief description={data.sellproject.description} />

        <AnimatedSection delay={LEAD_FORM_DELAY} className="sec-padding">
          <SalesUserForm
            userId={userId}
            projectId={projectId}
            user={data.user}
          />
        </AnimatedSection>
      </div>
    </div>
  );
}

export default SalesPageUser;
