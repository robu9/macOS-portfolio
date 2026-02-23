import { Desktop } from '@/components/Desktop';
import { WindowManager } from '@/components/WindowManager';
import { AppleBootLoader } from '@/components/AppleBootLoader';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black text-white">
      <AppleBootLoader>
        <Desktop>
          <WindowManager />
        </Desktop>
      </AppleBootLoader>
    </main>
  );
}
