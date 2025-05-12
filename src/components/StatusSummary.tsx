
import { HealthStatus, Project } from "@/types/project";

interface StatusSummaryProps {
  projects: Project[];
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ projects }) => {
  // Count projects by status
  const getStatusCounts = () => {
    // We're considering a project "red" if any of its health indicators are red
    // "amber" if any are amber (but none are red)
    // "green" if all indicators are green
    
    let red = 0;
    let amber = 0;
    let green = 0;

    projects.forEach(project => {
      const healthValues = [
        project.eomgemHealth, 
        project.rerireHealth, 
        project.deliveryHealth, 
        project.talentHealth
      ];

      if (healthValues.includes("red")) {
        red++;
      } else if (healthValues.includes("amber")) {
        amber++;
      } else {
        green++;
      }
    });

    return { red, amber, green };
  };

  const { red, amber, green } = getStatusCounts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-red-100 rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium">Red</h3>
        <p className="text-4xl font-bold">{red}</p>
      </div>
      <div className="bg-amber-100 rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium">Amber</h3>
        <p className="text-4xl font-bold">{amber}</p>
      </div>
      <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium">Green</h3>
        <p className="text-4xl font-bold">{green}</p>
      </div>
    </div>
  );
};

export default StatusSummary;
