import React, { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import Tooltip from "./tooltip";

import {
  StatusContainer,
  HeaderWrapper,
  HeaderColumn,
  ItemWrapper,
  ItemColumn,
  InputWrapper,
  InputBoxDefault,
  Label,
  StatusTypo,
  SearchButton,
} from "./styles";

const Row = ({ data, index, style }: any) => {
  const currentData = data[index];

  const getMinAddress = (text: string) => {
    return text.substr(0, 10) + "...";
  };

  const getAmountFormat = (text: string) => {
    return numeral(text).format("0,0.000000") + " FCT";
  };

  const getStatusFormat = (status: number) => {
    switch (status) {
      case 0:
        return <StatusTypo color={""}>Register</StatusTypo>;
      case 1:
      case 2:
        return <StatusTypo color={"#3550DE"}>Processing</StatusTypo>;
      case 3:
        return <StatusTypo color={"#47EC9F"}>Success</StatusTypo>;
      default:
        return <StatusTypo>Error</StatusTypo>;
    }
  };

  const getTimeFormat = (time: string) => {
    const timeArray = time.split("T");
    return (
      <>
        <div>{timeArray[0]}</div>
        <div>{timeArray[1]}</div>
      </>
    );
  };

  return (
    <ItemWrapper style={style}>
      <ItemColumn>
        <Tooltip message={currentData.ethAddress}>{getMinAddress(currentData.ethAddress)}</Tooltip>
      </ItemColumn>
      <ItemColumn>
        <Tooltip message={currentData.firmaAddress}>{getMinAddress(currentData.firmaAddress)}</Tooltip>
      </ItemColumn>
      <ItemColumn>{getAmountFormat(currentData.amount)}</ItemColumn>
      <ItemColumn>{getStatusFormat(currentData.status)}</ItemColumn>
      <ItemColumn>{getTimeFormat(currentData.addedAt)}</ItemColumn>
    </ItemWrapper>
  );
};

const Status = () => {
  const [swapHistoryList, setSwapHistoryList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/swaps`)
      .then((res) => {
        setSwapHistoryList(res.data.result.swapList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onKeyDownSearch = (e: any) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const onChangeSearchText = (e: any) => {
    if (e === null) return;
    setSearchText(e.target.value.replace(/(\s*)/g, ""));
  };

  const getAPIType = () => {
    if (searchText.slice(0, 5) === "order") {
      return "orders";
    } else if (searchText.length === 0) {
      return "";
    } else {
      return "wallets";
    }
  };

  const search = () => {
    const apiType = getAPIType();

    let baseURI = `${process.env.REACT_APP_API_HOST}/swaps`;

    if (apiType !== "") {
      baseURI += `/${getAPIType()}/${searchText}`;
    }

    axios
      .get(baseURI)
      .then((res) => {
        setSwapHistoryList(res.data.result.swapList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <StatusContainer>
      {console.log(swapHistoryList)}
      <InputWrapper>
        <Label>Order ID or Address (Firma/ETH)</Label>
        <InputBoxDefault
          placeholder="orderxxxxx or firmaxxxxx or 0x00000"
          onKeyDown={onKeyDownSearch}
          value={searchText}
          onChange={onChangeSearchText}
        />
      </InputWrapper>
      <SearchButton active={true} onClick={search}>
        Search
      </SearchButton>

      <AutoSizer>
        {({ height, width }) => (
          <>
            <HeaderWrapper style={{ width }}>
              <HeaderColumn>From</HeaderColumn>
              <HeaderColumn>To</HeaderColumn>
              <HeaderColumn>Amount</HeaderColumn>
              <HeaderColumn>Status</HeaderColumn>
              <HeaderColumn>Time</HeaderColumn>
            </HeaderWrapper>
            <List
              width={width}
              height={height - 50 - 270}
              itemCount={swapHistoryList.length}
              itemSize={50}
              itemData={swapHistoryList}
            >
              {(props) => Row({ ...props })}
            </List>
          </>
        )}
      </AutoSizer>
    </StatusContainer>
  );
};

export default React.memo(Status);
