import React from "react";
import Header from "../ui/ui.header";
type layoutPropsInterface = {
  children: React.ReactNode;
};

export default function Layout({ children }: layoutPropsInterface) {
  return (
    <>
      <Header />
      <main className="bg-yellow-200">{children}</main>
    </>
  );
}
