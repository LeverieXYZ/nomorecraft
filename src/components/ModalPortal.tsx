"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}
