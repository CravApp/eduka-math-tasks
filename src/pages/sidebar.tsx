import React from "react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Sidebar = ({ children, onClose }: SidebarProps) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        role="button"
        aria-label="Close sidebar"
      />
      <div
        className={cn(
          "relative w-80 bg-card text-foreground shadow-lg transition-transform transform translate-x-0"
        )}
      >
        <button
          className="absolute top-4 right-4 text-muted-foreground"
          onClick={onClose}
        >
          Cerrar
        </button>
        {children}
      </div>
    </div>
  );
};