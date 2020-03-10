import Axios from "axios";

export const Apis = {
  getOrganisationStructure() {
    return Axios.get(`${Axios.defaults.baseURL}/organisation/structure`);
  }
};

export default Apis;
