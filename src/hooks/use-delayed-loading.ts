"use client";

import { useEffect, useState } from "react";

export function useDelayedLoading(loading: boolean, delayMs = 300) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (loading) {
      timer = setTimeout(() => setShowSkeleton(true), delayMs);
    } else {
      setShowSkeleton(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading, delayMs]);

  return showSkeleton;
}

