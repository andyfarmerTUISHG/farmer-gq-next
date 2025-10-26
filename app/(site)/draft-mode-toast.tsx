"use client";

import { useRouter } from "next/navigation";
import {
  useDraftModeEnvironment,
} from "next-sanity/hooks";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

import { disableDraftMode } from "./server-functions";

export function DraftModeToast() {
  const isPresentationTool = false; // Simplified for compatibility
  const env = useDraftModeEnvironment();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!isPresentationTool) {
      /**
       * We delay the toast in case we're inside Presentation Tool
       */
      const toastId = toast("Draft Mode Enabled", {
        id: "draft-mode-toast",
        description:
          env === "live"
            ? "Content is live, refreshing automatically"
            : "Refresh manually to see changes",
        duration: Infinity,
        action: {
          label: "Disable",
          onClick: () =>
            startTransition(async () => {
              await disableDraftMode();
              startTransition(() => router.refresh());
            }),
        },
      });
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [env, router, isPresentationTool]);

  useEffect(() => {
    if (pending) {
      const toastId = toast.loading("Disabling draft mode...");
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [pending]);

  return null;
}
