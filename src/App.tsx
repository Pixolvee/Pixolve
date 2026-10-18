import { Routes, Route } from "react-router-dom";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import Home from "@/pages/Home";
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
        <Route path="/portofolio" element={<ProjectsPage />} />
        <Route path="/portofolio/:slug" element={<CaseStudyPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  );
}
