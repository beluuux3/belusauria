import React from "react";

import ContainerHome from "../components/ContainerHome";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="grow">
          <ContainerHome></ContainerHome>
        </main>
      </div>
    </>
  );
}
