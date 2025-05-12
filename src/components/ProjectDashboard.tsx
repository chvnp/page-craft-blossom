
import { useState, useEffect, useRef } from "react";
import StatusSummary from "./StatusSummary";
import ProjectTable from "./ProjectTable";
import FilterMenu from "./FilterMenu";
import { Project, HealthStatus } from "@/types/project";
import { projectData } from "@/data/projectData";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

const ProjectDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectData);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectData);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");
  const [exporting, setExporting] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    eomgemHealth: ["red", "amber", "green"] as HealthStatus[],
    rerireHealth: ["red", "amber", "green"] as HealthStatus[],
    deliveryHealth: ["red", "amber", "green"] as HealthStatus[],
    talentHealth: ["red", "amber", "green"] as HealthStatus[],
  });

  useEffect(() => {
    // Apply filters
    const filtered = projects.filter(project => 
      filters.eomgemHealth.includes(project.eomgemHealth) &&
      filters.rerireHealth.includes(project.rerireHealth) &&
      filters.deliveryHealth.includes(project.deliveryHealth) &&
      filters.talentHealth.includes(project.talentHealth)
    );
    
    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleFilterChange = (newFilters: {
    eomgemHealth: HealthStatus[];
    rerireHealth: HealthStatus[];
    deliveryHealth: HealthStatus[];
    talentHealth: HealthStatus[];
  }) => {
    setFilters(newFilters);
  };

  const exportToImage = async () => {
    if (!dashboardRef.current) return;
    
    try {
      setExporting(true);
      toast({
        title: "Preparing Export",
        description: "Generating high-resolution image...",
      });

      // Wait for state update to show the export message
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f9fafb", // Light gray background
        logging: false,
      });

      // Convert to image and download
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `project-health-dashboard-${new Date().toISOString().split('T')[0]}.png`;
      link.href = image;
      link.click();
      
      toast({
        title: "Export Complete",
        description: "Your dashboard image has been downloaded",
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export Failed",
        description: "There was a problem generating the image",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={dashboardRef}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Health Status</h1>
        <div className="flex gap-3">
          <FilterMenu onFilterChange={handleFilterChange} />
          <Button 
            onClick={exportToImage} 
            disabled={exporting}
            className="flex items-center gap-2"
          >
            <Download size={18} />
            {exporting ? "Exporting..." : "Export as Image"}
          </Button>
        </div>
      </div>
      
      <StatusSummary projects={filteredProjects} />
      
      <ProjectTable projects={filteredProjects} />
      
      <div className="text-sm text-gray-500 mt-4">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default ProjectDashboard;
