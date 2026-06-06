import { Suspense } from "react";
import Heading from "../ui/ReusableComponents/Heading";
import { ProjectsList } from "./ProjectsList";
import { ProjectsLoading } from "./ProjectsLoading";
import { ProjectsError } from "./ProjectsError";
import { ErrorBoundary } from "react-error-boundary";

function OurProjects() {
  return (
    <section id="projects-section" className="sec-padding container">
      <Heading
        title="تطوير عقاري بفكر جديد"
        desc={
          <>
            نطوّر مجتمعات عمرانية متكاملة بأنظمة سداد مرنة، تضم أسواقًا ومراكز
            تجارية وإدارية مُصممة لخدمة الكثافة السكانية، إلى جانب مراكز تعليمية
            تُعدّ الشباب لسوق العمل.
            <br />
            مشروعاتنا ليست مجرد مبانٍ… بل حلول حقيقية لمجتمع متطور
          </>
        }
      />
      <ErrorBoundary FallbackComponent={ProjectsError}>
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

export default OurProjects;
