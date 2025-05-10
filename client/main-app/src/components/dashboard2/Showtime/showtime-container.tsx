"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { ShowtimesFilter } from "./showtimes-filter";
import { ShowtimesTable } from "./showtimes-table";
import { Showtime } from "../../../types";

;

interface ShowtimesContainerProps {
    showtimes: Showtime[];
    theaterOptions: Array<{ key: string; value: string; label: string }>;
    refreshData: () => Promise<void>;
}
export function ShowtimesContainer({ refreshData, showtimes, theaterOptions }: ShowtimesContainerProps) {
    const [filteredShowtimes, setFilteredShowtimes] = useState<Showtime[]>(showtimes);
    return (
        <div className="container mx-auto py-6 space-y-6">
            <Card className="animate-slide-down shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                    <CardTitle>Bộ lọc lịch chiếu</CardTitle>
                    <CardDescription>
                        Lọc lịch chiếu theo rạp, phim và thời gian
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ShowtimesFilter
                        refreshData={refreshData}
                        showtimes={showtimes}
                        setFilteredShowtimes={setFilteredShowtimes}
                        theaterOptions={theaterOptions}
                    />
                </CardContent>
            </Card>

            <Card className="animate-slide-up shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                    <CardTitle>Danh sách lịch chiếu</CardTitle>
                    <CardDescription>
                        Có tổng cộng <span className="font-medium text-primary">{showtimes?.length}</span> lịch chiếu trong hệ thống
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="animate-fade-in">
                        <ShowtimesTable data={filteredShowtimes} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}