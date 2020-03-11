import Actions from "../../actions/actions";
import { call, put } from "@redux-saga/core/effects";
import Apis from "../apis/apis";
import { AxiosResponse } from "axios";
import BuildingSimplified from "../../../GUI/menu/models/buildingSimplified";

export const Sagas = {
  *getOrganisationStructureSaga(
    action: ReturnType<typeof Actions.getOrganisationStructure>
  ) {
    const response: AxiosResponse<BuildingSimplified[]> = yield call(
      Apis.getOrganisationStructure
    );
    // TODO: NEED TO CATCH ERROR (IN INTERCEPTOR)
    yield put(Actions.setOrganisationStructure(response.data));
  }
};
