
import  Link  from "next/link";


function BodyFooter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-10 py-8 bg-blue-900">
      {/* row 1 */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-lg">About Us</h3>
        <ul className="text-white">
          <li className="py-1 hover:text-red-500">
            <Link href="#">Company</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Blog</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Services</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">FAQs</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Terms</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="/swagger">Contact Us</Link>
          </li>
        </ul>
      </div>
      {/* row 2 */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
        <ul className="text-white">
          <li className="py-1 hover:text-red-500">
            <Link href="#">Get in Touch</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Help center</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Live chat</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">How it works</Link>
          </li>
        </ul>
      </div>
      {/* row 3 */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-lg">Our Brands</h3>
        <ul className="text-white">
          <li className="py-1 hover:text-red-500">
            <Link href="#">Cinevie+ Sư Vạn Hạnh</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Cinevie+ Hùng Vương</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Cinevie+ Hoàng Văn Thụ</Link>
          </li>
        </ul>
      </div>
      {/* row 4 */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-lg">Customers</h3>
        <ul className="text-white">
          <li className="py-1 hover:text-red-500">
            <Link href="#">Help & contact us</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Return</Link>
          </li>
          <li className="py-1 hover:text-red-500">
            <Link href="#">Terms & condition</Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
}

export default BodyFooter;
