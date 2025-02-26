'use client';

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Ticket() {
    const totalTickets = 500; // Tổng số vé
    const soldTickets = 450; // Số vé đã bán
    const ticketPercentage = (soldTickets / totalTickets) * 100; // Tỷ lệ bán vé

    return (
        <ResizablePanelGroup 
            direction="horizontal" 
            className="rounded-xl border bg-white hover:shadow-lg transition-shadow shadow-md"
        >
            <ResizablePanel defaultSize={100}>
                <div className="flex h-[220px] flex-col justify-center items-center p-6">
                    <span className="text-lg font-semibold text-gray-800">
                        Thống Kê Vé
                    </span>

                    <span className="font-bold text-3xl text-purple-600 mt-2">
                        🎟️ {soldTickets}/{totalTickets} vé
                    </span>

                    <p className="text-sm text-gray-500 mt-2">
                        Tỷ lệ bán: {ticketPercentage.toFixed(0)}%
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                        <div
                            className="bg-purple-500 h-2.5 rounded-full transition-all"
                            style={{ width: `${ticketPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
