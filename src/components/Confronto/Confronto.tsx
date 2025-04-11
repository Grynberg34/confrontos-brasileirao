"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import Menu from '@/components/Confronto/Menu';
import Info from '@/components/Confronto/Info';
import Partidas from '@/components/Confronto/Partidas';

export default function Confronto() {

  const partidas = useSelector((state: RootState) => state.partidas);

  console.log(partidas);

  return (
    <div className="confronto">

      <Menu />

      <Info />

      <Partidas />

    </div>
  );
}