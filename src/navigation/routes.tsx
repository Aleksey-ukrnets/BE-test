import type { ComponentType, JSX } from "react";

import { URLS } from "../shared/types/urls.enum";

import { TONConnectPage, Game } from "../pages";
import TonSvg from "../assets/ton.svg";
interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: URLS.GAME, Component: Game },
  {
    path: URLS.TON_CONNECT,
    Component: TONConnectPage,
    title: "TON Connect",
    icon: <TonSvg />,
  },
];
