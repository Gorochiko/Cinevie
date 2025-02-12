function EndFooter() {
    return (
      <div className="w-full flex justify-between items-center px-10 py-4 text-white text-[15px] font-normal bg-blue-900">
        <div className="w-[50%]">
          © 2024 exemple.com. All rights reserved.
        </div>
        <div className="w-[50%] inline-flex justify-end">
          <div className="hover:text-red-500 cursor-pointer">Terms & Conditions</div>
          <div className="px-2">|</div>
          <div className="hover:text-red-500 cursor-pointer">Privacy Notice</div>
        </div>
      </div>
    );
  }
  
  export default EndFooter;
  