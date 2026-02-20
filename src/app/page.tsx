import { Desktop } from '@/components/Desktop';
import { WindowManager } from '@/components/WindowManager';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black text-white">
      <Desktop>
        <WindowManager />
      </Desktop>
    </main>
  );
}
