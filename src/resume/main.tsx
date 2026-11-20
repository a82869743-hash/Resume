import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ResumeDoc from "./ResumeDoc";
import "./resume.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResumeDoc />
  </StrictMode>
);
