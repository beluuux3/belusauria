import React from "react";
import Button from "./Button";

export default function PageHeader({ title, buttonText, onButtonClick }) {
  return (
    <div className="flex justify-between items-center p-5 mx-10">
      <h2 className="font-bold text-2xl">{title}</h2>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick} variant="primary">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
