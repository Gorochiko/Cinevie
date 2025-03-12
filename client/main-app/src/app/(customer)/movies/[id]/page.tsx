 
import FilmDetail from "@/components/FilmDetail";
import SlidedownFilm from "@/components/SlidedownFilm";
import Trailer from "@/components/Trailer";
import BookingDetail from "@/components/ui/BookingDetail";

export default function MovieDetails(){
    return (
        <div className="w-full py-5">
            <div className="w-full bg-black">
                <Trailer/>
            </div>
            <div className="flex w-full"> 
                <div className="w-4/6">
                    <div>
                        <FilmDetail />
                    </div>
                    <div>
                        <BookingDetail />
                    </div>
                </div>
                <div className="w-2/6 flex">
                    <div className="flex items-center bg-gradient-to-r from-[#1230AE] to-[#C68FE6]">
                        <h2 className="text-3xl font-bold uppercase tracking-wide relative p-5 text-white"
                            style={{ 
                                writingMode: "vertical-rl", 
                                transform: "rotate(180deg)"
                            }}
                        >
                            Another Movies
                        </h2>   
                    </div>
                    <div>
                        <SlidedownFilm />
                    </div>
                    
                </div>
            </div>
            
        </div>
       
    )
}