'use client';
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ChartData from "../chardComponents";
export default function chartTicket(){
    return(
        <ResizablePanelGroup direction="horizontal" className="rounded-lg border hover:shadow-md transition-shadow shadow-sm bg-white">
          <ResizablePanel defaultSize={100}>
            <div className="flex h-[350px] flex-col justify-center items-center p-6">
              <span className="text-lg font-medium text-gray-700 mb-4">Biểu đồ doanh thu theo tháng</span>
              {/* Placeholder for chart */}
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500"><ChartData/></span>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
    );
}