import IOrganisationNavigationProps from "../shared/OrganisationNavigation";

export interface IEquipmentEditorProps extends IOrganisationNavigationProps {}

export interface IEquipmentEditorCallProps {
  loadAllEquipmentNames: () => void;
}
