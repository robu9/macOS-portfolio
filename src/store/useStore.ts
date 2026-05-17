import { create } from 'zustand';

export type AppId =
  | 'finder'
  | 'safari'
  | 'vscode'
  | 'calendar'
  | 'terminal'
  | 'messages'
  | 'feedback'
  | 'about'
  | 'sysPref'
  | 'photos'
  | 'maps'
  | 'contacts'
  | 'notes'
  | 'buymeacoffee'
  | 'calculator'
  | 'spotify';

export interface AppState {
  id: AppId;
  isOpen: boolean;
  isMax: boolean;
  isFS: boolean;
  isPan: boolean;
}

export interface Notification {
  notification: string;
  url: string;
  app: string;
  head: string;
}

export type AboutSection = 'About' | 'Skills' | 'Projects' | 'Resume';

interface MacState {
  // DataBus equivalents
  onTop: string;
  fs: string;
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  pointerPos: { x: number; y: number };
  nightShift: boolean;
  scale: number;
  notification: Notification;
  wallpaper: string; // Store asset path or key
  darkTheme: boolean;
  aboutSection: AboutSection;

  // OnOff equivalents (Globals)
  ccOpen: boolean;
  fsAni: boolean;
  rightClickMenu: boolean;
  folderRightClickMenu: boolean;
  notificationOn: boolean;
  launchPadOn: boolean;
  spotlightOpen: boolean;
  activeMenu: string;

  // Apps equivalents
  apps: AppState[];
  activeApps: AppId[]; // Apps currently running (in Dock)

  // Actions
  setBrightness: (val: number) => void;
  setVolume: (val: number) => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  toggleAirdrop: () => void;
  setPos: (x: number, y: number) => void;
  setNotification: (notif: Notification) => void;
  toggleNightShift: () => void;
  changeScale: (scale: number) => void;
  setWallpaper: (wallpaper: string) => void;
  toggleDarkTheme: () => void;

  toggleCc: () => void;
  offCc: () => void;
  toggleLaunchPad: () => void;
  offLaunchPad: () => void;
  onRCM: () => void;
  offRCM: () => void;
  onFRCM: () => void;
  offFRCM: () => void;
  onNotifications: () => void;
  offNotifications: () => void;
  toggleSpotlight: () => void;
  offSpotlight: () => void;
  setActiveMenu: (menu: string) => void;
  setAboutSection: (section: AboutSection) => void;

  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  bringToTop: (id: AppId) => void;
  toggleApp: (id: AppId, property: keyof Omit<AppState, 'id'>) => void;
  setAppProperty: (id: AppId, property: keyof Omit<AppState, 'id'>, value: boolean) => void;
}

const initialApps: AppState[] = [
  { id: 'finder', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'safari', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'vscode', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'photos', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'maps', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'contacts', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'notes', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'buymeacoffee', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'calendar', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'terminal', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'messages', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'feedback', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'about', isOpen: true, isMax: false, isFS: false, isPan: false },
  { id: 'sysPref', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'calculator', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'spotify', isOpen: false, isMax: false, isFS: false, isPan: false },
];

export const getAppTitle = (id: AppId) => {
  const map: Record<AppId, string> = {
    finder: "Finder",
    safari: "Safari",
    vscode: "VS Code",
    photos: "Photos",
    maps: "Maps",
    contacts: "Contacts",
    notes: "Notes",
    buymeacoffee: "Buy Me a Coffee",
    calendar: "Calendar",
    terminal: "Terminal",
    messages: "Messages",
    feedback: "Feedback",
    about: "About Me",
    sysPref: "System Preferences",
    calculator: "Calculator",
    spotify: "Spotify"
  };
  return map[id];
};

const getTopVisibleAppId = (activeApps: AppId[], apps: AppState[]): AppId | null => {
  for (let i = activeApps.length - 1; i >= 0; i--) {
    const appId = activeApps[i];
    const appState = apps.find((app) => app.id === appId);
    if (appState?.isOpen && !appState.isPan) {
      return appId;
    }
  }
  return null;
};

export const useStore = create<MacState>((set) => ({
  onTop: "About Me",
  fs: "",
  brightness: 95.98,
  volume: 80,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  pointerPos: { x: 0, y: 0 },
  nightShift: false,
  scale: 1,
  notification: {
    notification: "Welcome to Robu's MacBook Pro",
    url: "https://github.com/robu9",
    app: "apple",
    head: "Welcome"
  },
  wallpaper: 'monterey',
  darkTheme: false,
  aboutSection: 'About',
  ccOpen: false,
  fsAni: false,
  rightClickMenu: false,
  folderRightClickMenu: false,
  notificationOn: false,
  launchPadOn: false,
  spotlightOpen: false,
  activeMenu: '',
  apps: initialApps,
  activeApps: ['about'],

  setBrightness: (val) => set({ brightness: val }),
  setVolume: (val) => set({ volume: val }),
  toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
  toggleAirdrop: () => set((state) => ({ airdrop: !state.airdrop })),
  setPos: (x, y) => set({ pointerPos: { x, y } }),
  setNotification: (notif) => set({ notification: notif }),
  toggleNightShift: () => set((state) => ({ nightShift: !state.nightShift })),
  changeScale: (scale) => {
    let newScale = scale;
    if (newScale < 0) newScale = 0;
    else if (newScale > 1) newScale = 1;
    newScale = 1 - ((1 - newScale) * 0.08);
    set({ scale: newScale });
  },
  setWallpaper: (wallpaper) => set({ wallpaper }),
  toggleDarkTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),

  toggleCc: () => set((state) => ({ ccOpen: !state.ccOpen })),
  offCc: () => set({ ccOpen: false }),
  toggleLaunchPad: () => set((state) => ({ launchPadOn: !state.launchPadOn })),
  offLaunchPad: () => set({ launchPadOn: false }),
  onRCM: () => set({ rightClickMenu: true }),
  offRCM: () => set({ rightClickMenu: false }),
  onFRCM: () => set({ folderRightClickMenu: true }),
  offFRCM: () => set({ folderRightClickMenu: false }),
  onNotifications: () => set({ notificationOn: true }),
  offNotifications: () => set({ notificationOn: false }),
  toggleSpotlight: () => set((state) => ({ spotlightOpen: !state.spotlightOpen })),
  offSpotlight: () => set({ spotlightOpen: false }),
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setAboutSection: (section) => set({ aboutSection: section }),

  openApp: (id) => set((state) => {
    const activeApps = [...state.activeApps.filter((appId) => appId !== id), id];
    const apps = state.apps.map(app => app.id === id ? { ...app, isOpen: true, isMax: false, isPan: false } : app);

    return {
      activeApps,
      apps,
      onTop: getAppTitle(id)
    };
  }),

  closeApp: (id) => set((state) => {
    const activeApps = state.activeApps.filter((appId) => appId !== id);
    const apps = state.apps.map(app => app.id === id ? { ...app, isOpen: false, isFS: false, isMax: false, isPan: false } : app);
    const nextTopVisibleAppId = getTopVisibleAppId(activeApps, apps);

    return {
      activeApps,
      apps,
      onTop: nextTopVisibleAppId ? getAppTitle(nextTopVisibleAppId) : "Finder",
      ...(state.fs === getAppTitle(id) ? { fs: "" } : {})
    };
  }),


  bringToTop: (id) => set((state) => ({
    onTop: getAppTitle(id),
    activeApps: [...state.activeApps.filter(a => a !== id), id]
  })),

  toggleApp: (id, property) => set((state) => {
    const currentApp = state.apps.find((app) => app.id === id);
    if (!currentApp) return {};

    const nextValue = !currentApp[property];
    const apps = state.apps.map(app => app.id === id ? { ...app, [property]: nextValue } : app);
    const updates: Partial<MacState> = { apps };

    if (property === 'isFS') {
      updates.fs = currentApp.isFS ? "" : getAppTitle(id);
    }

    if (property === 'isPan') {
      if (nextValue) {
        const nextTopVisibleAppId = getTopVisibleAppId(state.activeApps, apps);
        updates.onTop = nextTopVisibleAppId ? getAppTitle(nextTopVisibleAppId) : "Finder";
      } else {
        updates.activeApps = [...state.activeApps.filter((appId) => appId !== id), id];
        updates.onTop = getAppTitle(id);
      }
    }

    return updates;
  }),

  setAppProperty: (id, property, value) => set((state) => {
    const apps = state.apps.map(app => app.id === id ? { ...app, [property]: value } : app);
    const updates: Partial<MacState> = { apps };

    if (property === 'isFS') {
      updates.fs = value ? getAppTitle(id) : "";
    }

    if (property === 'isPan') {
      if (value) {
        const nextTopVisibleAppId = getTopVisibleAppId(state.activeApps, apps);
        updates.onTop = nextTopVisibleAppId ? getAppTitle(nextTopVisibleAppId) : "Finder";
      } else {
        updates.activeApps = [...state.activeApps.filter((appId) => appId !== id), id];
        updates.onTop = getAppTitle(id);
      }
    }

    return updates;
  }),

}));
