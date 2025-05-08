import { FoodManagement } from "@/components/dashboard2/foods/food-management"
import { getFoods } from "@/lib/actions"
import { FoodItem } from "@/types"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
export default async function FoodPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }
  const initialFoods  = await getFoods() as FoodItem[]
  return (  
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý thức ăn</h1>
      <FoodManagement initialFoods={initialFoods} />
    </div>
  )
}

