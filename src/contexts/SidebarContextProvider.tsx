import { useLocalStorage } from "@/hooks/use-localStorage";
import { SidebarContext, SidebarSettings } from "@/hooks/use-sidebar";

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorage('sidebar', {
    isOpen: true,
    isHover: false,
    settings: { disabled: false, isHoverOpen: false }
  });

  const toggleOpen = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const setIsOpen = (isOpen: boolean) => {
    setState(prev => ({ ...prev, isOpen }));
  };

  const setIsHover = (isHover: boolean) => {
    setState(prev => ({ ...prev, isHover }));
  };

  const getOpenState = () => {
    return state.isOpen || (state.settings.isHoverOpen && state.isHover);
  };

  const setSettings = (settings: Partial<SidebarSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  const value = {
    ...state,
    toggleOpen,
    setIsOpen,
    setIsHover,
    getOpenState,
    setSettings
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};


export default SidebarProvider