import { FoodManagement } from "@/components/dashboard2/foods/food-management"

// This is now a Server Component (no "use client" directive)
export default function FoodPage() {
  // In a real application, you would fetch food data from a database here
  const initialFoods = [
    {
      _id: "1",
      titleFood: "Popcorn (Large)",
      price: "5.99",
      details: "Freshly popped buttery popcorn in a large bucket",
      imageFood: "",
    },
    {
      _id: "2",
      titleFood: "Nachos with Cheese",
      price: "6.99",
      details: "Crispy nachos with warm cheese dip",
      imageFood: "",
    },
    {
      _id: "3",
      titleFood: "Soft Drink Combo",
      price: "8.99",
      details: "Large soft drink with popcorn",
      imageFood: "",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý thức ăn</h1>

      {/* Pass the initial data to the client component */}
      <FoodManagement initialFoods={initialFoods} />
    </div>
  )
}

