import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { cn } from "@/lib/utils";
import { variantStyles } from "./constants";
import { CARD_BACKGROUNDS } from "./backgrounds";
import {
  createCardsSectionCardVariant,
  CARD_HOVER_TRANSITION,
  CARD_HOVER_OFFSET,
  CARD_CTA_TRANSITION,
  CARD_CTA_ARROW_CLASSES,
} from "./animations";
import type { CardsSectionItem } from "./types";

interface CardsSectionCardProps {
  card: CardsSectionItem;
  index: number;
}

export default function CardsSectionCard({ card, index }: CardsSectionCardProps) {
  const styles = variantStyles[card.variant];
  const Icon = card.icon;
  const Background = CARD_BACKGROUNDS[card.background];

  return (
    <AnimatedSection variant={createCardsSectionCardVariant(index)} className="h-full">
      <motion.article
        whileHover={{ y: CARD_HOVER_OFFSET }}
        transition={CARD_HOVER_TRANSITION}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 md:p-7 lg:p-8",
          styles.card,
        )}
      >
        <Background tone={card.backgroundTone} />

        <div className="relative z-10 flex h-full flex-col gap-4">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl backdrop-blur-sm",
                styles.icon,
              )}
            >
              <Icon className="size-6" />
            </div>
            <h3
              className={cn(
                "text-2xl md:text-3xl font-extrabold leading-snug pt-1",
                styles.title,
              )}
            >
              {card.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {card.highlights.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-semibold backdrop-blur-sm",
                  styles.highlight,
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className={cn("text-body-lg md:text-xl leading-relaxed flex-1", styles.body)}>
            {card.description}
          </p>

          <Link
            href={card.link}
            className={cn(
              "inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5",
              "text-base md:text-lg font-bold backdrop-blur-sm",
              CARD_CTA_TRANSITION,
              styles.cta,
            )}
          >
            معرفة المزيد
            <ArrowLeft className={CARD_CTA_ARROW_CLASSES} />
          </Link>
        </div>
      </motion.article>
    </AnimatedSection>
  );
}
