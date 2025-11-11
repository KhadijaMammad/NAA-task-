import { Home, FileText, Image, Settings, Library, Cloud, Building } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#1e293b] min-h-screen text-white p-4 flex flex-col">
      <div className="shrink-0">
        <div className="mb-8 flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">NAA</span>
          </div>
          <span className="font-semibold text-sm">NAA Control Panel</span>
        </div>

        <div className="bg-[#334155] rounded-lg mb-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#475569] rounded-lg transition-colors">
            <Home className="w-4 h-4" />
            <span>NAA Website</span>
          </button>
        </div>

        <nav className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Post</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors"
          >
            <Image className="w-4 h-4" />
            <span>Media Library</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>System Settings</span>
          </a>

          <div className="pt-4">
            <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Library className="w-4 h-4" />
                <span>Library</span>
              </div>
            </button>
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Cloud className="w-4 h-4" />
              <span>Meteorology</span>
            </div>
          </button>

          <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4" />
              <span>Museum</span>
            </div>
          </button>
        </nav>
      </div>
      <div className="grow flex items-end">
        <div className="w-full bg-[#334155] rounded-lg p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">KA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Khayal Ahmadli</p>
            <p className="text-xs text-gray-400 truncate">khahmadli</p>
          </div>
        </div>
      </div>
    </div>
  );
}