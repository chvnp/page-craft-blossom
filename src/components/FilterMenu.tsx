
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { HealthStatus } from "@/types/project";

interface FilterMenuProps {
  onFilterChange: (filters: {
    eomgemHealth: HealthStatus[];
    rerireHealth: HealthStatus[];
    deliveryHealth: HealthStatus[];
    talentHealth: HealthStatus[];
  }) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    eomgemHealth: ["red", "amber", "green"] as HealthStatus[],
    rerireHealth: ["red", "amber", "green"] as HealthStatus[],
    deliveryHealth: ["red", "amber", "green"] as HealthStatus[],
    talentHealth: ["red", "amber", "green"] as HealthStatus[],
  });

  const handleFilterChange = (category: keyof typeof filters, value: HealthStatus) => {
    const updatedFilters = { ...filters };
    
    if (updatedFilters[category].includes(value)) {
      updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
    } else {
      updatedFilters[category].push(value);
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-gray-900 text-white">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Eomgem Health</DropdownMenuLabel>
        <DropdownMenuCheckboxItem 
          checked={filters.eomgemHealth.includes("red")} 
          onCheckedChange={() => handleFilterChange("eomgemHealth", "red")}
        >
          Red
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.eomgemHealth.includes("amber")} 
          onCheckedChange={() => handleFilterChange("eomgemHealth", "amber")}
        >
          Amber
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.eomgemHealth.includes("green")} 
          onCheckedChange={() => handleFilterChange("eomgemHealth", "green")}
        >
          Green
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Rerire Health</DropdownMenuLabel>
        <DropdownMenuCheckboxItem 
          checked={filters.rerireHealth.includes("red")} 
          onCheckedChange={() => handleFilterChange("rerireHealth", "red")}
        >
          Red
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.rerireHealth.includes("amber")} 
          onCheckedChange={() => handleFilterChange("rerireHealth", "amber")}
        >
          Amber
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.rerireHealth.includes("green")} 
          onCheckedChange={() => handleFilterChange("rerireHealth", "green")}
        >
          Green
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Delivery Health</DropdownMenuLabel>
        <DropdownMenuCheckboxItem 
          checked={filters.deliveryHealth.includes("red")} 
          onCheckedChange={() => handleFilterChange("deliveryHealth", "red")}
        >
          Red
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.deliveryHealth.includes("amber")} 
          onCheckedChange={() => handleFilterChange("deliveryHealth", "amber")}
        >
          Amber
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.deliveryHealth.includes("green")} 
          onCheckedChange={() => handleFilterChange("deliveryHealth", "green")}
        >
          Green
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Talent Health</DropdownMenuLabel>
        <DropdownMenuCheckboxItem 
          checked={filters.talentHealth.includes("red")} 
          onCheckedChange={() => handleFilterChange("talentHealth", "red")}
        >
          Red
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.talentHealth.includes("amber")} 
          onCheckedChange={() => handleFilterChange("talentHealth", "amber")}
        >
          Amber
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={filters.talentHealth.includes("green")} 
          onCheckedChange={() => handleFilterChange("talentHealth", "green")}
        >
          Green
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterMenu;
