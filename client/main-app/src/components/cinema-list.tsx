"use client"

import type { CinemaBranch } from "@/types/index"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Film } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface CinemaListProps {
  cinemas: CinemaBranch[]
}

export default function CinemaList({ cinemas }: CinemaListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("cinema")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCinemas, setFilteredCinemas] = useState(cinemas)

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCinemas(cinemas)
    } else {
      const filtered = cinemas.filter(
        (cinema) =>
          cinema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cinema.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCinemas(filtered)
    }
  }, [searchTerm, cinemas])

  const handleCinemaClick = (cinemaId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("cinema", cinemaId)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-background pt-2 pb-4 z-10">
        <h2 className="text-xl font-bold mb-4">Cinema Branches</h2>
        <Input
          type="text"
          placeholder="Search cinemas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        {filteredCinemas.length > 0 ? (
          filteredCinemas.map((cinema) => (
            <div
              key={cinema._id}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedId === cinema._id ? "bg-primary/10 border-l-4 border-primary" : "bg-card hover:bg-muted/50"
              }`}
              onClick={() => handleCinemaClick(cinema._id)}
            >
              <h3 className="font-bold text-lg">{cinema.name}</h3>
              <div className="flex items-start mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 mt-1 shrink-0" />
                <p>{cinema.address}</p>
              </div>
              {cinema.rooms && cinema.rooms.length > 0 && (
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Film className="h-4 w-4 mr-1 shrink-0" />
                  <p>{cinema.rooms.length} screening rooms</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">No cinemas found matching your search.</div>
        )}
      </div>
    </div>
  )
}

