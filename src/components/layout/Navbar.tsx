"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { IconButton } from "../ui/ReusableComponents/IconButton";
import MobileMenu from "./MobileMenu";

const links: Array<{ path: string; label: string; authRequired?: boolean }> = [
  { path: "/", label: "الرئيسية" },
  { path: "/our-projects", label: "المشاريع" },
  { path: "/about-us", label: "من نحن" },
  { path: "/work-with-us", label: "علاقاتك استثمارك" },
  {
    path: "/investment?start=1",
    label: "الإستثمار العقاري",
  },
  {
    path: "/jobs",
    label: "اعمل معنا",
  },
];

export default function ClientNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-60 transition-all duration-500 text-white ${
          scrolled
            ? "backdrop-blur-md bg-white/70 shadow-sm"
            : "bg-white backdrop-blur-none"
        }`}
      >
        <div className="container mx-auto ">
          <div className="flex items-center justify-between py-2 text-sm border-b border-white/10">
            <div className="flex items-center  flex-row-reverse justify-between! w-full gap-4">
              {/* Logo */}
              <Link href="/" className="shrink-0">
                <h1>
                  {" "}
                  <Image
                    width={60}
                    height={60}
                    src="/assets/layout/logo.png"
                    alt="إسكان المنصورة"
                    quality={40}
                    priority
                    sizes="(max-width: 768px) 55px, 64px"
                    className="md:w-16 md:h-16 w-[55px] h-[55px] transition-transform duration-500 hover:scale-105"
                  />
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                {links.map((link) => {
                  const linkPath = link.path.split("?")[0];
                  const isActive = pathname === linkPath;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-sm xl:text-base transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-[#285240] font-medium"
                          : "text-[#6B7280] hover:text-[#285240]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="lg:hidden">
                <IconButton
                  size="lg"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:p-2 p-0 rounded-md lg:hidden"
                  icon={<Menu className="w-6 h-6 " />}
                  ariaLabel="Open menu"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
      />
    </>
  );
}
