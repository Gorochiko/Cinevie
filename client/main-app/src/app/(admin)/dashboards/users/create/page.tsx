"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleCreateUser = async () => {
    if (!email) return alert("Please enter an email");

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("User created successfully!");
      router.push("/dashboards/users");
    } else {
      alert("Failed to create user.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Create New User</h1>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
        />
      </div>
      <Button onClick={handleCreateUser}>Create User</Button>
      <Button variant="outline" className="ml-2" onClick={() => router.back()}>
        Cancel
      </Button>
    </div>
  );
}