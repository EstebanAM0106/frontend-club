"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ListaActividades from "@/components/ListaActividades";
import { metadata } from "./metadata";

export default function Page() {
  const { user } = useContext(AuthContext);

  return <ListaActividades />;
}
