"use client";

import React from "react";
import Header from "@/components/Header/Header";
import Tools from "@/components//Home/Tools";

export default function App() {

  return (
    <div className="home">
      
      <Header />

      <Tools />

      <a className='home__footer' href="https://www.linkedin.com/in/francisco-grynberg/" target="_blank" rel="noreferrer">Desenvolvido por <strong>Francisco Grynberg</strong></a>

    </div>
  );
}
