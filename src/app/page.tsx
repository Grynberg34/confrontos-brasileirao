"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Home from "@/components/Home/Home";
import Confronto from "@/components/Confronto/Confronto";

export default function App() {

  const partidas = useSelector((state: RootState) => state.partidas);

  return (
    <div>
      {partidas.data.length === 0 ? <Home /> : <Confronto />}
    </div>
  );
}
