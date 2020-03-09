import OrganisationNavigation from "../shared/OrganisationNavigation";
import BuildingSimplified from "./models/BuildingSimplified";

export interface IMenuProps extends OrganisationNavigation {
  structure: BuildingSimplified[];
}

export interface IMenuCallProps {
  setOrganisationStructure: (structure: BuildingSimplified[]) => void;
}
