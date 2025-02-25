"use client";
import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { 
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot 
} from "@/components/ui/input-otp";
import { verify } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import OTPFormButton from "./OTPFormButton";
import router from "next/router";

import { useSession } from "next-auth/react";

export default  function OTPCardContent() {
  const [code, setCode] = useState(""); 

  const { data: session } = useSession(); // Lấy session từ NextAuth

  const _id =  session?.user.id; 
  const handleVerify = async () => {
    console.log(session,"13124124124");
    if (!_id) {
      toast({ variant: "destructive", description: "Invalid session ID" });

    }
    try {
      const response = await verify(code, _id);
      console.log(response);
      toast({ variant: "default", description: "Success" });
      router.push("/login");
    } catch (error: any) {
      toast({ variant: "destructive", description: error?.message });
    }
  };

  return (
    <CardContent className="justify-items-center">
      <InputOTP maxLength={8} value={code} onChange={setCode}>
        <InputOTPGroup>
          {[...Array(4)].map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {[...Array(4)].map((_, i) => (
            <InputOTPSlot key={i + 4} index={i + 4} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <OTPFormButton handleVerify={handleVerify} />
    </CardContent>
  );
}
