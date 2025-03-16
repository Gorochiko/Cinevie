"use client"
import { useState } from "react"
import { CreditCard, QrCode, Smartphone} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react"
import { FoodItem } from "@/types";
import { getFoods } from "@/lib/actions";
import Image from "next/image"
import { Button } from "@/components/ui/button"




export default function BookingPage(){
    const [step, setStep] = useState<number>(1);
    // const [paymentStatus, setPaymentStatus] = useState<["idle" | "processing" | "success"]>(["idle"])

    
    const [selectedSeats, setSelectedSeats] = useState<Array<[number, number]>>([])
    const theater = [
      [true, false, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
    ]
    
    const rowLabels = "ABCDEFGH".split("")
    
    const handleSeatClick = (row:number, col:number) => {
      if (theater[row][col]) {
        if (selectedSeats.some(([r, c]) => r === row && c === col)) {
          setSelectedSeats(selectedSeats.filter(([r, c]) => !(r === row && c === col)))
        } else {
          setSelectedSeats([...selectedSeats, [row, col]])
        }
      }
    }


    // const handlePayment = () => {
    //   setPaymentStatus("processing")
    //   // Simulate payment processing
    //   setTimeout(() => {
    //     setPaymentStatus("success")
    //   }, 2000)
    // }

    const [combo, setCombo] = useState<FoodItem[]>([]);
    const [cart, setCart] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchCombo = async () => {
        try {
            const response = await getFoods();
            if (Array.isArray(response)) {
            setCombo(response);
            } else {
            console.error("❌ API trả về dữ liệu không hợp lệ:", response);
            }
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách combo:", error);
        }
        };
    
        fetchCombo();
    }, []);

    const handleAdd = (id: string) => {
        setCart((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleRemove = (id: string) => {
        setCart((prev) => {
        if (!prev[id]) return prev;
        const updatedCart = { ...prev, [id]: prev[id] - 1 };
        if (updatedCart[id] === 0) delete updatedCart[id];
        return updatedCart;
        });
    };

    if (combo.length === 0) {
        return <p className="text-white text-center">Đang tải danh sách combo...</p>;
    }

  
    return(
        <div>
    {step === 1 && (
      <div>
        <h2>Chọn ghế</h2>
        <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 w-3/5 max-w-3xl text-center">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Select Your Seats</h1>
                    <div className="grid grid-cols-10 gap-3 p-4 bg-gray-200 rounded-lg">
                    {theater.map((row, rowIndex) =>
                        row.map((seat, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold transition-all duration-300 cursor-pointer shadow-md ${
                            seat
                                ? selectedSeats.some(([r, c]) => r === rowIndex && c === colIndex)
                                ? "bg-blue-500 text-white scale-110"
                                : "bg-white hover:bg-blue-300"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={() => handleSeatClick(rowIndex, colIndex)}
                        >
                            {rowLabels[rowIndex]}{colIndex + 1}
                        </div>
                        ))
                    )}
                    </div>
                    <p className="mt-4 text-gray-600">Click on available seats to select.</p>
                    <div className="flex justify-center gap-4 mt-4">
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-[20px] h-[20px] bg-gray-600 rounded-2xl border-solid border-2 border-black"></div>
                        <p className="mt-4 text-gray-600">Booked.</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-[20px] h-[20px] bg-blue-500 rounded-2xl border-solid border-2 border-black "></div>
                        <p className="mt-4 text-gray-600">Selected.</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-[20px] h-[20px] bg-white rounded-2xl border-solid border-2 border-black"></div>
                        <p className="mt-4 text-gray-600">Free.</p>
                    </div>
                    </div>
                    <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white" onClick={() => setStep(2)}>Tiếp tục</button>
                </div>
        </div>
        
      </div>
    )}

    {step === 2 && (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Chọn Combo</h2>
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {combo.map((food) => (
                <Card key={food._id} className="flex items-center p-4 shadow-md">
                    <Image
                    src={`http://localhost:8080${food.imageFood}`}
                    alt={food.titleFood}
                    width={112}
                    height={112}
                    className="rounded-lg mr-4"
                    />
                    <div className="flex-1">
                    <h3 className="text-lg font-semibold">{food.titleFood}</h3>
                    <p className="text-gray-500 text-sm">{food.details}</p>
                    <p className="font-bold text-primary mt-1">{food.price}</p>
                    </div>
                    <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemove(food._id)}
                        disabled={!cart[food._id]}
                    >
                        -
                    </Button>
                    <span className="mx-3">{cart[food._id] || 0}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAdd(food._id)}
                    >
                        +
                    </Button>
                    </div>
                </Card>
                ))}
            </div>
            </div>
            <div className="flex justify-center w-full items-center gap-4 mt-4">
                <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white" onClick={() => setStep(1)}>Quay lại</button>
                <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white" onClick={() => setStep(3)}>Tiếp tục</button>
            </div>
        </div>
        
        
      </div>
    )}

    {step === 3 && (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle className="text-2xl">Thanh Toán</CardTitle>
                <CardDescription>Chọn phương thức thanh toán phù hợp với bạn</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="momo" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="momo" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span>MoMo</span>
                    </TabsTrigger>
                    <TabsTrigger value="qrcode" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>QR Code</span>
                    </TabsTrigger>
                    <TabsTrigger value="banking" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Banking</span>
                    </TabsTrigger>
                </TabsList>

                {/* MoMo Payment Tab */}
                <TabsContent value="momo">
                    <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="rounded-full bg-pink-100 p-3">
                        <Image src="/logomomo.png" width={300} height={300} alt="Logo" className="w-[100px] drop-shadow-lg animate-wiggle" />
                        </div>
                        <h3 className="text-lg font-medium">Thanh toán qua MoMo</h3>
                        <div className="text-center text-sm text-muted-foreground">
                        Quét mã QR bằng ứng dụng MoMo
                        </div>
                        <div className="flex justify-center w-full items-center gap-4 mt-4">
                            <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white" onClick={() => setStep(2)}>Quay lại</button>
                            <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white">Thanh toán</button>
                        </div>
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="qrcode">
                    <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="rounded-full bg-pink-100 p-3">
                        <Smartphone className="h-8 w-8 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-medium">Thanh toán qua QrCode</h3>
                        <div className="text-center text-sm text-muted-foreground">
                        Quét mã QR bằng QrCode hiện chưa đang được bảo trì, vui lòng chọn phương thức khác
                        </div>
                        <div className="flex justify-center w-full items-center gap-4 mt-4">
                            <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white" onClick={() => setStep(2)}>Quay lại</button>                         
                        </div>
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="banking">
                    <div className="space-y-6 py-4">
                        <div className="flex flex-col items-center space-y-4">
                        <div className="rounded-full bg-pink-100 p-3">
                            <Smartphone className="h-8 w-8 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-medium">Thanh toán qua iBanking</h3>
                        <div className="text-center text-sm text-muted-foreground">
                            Quét mã QR bằng iBanking hiện chưa đang được bảo trì, vui lòng chọn phương thức khác
                        </div>
                        <div className="flex justify-center w-full items-center gap-4 mt-4">
                            <button className="hover:scale-95 text-center h-10 w-[20%] bg-black border-white border-2 rounded-xl text-white" onClick={() => setStep(2)}>Quay lại</button>
                        </div>
                        </div>
                    </div>
                </TabsContent>
                </Tabs>
                
            </CardContent>
            
            </Card>
        
      </div>
    )}

    {step === 4 && <h2>Xác nhận đặt vé thành công!</h2>}
  </div>
    );
}