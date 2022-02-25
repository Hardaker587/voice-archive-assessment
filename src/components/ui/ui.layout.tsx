import React from "react";
import Header from "../ui/ui.header";
type layoutPropsInterface = {
  children: React.ReactNode;
};

export default function Layout({ children }: layoutPropsInterface) {
  return (
    <div data-theme={'bumblebee'}>
      <Header />
      <main className="bg-yellow-200">{children}</main>
    </div>
  );
}
