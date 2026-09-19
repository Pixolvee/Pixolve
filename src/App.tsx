import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import WebDevelopment from "@/pages/WebDevelopment";
import MobileAppDevelopment from "@/pages/MobileDevelopments";
import QaTesting from "@/pages/QA_Testing";
import DataScience from "@/pages/data_sciense";
import UiUxDesign from "@/pages/UX_Design";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/layanan/web-development" element={<WebDevelopment />} />
      <Route path="/layanan/mobile-app" element={<MobileAppDevelopment />} />
      <Route path="/layanan/qa-testing" element={<QaTesting />} />
      <Route path="/layanan/data-science" element={<DataScience />} />
      <Route path="/layanan/ui-ux-design" element={<UiUxDesign />} />
    </Routes>
  );
}
