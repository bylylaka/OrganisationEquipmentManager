import IOrganisationNavigationProps from "../shared/OrganisationNavigation";
import BuildingSimplified from "./models/BuildingSimplified";

export interface IMenuProps extends IOrganisationNavigationProps {
  structure: BuildingSimplified[];
}

export interface IMenuCallProps {
  setOrganisationStructure: (structure: BuildingSimplified[]) => void;
}
