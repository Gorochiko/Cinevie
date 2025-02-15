
import HeaderDashboard from "@/components/dashboard/headerDashbord";
import Finance from "@/components/dashboard/finance";
import NewCustomer from "@/components/dashboard/newCustomer";
import Ticket from "@/components/dashboard/ticket";
import ChartFinance from "@/components/dashboard/chartFinance";
import ChartTicket from "@/components/dashboard/chartTicket";
export default function Dashboard() {
  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <HeaderDashboard/>
      {/* Hàng trên */}
      <div className="flex flex-row gap-4 mb-8">
        {/* Tổng Doanh Thu */}
        <Finance />
        {/* Khách Hàng Mới */}
        <NewCustomer />
        {/* Thống kê vé */}
        <Ticket/>
      </div>

      {/* Hàng dưới */}
      <div className="flex flex-row gap-4">
        {/* Biểu đồ doanh thu theo tháng */}
        <ChartFinance/>
        {/* Biểu đồ tỷ lệ ghế đã đặt theo tháng */}
        <ChartTicket/>
      </div>
    </div>
  );
}