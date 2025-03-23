
import { Slideshow } from "@/components/Slideshow";
import { RecommendMovie } from "@/components/RecommendMovie";
import { MovieGenres } from "@/components/MovieGenres";
import { Promotion } from "@/components/Promotion";


export default function Home() {
 
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="z-20 ">
        <div className="w-full p-5  animate-fadeIns">
          <Slideshow />
        </div>
        <div className="w-full">
          <RecommendMovie />
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
}
