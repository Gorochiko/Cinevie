import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Slideshow } from "@/components/Slideshow";
import { RecommendMovie } from "@/components/RecommendMovie";
import { MovieGenres } from "@/components/MovieGenres";
import { Promotion } from "@/components/Promotion";
// import { SlideFood } from "@/components/SlideFood";

export default function Home() {
  return (
    <div className="bg-gray-100  min-h-screen">
      <Header />
      <div className="z-20 pt-20">
        <div className="w-full p-5  animate-fadeIns">
          <Slideshow />
        </div>
        <div className="w-full bg-gradient-to-r from-[#1230AE] to-[#C68FE6] ">
          <RecommendMovie />
        </div>
        <div className="w-full p-7">
          <MovieGenres />
        </div>
        <div className="w-full p-7">
          <Promotion />
        </div>
      </div>
      {/* <div className="w-2/5 pr-10 animate-slideUp">
          <SlideFood />
      </div> */}
      <Footer />
    </div>
  );
}
