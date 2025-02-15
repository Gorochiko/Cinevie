'use client';
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
export default function Finance(){
    return(
        <ResizablePanelGroup direction="horizontal" className="rounded-lg border hover:shadow-md transition-shadow shadow-sm bg-white">
          <ResizablePanel defaultSize={100}>
            <div className="flex h-[200px] items-center flex-col justify-center p-6">
              <span className="text-lg font-medium text-gray-700">Tổng Doanh Thu</span>
              <span className="font-semibold text-3xl text-green-600 mt-2">💰 120 triệu</span>
              <p className="text-sm text-gray-500 mt-2">So với tháng trước: +10%</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
    );
}