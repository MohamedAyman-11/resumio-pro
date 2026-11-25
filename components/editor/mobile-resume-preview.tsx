"use client";

import { ChevronUp, Eye, X } from "lucide-react";
import type { ReactNode } from "react";
import type { TResume } from "@/types/resume";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/components/ui/drawer";
import { ResumePreview } from "./resume-preview";

export function MobileResumePreview({
  resume,
  downloadAction,
}: {
  resume: TResume;
  downloadAction: ReactNode;
}) {
  return (
    <div className="xl:hidden">
      <Drawer
        modal={false}
        disablePointerDismissal
        swipeDirection="down"
        snapPoints={[92, 0.92]}
        defaultSnapPoint={92}
        snapToSequentialPoints
      >
        <DrawerTrigger className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-3 text-left text-foreground shadow-xl shadow-foreground/15 backdrop-blur aria-expanded:hidden">
          <DrawerSwipeHandle />
          <span className="flex w-full items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Eye aria-hidden="true" className="size-4 text-primary" />
              Resume preview
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              Swipe up <ChevronUp aria-hidden="true" className="size-4" />
            </span>
          </span>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerViewport className="pointer-events-none flex-col justify-end xl:hidden">
            <DrawerPopup placement="bottom">
              <DrawerContent className="min-h-0">
                <header className="shrink-0 border-b border-border bg-background px-4 pb-3 pt-3 sm:px-6">
                  <DrawerSwipeHandle className="mb-3" />
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <DrawerTitle>Resume preview</DrawerTitle>
                      <DrawerDescription className="mt-0.5">
                        Swipe up to expand · Changes update as you edit
                      </DrawerDescription>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {downloadAction}
                      <DrawerClose
                        aria-label="Close resume preview"
                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <X aria-hidden="true" className="size-4" />
                      </DrawerClose>
                    </div>
                  </div>
                </header>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-preview-stage p-4 sm:p-6">
                  <ResumePreview resume={resume} />
                </div>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}
