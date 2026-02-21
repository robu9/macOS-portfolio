import { create } from 'zustand';

export type AppId =
  | 'finder'
  | 'safari'
  | 'vscode'
  | 'spotify'
  | 'calendar'
  | 'terminal'
  | 'messages'
  | 'feedback'
  | 'about'
  | 'sysPref';

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

  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  bringToTop: (id: AppId) => void;
  toggleApp: (id: AppId, property: keyof Omit<AppState, 'id'>) => void;
  setAppProperty: (id: AppId, property: keyof Omit<AppState, 'id'>, value: boolean) => void;
}

const initialApps: AppState[] = [
  { id: 'finder', isOpen: true, isMax: false, isFS: false, isPan: false },
  { id: 'safari', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'vscode', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'spotify', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'calendar', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'terminal', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'messages', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'feedback', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'about', isOpen: false, isMax: false, isFS: false, isPan: false },
  { id: 'sysPref', isOpen: false, isMax: false, isFS: false, isPan: false },
];

const getAppTitle = (id: AppId) => {
  const map: Record<AppId, string> = {
    finder: "Finder",
    safari: "Safari",
    vscode: "VS Code",
    spotify: "Spotify",
    calendar: "Calendar",
    terminal: "Terminal",
    messages: "Messages",
    feedback: "Feedback",
    about: "About Me",
    sysPref: "System Preferences"
  };
  return map[id];
};

export const useStore = create<MacState>((set, get) => ({
  onTop: "Finder",
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
  ccOpen: false,
  fsAni: false,
  rightClickMenu: false,
  folderRightClickMenu: false,
  notificationOn: false,
  launchPadOn: false,
  spotlightOpen: false,
  activeMenu: '',
  apps: initialApps,
  activeApps: ['finder'],

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

  openApp: (id) => set((state) => {
    const isActive = state.activeApps.includes(id);
    return {
      activeApps: isActive ? state.activeApps : [...state.activeApps, id],
      apps: state.apps.map(app => app.id === id ? { ...app, isOpen: true, isMax: false } : app),
      onTop: getAppTitle(id)
    };
  }),

  closeApp: (id) => set((state) => {
    const newActiveApps = state.activeApps.filter(a => a !== id);
    return {
      activeApps: newActiveApps,
      apps: state.apps.map(app => app.id === id ? { ...app, isOpen: false, isFS: false, isMax: false, isPan: false } : app),
      onTop: newActiveApps.length > 0 ? getAppTitle(newActiveApps[newActiveApps.length - 1]) : "Finder",
      ...(state.fs === getAppTitle(id) ? { fs: "" } : {})
    };
  }),


  bringToTop: (id) => set((state) => ({
    onTop: getAppTitle(id),
    activeApps: [...state.activeApps.filter(a => a !== id), id]
  })),

  toggleApp: (id, property) => set((state) => ({
    apps: state.apps.map(app => app.id === id ? { ...app, [property]: !app[property] } : app),
    ...(property === 'isFS' ? { fs: state.apps.find(a => a.id === id)?.[property] ? "" : getAppTitle(id) } : {})
  })),

  setAppProperty: (id, property, value) => set((state) => ({
    apps: state.apps.map(app => app.id === id ? { ...app, [property]: value } : app),
    ...(property === 'isFS' && value ? { fs: getAppTitle(id) } : property === 'isFS' && !value ? { fs: "" } : {})
  })),

}));
