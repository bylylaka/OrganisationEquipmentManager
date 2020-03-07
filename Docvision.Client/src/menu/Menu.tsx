import React, { FunctionComponent, useEffect } from "react";
import IMenuProps, { IMenuCallProps } from "./props";
import Axios, { AxiosResponse } from "axios";
import buildingSimplified from "./models/buildingSimplified";

const Menu: FunctionComponent<IMenuProps & IMenuCallProps> = props => {
  const { buildingId, roomId, structure } = props;

  useEffect(() => {
    Axios.get(`${Axios.defaults.baseURL}/organisation/structure`).then(
      (res: AxiosResponse<buildingSimplified[]>) => {
        console.log(res);
        let a = res;
        debugger;
      }
    );
    // code to run on component mount
  }, []);

  console.log(structure);

  return (
    <>
      <p>Menu</p>
    </>
  );
};

export default Menu;
