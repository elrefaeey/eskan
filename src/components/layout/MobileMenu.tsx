"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ path: string; label: string; authRequired?: boolean }>;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: {
      x: 1000,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: custom * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  const handleLinkClick = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-12227 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar Menu */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-1222222 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#285240]">القائمة</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {links.map((link, index) => {
                    const isActive = pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        custom={index}
                        variants={itemVariants}
                      >
                        <button
                          onClick={() => handleLinkClick(link.path)}
                          className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-[#285240] text-white font-medium"
                              : "text-[#6B7280] hover:bg-gray-100"
                          }`}
                        >
                          {link.label}
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
