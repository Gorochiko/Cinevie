
import { Slideshow } from "@/components/Slideshow";
import { RecommendMovie } from "@/components/RecommendMovie";
import { MovieGenres } from "@/components/MovieGenres";
import { Promotion } from "@/components/Promotion";
import { FilmFactory } from "@/factories/films/filmsFactory";


export default async function Home() {
  try {
    const data = await FilmFactory.createFilmLoader();
    
    // Kiểm tra data trước khi sử dụng
    if (!data || !Array.isArray(data)) {
      console.error('Invalid film data received');
      return <div>Không thể tải danh sách phim</div>;
    }

    const validFilms = (data || [])
    .filter(film => film?._id && film.image) // Đảm bảo có _id và image
    .filter((film, index, self) => 
      index === self.findIndex(f => f._id === film._id) // Loại bỏ trùng _id
    );

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div className="z-20">
          <div className="w-full animate-fadeIns">
            <Slideshow />
          </div>
          <div className="w-full">
            <RecommendMovie films={validFilms} />
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
