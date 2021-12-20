import React from "react";

import { FooterContainer, LeftTypo, RightTypo } from "./styles";

const Header = () => {
  return (
    <FooterContainer>
      <LeftTypo>Copyrightⓒ FirmaChain Pte. Ltd. | All Right Reserved.</LeftTypo>
      <RightTypo>
        <a href="mailto:contact@firmachain.org">contact@firmachain.org</a>
      </RightTypo>
    </FooterContainer>
  );
};

export default React.memo(Header);
