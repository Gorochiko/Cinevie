'use client';
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
export default function Ticket(){
    return(
        <ResizablePanelGroup direction="horizontal" className="rounded-lg hover:shadow-md transition-shadow border shadow-sm bg-white">
          <ResizablePanel defaultSize={100}>
            <div className="flex h-[200px] items-center flex-col justify-center p-6">
              <span className="text-lg font-medium text-gray-700">Thống Kê Vé</span>
              <span className="font-semibold text-3xl text-purple-600 mt-2">🎟️ 450/500 vé</span>
              <p className="text-sm text-gray-500 mt-2">Tỷ lệ bán: 90%</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
    );
}