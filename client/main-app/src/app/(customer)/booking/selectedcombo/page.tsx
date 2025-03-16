"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/types";
import { getFoods } from "@/lib/actions";
import Image from "next/image";
export default function Combo() {
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

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Chọn Combo</h2>
    <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combo.map((food) => (
          <Card key={food._id} className="flex items-center p-4 shadow-md">
            <Image
              src={food.imageFood}
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
  </div>
  );
}
