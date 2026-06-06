"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface YouTubeDialogProps {
  /** معرف فيديو YouTube (الجزء بعد watch?v=) */
  videoId: string;
  /** عنوان يُعرض في header الـ Dialog */
  dialogTitle?: string;
  /** الـ Trigger — أي عنصر قابل للنقر (زر، نص، أيقونة) */
  children: React.ReactNode;
  /** كلاس CSS إضافي على DialogContent */
  contentClassName?: string;
  /**
   * خيارات إضافية لـ iframe YouTube
   * مثال: { autoplay: "1", mute: "1" }
   */
  iframeParams?: Record<string, string>;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * YouTubeDialog — يعرض فيديو YouTube داخل Dialog.
 *
 * الاستخدام:
 * ```tsx
 * <YouTubeDialog videoId="jWCRs6Oc_0g">
 *   <button>شاهد الفيديو</button>
 * </YouTubeDialog>
 * ```
 *
 * يستخدم Dialog من Radix UI الموجود في المشروع.
 * الـ iframe يستخدم lazy loading تلقائياً لتحسين الأداء.
 */
export default function YouTubeDialog({
  videoId,
  dialogTitle = "فيديو المشروع",
  children,
  contentClassName,
  iframeParams = {},
}: YouTubeDialogProps) {

  // ── بناء رابط YouTube embed مع الـ params الإضافية ──────────────────────
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams(iframeParams).toString();
  const embedUrl = params ? `${baseUrl}?${params}` : baseUrl;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent
        className={`w-[95vw] max-w-4xl p-0 overflow-hidden sm:rounded-2xl ${contentClassName ?? ""}`}
      >
        <DialogHeader className="px-4 pt-4 sm:px-6">
          <DialogTitle className="text-base sm:text-lg">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>

        {/* حاوية الفيديو بنسبة 16:9 */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            title={dialogTitle}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
