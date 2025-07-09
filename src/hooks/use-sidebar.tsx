'use client'
import { createContext, useContext } from 'react';

export type SidebarSettings = {
  disabled: boolean;
  isHoverOpen: boolean;
};

export type SidebarContextType = {
  isOpen: boolean;
  isHover: boolean;
  settings: SidebarSettings;
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHover: (isHover: boolean) => void;
  getOpenState: () => boolean;
  setSettings: (settings: Partial<SidebarSettings>) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
