"use client"

import { useEffect, useState, useRef } from "react"
import type { CinemaBranch } from "@/types/index"
import { useSearchParams, useRouter } from "next/navigation"

interface CinemaMapProps {
  cinemas: CinemaBranch[]
}

declare global {
  interface Window {
    initMap: () => void
    google: any
  }
}

export default function CinemaMap({ cinemas }: CinemaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("cinema")

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const { Map } = (await window.google.maps.importLibrary("maps")) as google.maps.MapsLibrary

      const mapOptions: google.maps.MapOptions = {
        center: { lat: 10.8231, lng: 106.6297 }, // Default center (Ho Chi Minh City)
        zoom: 12,
        mapId: "CINEMA_MAP",
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
      }

      const newMap = new Map(mapRef.current, mapOptions)
      setMap(newMap)
    }

    // Load Google Maps script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker&callback=initMap`
    script.async = true
    script.defer = true
    window.initMap = initMap as any
    document.head.appendChild(script)

    return () => {
      window.initMap = undefined
      document.head.removeChild(script)
    }
  }, [])

  // Add markers when map is loaded
  useEffect(() => {
    if (!map) return

    // Clear existing markers and info windows
    markers.forEach((marker) => marker.setMap(null))
    infoWindows.forEach((infoWindow) => infoWindow.close())

    const newMarkers: google.maps.Marker[] = []
    const newInfoWindows: google.maps.InfoWindow[] = []

    cinemas.forEach((cinema) => {
      if (cinema.lat && cinema.lng) {
        const marker = new window.google.maps.Marker({
          position: { lat: cinema.lat, lng: cinema.lng },
          map,
          title: cinema.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: "/movie-marker.svg",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        })

        const roomsInfo =
          cinema.rooms && cinema.rooms.length > 0 ? `<p class="mt-1">${cinema.rooms.length} screening rooms</p>` : ""

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold">${cinema.name}</h3>
              <p>${cinema.address}</p>
              ${roomsInfo}
            </div>
          `,
        })

        marker.addListener("click", () => {
          // Close all info windows
          newInfoWindows.forEach((iw) => iw.close())

          // Open this info window
          infoWindow.open(map, marker)

          // Update URL with cinema ID without refreshing the page
          const params = new URLSearchParams(searchParams.toString())
          params.set("cinema", cinema._id)
          router.replace(`?${params.toString()}`, { scroll: false })
        })

        newMarkers.push(marker)
        newInfoWindows.push(infoWindow)
      }
    })

    setMarkers(newMarkers)
    setInfoWindows(newInfoWindows)

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null))
      newInfoWindows.forEach((infoWindow) => infoWindow.close())
    }
  }, [map, cinemas, searchParams, router])

  // Handle selected cinema from URL
  useEffect(() => {
    if (!map || !selectedId) return

    const cinema = cinemas.find((c) => c._id === selectedId)

    if (cinema && cinema.lat && cinema.lng) {
      map.panTo({ lat: cinema.lat, lng: cinema.lng })
      map.setZoom(15)

      // Find and open the info window for this cinema
      const index = cinemas.findIndex((c) => c._id === selectedId)
      if (index !== -1 && markers[index] && infoWindows[index]) {
        infoWindows.forEach((iw) => iw.close())
        infoWindows[index].open(map, markers[index])
      }
    }
  }, [selectedId, map, cinemas, markers, infoWindows])

  return <div ref={mapRef} className="w-full h-full" />
}

