import { Desktop } from '@/components/Desktop';
import { WindowManager } from '@/components/WindowManager';
import { AppleBootLoader } from '@/components/AppleBootLoader';
import { DeviceCompatibilityGate } from '@/components/DeviceCompatibilityGate';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black text-white">
      <DeviceCompatibilityGate>
        <AppleBootLoader>
          <Desktop>
            <WindowManager />
          </Desktop>
        </AppleBootLoader>
      </DeviceCompatibilityGate>
    </main>
  );
}
