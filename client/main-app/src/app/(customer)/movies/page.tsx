"use client"
import { formatDate } from "@/lib/utils"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film } from "@/types/index"
import { getFilms } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { LoadingCatSimple } from "@/components/loading/loadingDot"
import Image from "next/image"
import { Search, Clock, Calendar, FilmIcon } from "lucide-react"
import { convertDateFormat } from "@/lib/utils"
export default function FilmListPage() {
  const [films, setFilms] = useState<Film[]>([])
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [regexError, setRegexError] = useState("")
  const router = useRouter()

  // Fetch films on component mount
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setIsLoading(true)
        const response = await getFilms()
        const filmData = response.results || []
        setFilms(filmData)
        setFilteredFilms(filmData)
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phim:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFilms()
  }, [])

  // Memoized regex to avoid recreating on every render
  const regex = useMemo(() => {
    if (!searchTerm) return null
    try {
      setRegexError("")
      return new RegExp(searchTerm, "i") // Case-insensitive
    } catch (error) {
      setRegexError("🔴 Lỗi: Regex không hợp lệ")
      return null
    }
  }, [searchTerm])

  // Filter films based on search term (regex) and category
  useEffect(() => {
    const filterFilms = () => {
      return films.filter((film) => {
        const formattedSearch = convertDateFormat(searchTerm) 
        const matchesTitle = regex?.test(film.title) ?? true
        const matchesDate = regex?.test(film.onStage) || film.onStage === formattedSearch
        const matchesDescription = regex?.test(film.description) ?? true
        const matchesTimeLength = regex?.test(film.timeLength.toString()) ?? true
        const matchesAge = regex?.test(film.age.toString()) ?? true
        // const matchesCategory = activeCategory === "all" || film.genre?.includes(activeCategory)
  
        return ( matchesTitle || matchesDate || matchesDescription || matchesTimeLength || matchesAge) 
      })
    }

    setFilteredFilms(filterFilms())
  }, [films, regex, activeCategory])

  // // Extract unique genres from films
  // const genres = useMemo(() => [...new Set(films.flatMap((film) => film.genre || []))], [films])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-20" />
        <div
          className="relative h-[40vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="container mx-auto px-4 absolute inset-0 z-30 flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
          >
            Khám Phá Thế Giới Điện Ảnh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl text-gray-200 mb-8"
          >
            Trải nghiệm những bộ phim đặc sắc và hấp dẫn nhất
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 -mt-16 relative z-40">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-xl mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="🔍 Tìm kiếm phim theo tiêu đề, ngày hoặc nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-red-500"
              />
              {regexError && <p className="text-red-500 text-sm mt-2">{regexError}</p>}
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveCategory}>
              <TabsList className="bg-gray-700 h-auto p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  Tất cả
                </TabsTrigger>
                {/* {genres.slice(0, 4).map((genre) => (
                  <TabsTrigger
                    key={genre}
                    value={genre}
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    {genre}
                  </TabsTrigger>
                ))} */}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Film Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingCatSimple />
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredFilms.map((film, index) => (
                <motion.div
                  key={film._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full border-none bg-gray-800 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] transition-all duration-300 rounded-xl flex flex-col group">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                      <Image
                        src={`http://localhost:8080${film.image}`}
                        alt={film.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=600&width=400&text=${encodeURIComponent(film.title)}`
                        }}
                      />
                      <Badge className="absolute top-4 right-4 z-20 bg-red-600 text-white font-semibold">
                        {film.year}
                      </Badge>
                      {/* {film.genre && film.genre[0] && (
                        <Badge className="absolute top-4 left-4 z-20 bg-gray-800/80 text-white">{film.genre[0]}</Badge>
                      )} */}
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow bg-gradient-to-b from-gray-800 to-gray-900">
                      <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
                        {film.title}
                      </h2>
                      <p className="text-gray-300 mb-4 text-sm line-clamp-2 flex-grow">{film.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{film.timeLength} phút</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(film.onStage)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Độ tuổi: {film.age}+</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                        onClick={() => router.push(`/movies/${film._id}`)}
                      >
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!isLoading && filteredFilms.length === 0 && (
          <div className="text-center py-20">
            <FilmIcon size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">Không tìm thấy phim</h3>
            <p className="text-gray-400">
              Không có phim nào phù hợp với tìm kiếm "{searchTerm}"{" "}
              {activeCategory !== "all" ? `trong thể loại ${activeCategory}` : ""}
            </p>
            <Button
              variant="outline"
              className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}