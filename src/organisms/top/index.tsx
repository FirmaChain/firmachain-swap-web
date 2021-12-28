import React from "react";

import { TopContainer, MainTypo, SubTypo } from "./styles";

const Top = () => {
  return (
    <TopContainer>
      <MainTypo>FirmaChain Token Swap</MainTypo>
      <SubTypo>ERC20 Ropsten ▶ FirmaChain Colosseum Testnet</SubTypo>
    </TopContainer>
  );
};

export default React.memo(Top);
