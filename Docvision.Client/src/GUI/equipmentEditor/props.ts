import IOrganisationNavigationProps from "../shared/OrganisationNavigation";

export interface IEquipmentEditorProps extends IOrganisationNavigationProps {}

export interface IEquipmentEditorCallProps {
  loadallEquipment: () => void;
}
