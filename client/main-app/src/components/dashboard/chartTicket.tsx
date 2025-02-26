'use client';

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ChartData from "../chardComponents";

export default function ChartTicket() {
    return (
        <ResizablePanelGroup 
            direction="horizontal" 
            className="rounded-xl border bg-white hover:shadow-lg transition-shadow shadow-md"
        >
            <ResizablePanel defaultSize={100}>
                <div className="flex h-[350px] flex-col justify-center items-center p-6">
                    <span className="text-xl font-semibold text-gray-800 mb-4">
                        Biểu đồ vé bán theo tháng
                    </span>
                    
                    {/* Chart Container */}
                    <div className="w-full h-64 bg-gray-50 rounded-xl flex items-center justify-center shadow-sm">
                        <ChartData />
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
