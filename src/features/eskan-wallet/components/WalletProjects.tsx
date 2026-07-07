"use client";
import useProjectsWallet from "../hooks/useProjectsWallet";
import ProjectSkeleton from "./ProjectSkeleton";
import WalletProjectCard from "./WalletProjectCard";

function WalletProjects() {
  const { data, isLoading } = useProjectsWallet();
  return (
    <section className="sec-padding">
      {" "}
      <h2
        className="text-xl lg:text-3xl bold text-[rgba(85,139,47,1)] h2"
      >
        معرض المشاريع
      </h2>
      {/* Projects */}
      <div className="grid lg:grid-cols-3 lg:gap-3 gap-4 mt-4">
        {isLoading ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : (
          data?.map((project) => (
            <WalletProjectCard data={project} key={project.id} />
          ))
        )}
      </div>
    </section>
  );
}

export default WalletProjects;
