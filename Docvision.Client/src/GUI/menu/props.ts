import IOrganisationNavigationProps from "../shared/OrganisationNavigation";
import BuildingSimplified from "./models/buildingSimplified";

export interface IMenuProps extends IOrganisationNavigationProps {
  structure: BuildingSimplified[];
  isLoading: boolean;
}

export interface IMenuCallProps {
  loadOrganisationStructure: () => void;
}
