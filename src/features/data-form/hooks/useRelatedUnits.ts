"use client";

import { useState, useEffect, useCallback } from "react";
import type { RelatedUnit, UnitType } from "../types";
import { dataFormService } from "../services";
import {
  RESIDENTIAL_OPTIONS,
  COMMERCIAL_OPTIONS,
  parseDownPaymentRange,
} from "../constants";

interface UseRelatedUnitsReturn {
  relatedUnits: RelatedUnit[];
  selectedUnitId: number | null;
  isLoading: boolean;
  handleSelectUnit: (unitId: number) => void;
  resetUnits: () => void;
}

export function useRelatedUnits(
  unitType: UnitType,
  residentialArea: string,
  commercialArea: string,
  medicalDuration: string,
): UseRelatedUnitsReturn {
  const [relatedUnits, setRelatedUnits] = useState<RelatedUnit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetUnits = useCallback(() => {
    setRelatedUnits([]);
    setSelectedUnitId(null);
  }, []);

  const handleSelectUnit = useCallback((unitId: number) => {
    setSelectedUnitId((prev) => (prev === unitId ? null : unitId));
  }, []);

  // Residential units
  useEffect(() => {
    if (unitType !== "سكني" || !residentialArea) {
      if (unitType === "سكني") resetUnits();
      return;
    }

    const areaData = RESIDENTIAL_OPTIONS[residentialArea];
    if (!areaData) return;

    const [min, max] = parseDownPaymentRange(areaData.downPayment);
    let cancelled = false;

    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        const units = await dataFormService.getRelatedUnitsByDownPayment(
          min,
          max,
          "سكني",
        );
        if (!cancelled) {
          setRelatedUnits(units);
          setSelectedUnitId(null);
        }
      } catch (err) {
        console.error("Error fetching residential units:", err);
        if (!cancelled) resetUnits();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchUnits();
    return () => {
      cancelled = true;
    };
  }, [unitType, residentialArea, resetUnits]);

  // Commercial units
  useEffect(() => {
    if (unitType !== "تجاري" || !commercialArea) {
      if (unitType === "تجاري") resetUnits();
      return;
    }

    const option = COMMERCIAL_OPTIONS[commercialArea];
    if (!option) return;

    const [min, max] = parseDownPaymentRange(option.downPayment);
    let cancelled = false;

    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        const units = await dataFormService.getRelatedUnitsByDownPayment(
          min,
          max,
          "تجاري",
        );
        if (!cancelled) {
          setRelatedUnits(units);
          setSelectedUnitId(null);
        }
      } catch (err) {
        console.error("Error fetching commercial units:", err);
        if (!cancelled) resetUnits();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchUnits();
    return () => {
      cancelled = true;
    };
  }, [unitType, commercialArea, resetUnits]);

  // Medical units
  useEffect(() => {
    if (unitType !== "طبي") return;

    resetUnits();

    if (medicalDuration !== "تقسيط علي 6 سنين (استلام بعد سنتين)") return;

    let cancelled = false;

    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        const units = await dataFormService.getRelatedUnitsByDuration(
          "سنتين",
          "طبي",
        );
        if (!cancelled) setRelatedUnits(units);
      } catch (err) {
        console.error("Error fetching medical units:", err);
        if (!cancelled) resetUnits();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchUnits();
    return () => {
      cancelled = true;
    };
  }, [unitType, medicalDuration, resetUnits]);

  return {
    relatedUnits,
    selectedUnitId,
    isLoading,
    handleSelectUnit,
    resetUnits,
  };
}
