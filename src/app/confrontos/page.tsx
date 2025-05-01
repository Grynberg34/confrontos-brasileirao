"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ConfrontoHome from "@/components/Confronto/Home/ConfrontoHome";
import ConfrontoSearch from "@/components/Confronto/Search/ConfrontoSearch";

export default function ConfrontosPage() {

  const partidas = useSelector((state: RootState) => state.partidas);

  return (
    <div>
      {partidas.data === null ? <ConfrontoHome /> : <ConfrontoSearch />}
    </div>
  );
}
