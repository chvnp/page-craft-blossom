
import React from "react";
import { Project, HealthStatus } from "@/types/project";
import { format } from "date-fns";

interface ProjectTableProps {
  projects: Project[];
}

const StatusIndicator: React.FC<{ status: HealthStatus }> = ({ status }) => {
  const bgColor = status === "red" 
    ? "bg-red-500" 
    : status === "amber" 
      ? "bg-amber-400" 
      : "bg-green-500";
  
  return (
    <div className="flex justify-center">
      <div className={`w-5 h-5 rounded-full ${bgColor}`}></div>
    </div>
  );
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  // Function to format dates
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left">Client</th>
            <th className="py-3 px-4 text-left">Project Name</th>
            <th className="py-3 px-4 text-left">Client Partner</th>
            <th className="py-3 px-4 text-left">Delivery Lead</th>
            <th className="py-3 px-4 text-left">Start Date</th>
            <th className="py-3 px-4 text-left">End Date</th>
            <th className="py-3 px-4 text-center">Eomgem Health</th>
            <th className="py-3 px-4 text-center">Rerire Health</th>
            <th className="py-3 px-4 text-center">Delivery Health</th>
            <th className="py-3 px-4 text-center">Talent Health</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{project.client}</td>
              <td className="py-3 px-4">{project.name}</td>
              <td className="py-3 px-4">{project.clientPartner}</td>
              <td className="py-3 px-4">{project.deliveryLead}</td>
              <td className="py-3 px-4">{formatDate(project.startDate)}</td>
              <td className="py-3 px-4">{formatDate(project.endDate)}</td>
              <td className="py-3 px-4"><StatusIndicator status={project.eomgemHealth} /></td>
              <td className="py-3 px-4"><StatusIndicator status={project.rerireHealth} /></td>
              <td className="py-3 px-4"><StatusIndicator status={project.deliveryHealth} /></td>
              <td className="py-3 px-4"><StatusIndicator status={project.talentHealth} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
