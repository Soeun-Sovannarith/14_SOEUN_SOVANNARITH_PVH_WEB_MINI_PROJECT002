"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastProvider } from "./context/ToastContext";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
