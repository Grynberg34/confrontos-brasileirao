"use client";

import React from "react";
import Menu from '@/components/Confronto/Search/Menu';
import Info from '@/components/Confronto/Search/Info/Info';
import Partidas from '@/components/Confronto/Search/Partidas/Partidas';

export default function Confronto() {

  return (
    <div className="confronto">

      <Menu />

      <Info />

      <Partidas />

    </div>
  );
}