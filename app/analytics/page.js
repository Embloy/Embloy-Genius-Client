"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody } from "@/app/components/ui/misc/page";

export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);

  return (
    <EmbloyPageMount className="overflow-hidden">
      <EmbloyPage sandboxed={false}>
        <EmbloyPageBody />
      </EmbloyPage>
    </EmbloyPageMount>
  );
}
