"use client";

import React from "react";
import Menu from '@/components/Confronto/Menu';
import Info from '@/components/Confronto/Info';
import Partidas from '@/components/Confronto/Partidas/Partidas';

export default function Confronto() {

  return (
    <div className="confronto">

      <Menu />

      <Info />

      <Partidas />

    </div>
  );
}