import Link from "next/link";
import Button from "@/components/ui/button";


export default function CheckoutForm() {
    return(
        <div className="w-2/5 max-w-3xl bg-white shadow-lg rounded-lg p-8 mt-4 m-5">
            <div className="mt-4">
                <p className="font-bold">Selected Seats:</p>
                <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(([row, col], index) => (
                    <div key={index} className="bg-primary text-primary-foreground rounded-md px-2 py-1">
                        {row + 1}-{col + 1}
                    </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="font-bold">Selected Combo:</p>
            </div>
            <div>
                <p className="font-bold">Total:</p>
                <p className="text-2xl font-bold">{totalPrice}đ</p>
            </div>
            <div className="mt-4 flex justify-end">
            <Link href="/checkout">
              <Button size="lg" className="bg-primary text-primary-foreground">
                  Tiếp tục
              </Button>
            </Link>
              
            </div>
        </div>
    )
}