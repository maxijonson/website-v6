"use client";
import React from "react";

export interface HomeHeaderContextValue {
  showBackground: boolean | null;
}

export const HomeHeaderContext = React.createContext<HomeHeaderContextValue>({
  showBackground: null,
});
