import CardsSections from "@/components/home/CardsSections";
import Hero from "@/components/home/Hero";
import OurProjects from "@/components/home/OurProjects";
import OwnersAssociation from "@/components/home/OwnersAssociation";
import ContactUsForm from "@/features/contact-us/components/ContactUsForm";
import PartenerSection from "@/components/home/PartenerSection";

const Page = () => {
  return (
    <>
      <main className="min-h-screen page">
        <Hero />
        <OurProjects />
        <PartenerSection/>
        <OwnersAssociation />
        <CardsSections />
        <ContactUsForm />
      </main>
    </>
  );
};

export default Page;
