"use client";
import Login from "@/components/Login";
import React from "react";
import LoginLayout from "@/app/login/LoginLayout";

export default function Page() {
  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
}
