import OrganisationNavigation from "../shared/OrganisationNavigation";
import buildingSimplified from "./models/buildingSimplified";

export interface IMenuProps extends OrganisationNavigation {
  structure: buildingSimplified[];
}

export interface IMenuCallProps {
  setOrganisationStructure: (structure: buildingSimplified[]) => void;
}

export default IMenuProps;
