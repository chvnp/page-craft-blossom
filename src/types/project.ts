
export type HealthStatus = "red" | "amber" | "green";

export interface Project {
  id: string;
  client: string;
  name: string;
  clientPartner: string;
  deliveryLead: string;
  startDate: string;
  endDate: string;
  budgetAllocated: number; // Added new field
  eomgemHealth: HealthStatus;
  rerireHealth: HealthStatus;
  deliveryHealth: HealthStatus;
  talentHealth: HealthStatus;
}
