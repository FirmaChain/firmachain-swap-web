import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../../components/modal';
import { ModalContainer, ModalContent, NextButton, SubTypo, TitleTypo } from './styles';

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const ImageDiv = styled.div`
    width: calc(100% - 130px);
    height: 400px;
    background-image: url('${'/images/notice_001.png'}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
`;

const IntroNotice = ({ visible, onClose }: any) => {
    const [isNext, setNext] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setNext(true);
        }, 2100);
    }, []);

    return (
        <Modal
            visible={visible}
            closable={false}
            onClose={() => {
                onClose();
            }}
            width={'700px'}
        >
            <ModalContainer>
                <ModalContent>
                    <TitleTypo>📢 NOTICE</TitleTypo>
                    <ImageWrapper>
                        <ImageDiv />
                    </ImageWrapper>
                    <SubTypo>Before swapping your tokens, please first login with MetaMask.</SubTypo>

                    <NextButton
                        active={isNext}
                        style={{ marginTop: '40px' }}
                        onClick={() => {
                            if (isNext) onClose();
                        }}
                    >
                        READY
                    </NextButton>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

export default React.memo(IntroNotice);
