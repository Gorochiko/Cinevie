"use client"

import { useState } from "react"
import { CreditCard, QrCode, Smartphone, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentInterface() {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle")

  const handlePayment = () => {
    setPaymentStatus("processing")
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
    }, 2000)
  }

  return (
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
                  <Smartphone className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-medium">Thanh toán qua MoMo</h3>
                <div className="text-center text-sm text-muted-foreground">
                  Quét mã QR bằng ứng dụng MoMo hoặc nhập số điện thoại đã đăng ký MoMo
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="border border-gray-200 p-4 rounded-md">
                    <img src="/placeholder.svg?height=200&width=200" alt="MoMo QR Code" className="h-48 w-48" />
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 flex-shrink text-gray-400">hoặc</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="momo-phone">Số điện thoại MoMo</Label>
                  <Input id="momo-phone" placeholder="Nhập số điện thoại MoMo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="momo-amount">Số tiền</Label>
                  <Input id="momo-amount" value="500,000 VND" readOnly />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* QR Code Payment Tab */}
          <TabsContent value="qrcode">
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <QrCode className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium">Thanh toán bằng QR Code</h3>
                <div className="text-center text-sm text-muted-foreground">
                  Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử của bạn
                </div>
              </div>

              <div className="flex justify-center">
                <div className="border border-gray-200 p-6 rounded-md">
                  <img src="/placeholder.svg?height=250&width=250" alt="Payment QR Code" className="h-64 w-64" />
                  <div className="mt-4 text-center text-sm">
                    <p className="font-medium">Quét mã để thanh toán</p>
                    <p className="text-muted-foreground">Số tiền: 500,000 VND</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Banking Payment Tab */}
          <TabsContent value="banking">
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CreditCard className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-medium">Thanh toán qua Ngân hàng</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-select">Chọn ngân hàng</Label>
                  <Select>
                    <SelectTrigger id="bank-select">
                      <SelectValue placeholder="Chọn ngân hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vietcombank">Vietcombank</SelectItem>
                      <SelectItem value="techcombank">Techcombank</SelectItem>
                      <SelectItem value="bidv">BIDV</SelectItem>
                      <SelectItem value="vietinbank">Vietinbank</SelectItem>
                      <SelectItem value="tpbank">TPBank</SelectItem>
                      <SelectItem value="mbbank">MB Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Số tài khoản</Label>
                  <Input id="card-number" placeholder="Nhập số thẻ" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-name">Tên chủ tài khoản</Label>
                  <Input id="card-name" placeholder="Nhập tên chủ thẻ" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Số tiền</Label>
                  <Input id="amount" value="500,000 VND" readOnly />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tổng tiền:</span>
              <span className="font-medium">500,000 VND</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePayment} className="w-full" disabled={paymentStatus !== "idle"}>
          {paymentStatus === "idle" && "Xác nhận thanh toán"}
          {paymentStatus === "processing" && "Đang xử lý..."}
          {paymentStatus === "success" && (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Thanh toán thành công
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

