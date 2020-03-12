import EquipmentSimplified from "../models/equipmentSimplified";
import IOrganisationNavigationProps from "../../shared/OrganisationNavigation";

export interface IEquipmentListProps extends IOrganisationNavigationProps {
  equipment: EquipmentSimplified[];
}

export interface IEquipmentListCallProps {
  getEquipment: () => void;
}
