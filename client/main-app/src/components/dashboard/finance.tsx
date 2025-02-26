'use client';

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Finance() {
    const revenue = 120; // Tổng doanh thu (triệu)
    const growthRate = 10; // % tăng trưởng so với tháng trước
    const isPositiveGrowth = growthRate >= 0;

    return (
        <ResizablePanelGroup 
            direction="horizontal" 
            className="rounded-xl border bg-white hover:shadow-lg transition-shadow shadow-md"
        >
            <ResizablePanel defaultSize={100}>
                <div className="flex h-[200px] flex-col justify-center items-center p-6">
                    <span className="text-lg font-semibold text-gray-800">
                        Tổng Doanh Thu
                    </span>

                    <span className="font-bold text-4xl text-green-600 mt-2">
                        💰 {revenue} triệu
                    </span>

                    <p className={`text-sm mt-2 ${isPositiveGrowth ? "text-green-500" : "text-red-500"}`}>
                        {isPositiveGrowth ? "📈" : "🔻"} So với tháng trước: {growthRate}%
                    </p>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
