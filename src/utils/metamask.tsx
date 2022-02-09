import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import { MIN_ABI } from "../config";

declare let window: any;

const Metamask = () => {
  const web3 = new Web3(window.ethereum);
  const ERC20_FCT_CONTRACT = new web3.eth.Contract(MIN_ABI, process.env.REACT_APP_FCT_CONTRACT_ADDRESS);

  const installed = () => {
    if (typeof window.ethereum !== "undefined") return true;
    else return false;
  };

  const connect = async (onChangeMetamask: any) => {
    return new Promise((resolve, reject) => {
      detectEthereumProvider().then((provider: any) => {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts: any) => {
            if (accounts.length === 0) reject();

            resolve(true);
          })
          .catch((err: any) => {
            reject(err);
          });
      });

      window.ethereum.on("accountsChanged", () => {
        onChangeMetamask();
      });
      window.ethereum.on("chainChanged", () => {
        onChangeMetamask();
      });
    });
  };

  const getChainId = async () => {
    return new Promise((resolve, reject) => {
      window.ethereum
        .request({ method: "eth_chainId" })
        .then((chainId: any) => {
          resolve(chainId);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  const getRawTransferTx = (toAddress: string | undefined, amountFCT: string) => {
    const rawData = ERC20_FCT_CONTRACT.methods.transfer(toAddress, web3.utils.toWei(amountFCT)).encodeABI();

    return {
      to: process.env.REACT_APP_FCT_CONTRACT_ADDRESS,
      from: window.ethereum.selectedAddress,
      data: rawData,
    };
  };

  const getRawBalanceOfTx = (address: string) => {
    return new Promise((resolve, reject) => {
      ERC20_FCT_CONTRACT.methods
        .balanceOf(address)
        .call()
        .then((result: any) => {
          resolve(web3.utils.fromWei(result));
        })
        .catch((e: any) => {
          reject();
        });
    });
  };

  const getEthAddress = () => {
    return window.ethereum.selectedAddress;
  };

  const transferForSwap = async (amountFCT: string) => {
    return await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [getRawTransferTx(process.env.REACT_APP_FIRMA_ETH_ADDRESS, amountFCT)],
    });
  };

  const balanceOfFCT = async () => {
    return await getRawBalanceOfTx(window.ethereum.selectedAddress);
  };

  return {
    installed,
    connect,
    getEthAddress,
    getChainId,
    balanceOfFCT,
    transferForSwap,
  };
};

export default Metamask;
