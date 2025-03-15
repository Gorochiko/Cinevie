import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const promotions = [
  {
    image: 'f1.jpg',
    title: 'Giảm 10.000đ khi thanh toán ShopeePay',
    description: 'Xem phim cực đã, ưu đãi cực chất cùng ShopeePay.',
  },
  {
    image: 'f2.jpg',
    title: 'Thứ Ba Vui Vẻ với khuyến mãi hấp dẫn',
    description: 'Giá vé chỉ từ 50K vào thứ ba hàng tuần.',
  },
  {
    image: 'f3.jpg',
    title: 'Quyền lợi thành viên Galaxy Cinema',
    description: 'Ưu đãi tích điểm và giảm giá vé khi trở thành thành viên.',
  },
  {
    image: 'f4.jpg',
    title: 'U22 Vui Vẻ - Bắp nước siêu hạt dẻ',
    description: 'Giá siêu ưu đãi dành cho khách hàng dưới 22 tuổi.',
  },
  {
    image: 'f5.png',
    title: 'Gói xem phim Premium 70K',
    description: 'Trải nghiệm trọn vẹn với gói xem phim siêu tiết kiệm.',
  },
  {
    image: 'promotion_cgv.jpg',
    title: 'Rạp Phòng Đê - Thứ Năm Ngay!',
    description: 'Ưu đãi bắp nước 25% vào mỗi thứ năm.',
  }
];

const PromotionPage = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white">
      <h1 className="text-xl font-bold text-blue-600 mb-6">PROMOTIONS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {promotions.map((promo, index) => (
          <Card key={index} className="shadow-md rounded-2xl overflow-hidden flex flex-col">
            <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{promo.title}</h2>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{promo.description}</p>
              <Button className="bg-red-500 text-white hover:bg-red-600 w-full mt-auto">
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromotionPage;
