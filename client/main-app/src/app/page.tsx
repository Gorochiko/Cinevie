import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Slideshow } from "@/components/Slideshow";
import { SlideFood } from "@/components/SlideFood";


export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div className=" w-3/5">
          <Slideshow></Slideshow>
        </div>
        <div className="w-2/5">
          <SlideFood></SlideFood>
        </div>
      </div>
      
      <Footer />

    </div>
  );
}
