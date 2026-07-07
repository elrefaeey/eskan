"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import successAnimation from "@/assets/lottie/Success animation.json"; // هنا حط ملف lottie الخاص بالنجاح

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title = "تم بنجاح",
  message,
}: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white shadow-2xl rounded-2xl p-6 animate-modalIn">
        <DialogHeader className="flex flex-col items-center">
          <div className="mb-4 h-32 w-32">
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoplay
            />
          </div>
          <DialogTitle className="text-center text-2xl font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-1">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-green-700 text-white px-8 py-2 rounded-lg transition-all"
          >
            حسناً
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
