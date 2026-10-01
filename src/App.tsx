import { Routes, Route } from "react-router-dom";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import Home from "@/pages/Home";
import WebDevelopment from "@/pages/WebDevelopment";
import MobileAppDevelopment from "@/pages/MobileDevelopments";
import QaTesting from "@/pages/QA_Testing";
import DataScience from "@/pages/data_sciense";
import UiUxDesign from "@/pages/UX_Design";
import BlogPost from "@/pages/BlogPost";
import CaseStudyPage from "@/pages/CaseStudyPage";
import ProjectsPage from "@/pages/ProjectsPage";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan/web-development" element={<WebDevelopment />} />
        <Route path="/layanan/mobile-app" element={<MobileAppDevelopment />} />
        <Route path="/layanan/qa-testing" element={<QaTesting />} />
        <Route path="/layanan/data-science" element={<DataScience />} />
        <Route path="/layanan/ui-ux-design" element={<UiUxDesign />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/portofolio/:slug" element={<CaseStudyPage />} />
        <Route path="/portofolio" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
