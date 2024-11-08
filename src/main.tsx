import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

// Mock the environment in case, we are outside Telegram.
import "./mockEnv.ts";
import { Root } from "./shared/providers/Root.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
