"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

export default function Confronto() {

  const partidas = useSelector((state: RootState) => state.partidas);

  console.log(partidas.data);

  return (
    <div className="confronto">

    </div>
  );
}