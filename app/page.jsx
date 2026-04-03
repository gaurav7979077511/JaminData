import VanshawaliTree from '@/components/VanshawaliTree';
import treeData from '@/data/vanshawali.json';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Vanshawali Family Tree</h1>
        <p className="mt-1 text-sm text-slate-600">
          Expand or collapse any node, pan and zoom on desktop, and use simple list mode on mobile.
        </p>
      </div>
      <VanshawaliTree data={treeData} />
    </div>
  );
}
