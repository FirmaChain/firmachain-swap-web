import React from 'react';

import { MainTypo, SubTypo, TopContainer } from './styles';

const Top = () => {
    return (
        <TopContainer>
            <MainTypo>FirmaChain Token Swap</MainTypo>
            <SubTypo>ERC20 mainnet ▶ FirmaChain Colosseum mainnet</SubTypo>
        </TopContainer>
    );
};

export default React.memo(Top);
