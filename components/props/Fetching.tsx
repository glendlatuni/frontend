"use client";

import React, { useEffect, useState } from "react";
import { countUser, countKeluarga } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton"


interface CountsProps {
  type: "familyCount" | "memberCount";
}

const Counts: React.FC<CountsProps> = ({ type }) => {
  const [familyCount, setFamilyCount] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyCount = await countKeluarga();
        const memberCount = await countUser();
        setFamilyCount(familyCount);
        setMemberCount(memberCount);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Skeleton className="h-12 w-12 rounded-full" />
  if (error) return <div className="text-red-500 text-lg">{error}</div>;

  const dataToShow = type === "familyCount" ? familyCount : memberCount;

  return <>{dataToShow}</>;
};

export default Counts;
