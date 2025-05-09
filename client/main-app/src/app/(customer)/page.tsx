
import { Slideshow } from "@/components/Slideshow";
import { RecommendMovie } from "@/components/RecommendMovie";
import { MovieGenres } from "@/components/MovieGenres";
import { Promotion } from "@/components/Promotion";
import { FilmFactory } from "@/factories/films/filmsFactory";


export default async function Home() {
  try {
    const data = await FilmFactory.createFilmLoader();
    if(!data || data.length === 0) {
      return <div>Không có dữ liệu phim nào</div>;
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div className="z-20">
          <div className="w-full animate-fadeIns">
            <Slideshow />
          </div>
          <div className="w-full">
            <RecommendMovie films={data} />
          </div>
          <div className="w-full p-7">
            <MovieGenres />
          </div>
          <div className="w-full p-7">
            <Promotion />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading films:', error);
    return <div>Đã có lỗi xảy ra khi tải dữ liệu</div>;
  }
}
