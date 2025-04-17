import React from "react";

interface OrderProps {
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
}

const OrderButtons: React.FC<OrderProps> = ({ order, setOrder }) => {
  return (
    <div className="partidas__order">
      <h1 className="partidas__order__text">ordenar:</h1>
      <button
        className={`partidas__order__button ${order === "desc" ? "selected" : ""}`}
        onClick={() => setOrder("desc")}
      >
        2025-2003
      </button>
      <button
        className={`partidas__order__button ${order === "asc" ? "selected" : ""}`}
        onClick={() => setOrder("asc")}
      >
        2003-2025
      </button>
    </div>
  );
};

export default OrderButtons;