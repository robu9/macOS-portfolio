export interface PhotoAsset {
  id: string;
  title: string;
  src: string;
  date: string;
  location: string;
  album: string;
}

export const PHOTO_ASSETS: PhotoAsset[] = [
  { id: "photo-1", title: "Big Sur Horizon", src: "/wallpapers/bigSurHorizon.jpg", date: "Feb 9, 2026", location: "Big Sur Coast", album: "Landscapes" },
  { id: "photo-2", title: "Big Sur Mountains", src: "/wallpapers/bigSurMountains.jpg", date: "Feb 10, 2026", location: "Santa Lucia Range", album: "Landscapes" },
  { id: "photo-3", title: "Big Sur Road", src: "/wallpapers/bigSurRoad.jpg", date: "Feb 10, 2026", location: "Highway 1", album: "Landscapes" },
  { id: "photo-4", title: "Big Sur Valley Dark", src: "/wallpapers/bigSurValley_dark.jpg", date: "Feb 11, 2026", location: "Big Sur Valley", album: "Dark Mode" },
  { id: "photo-5", title: "Big Sur Valley Light", src: "/wallpapers/bigSurValley_light.jpg", date: "Feb 11, 2026", location: "Big Sur Valley", album: "Landscapes" },
  { id: "photo-6", title: "Big Sur Dark", src: "/wallpapers/bigsur_dark.jpg", date: "Feb 12, 2026", location: "California Coast", album: "Dark Mode" },
  { id: "photo-7", title: "Big Sur Light", src: "/wallpapers/bigsur_light.jpg", date: "Feb 12, 2026", location: "California Coast", album: "Landscapes" },
  { id: "photo-8", title: "iPadOS Dark", src: "/wallpapers/iPadOS_dark.jpg", date: "Feb 14, 2026", location: "Cupertino", album: "Dark Mode" },
  { id: "photo-9", title: "iPadOS Light", src: "/wallpapers/iPadOS_light.jpg", date: "Feb 14, 2026", location: "Cupertino", album: "Abstract" },
  { id: "photo-10", title: "Iridescence Dark", src: "/wallpapers/iridescence_dark.jpg", date: "Feb 15, 2026", location: "Apple Park", album: "Dark Mode" },
  { id: "photo-11", title: "Iridescence Light", src: "/wallpapers/iridescence_light.jpg", date: "Feb 15, 2026", location: "Apple Park", album: "Abstract" },
  { id: "photo-12", title: "Real Big Sur Dark", src: "/wallpapers/realbigsur_dark.jpg", date: "Feb 16, 2026", location: "Monterey County", album: "Dark Mode" },
  { id: "photo-13", title: "Real Big Sur Light", src: "/wallpapers/realbigsur_light.jpg", date: "Feb 16, 2026", location: "Monterey County", album: "Landscapes" },
];
