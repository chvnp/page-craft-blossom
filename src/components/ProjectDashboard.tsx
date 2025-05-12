
import { useState, useEffect } from "react";
import StatusSummary from "./StatusSummary";
import ProjectTable from "./ProjectTable";
import FilterMenu from "./FilterMenu";
import { Project, HealthStatus } from "@/types/project";
import { projectData } from "@/data/projectData";

const ProjectDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectData);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectData);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Health Status</h1>
        <FilterMenu onFilterChange={handleFilterChange} />
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
