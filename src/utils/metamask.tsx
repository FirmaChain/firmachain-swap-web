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
          .request({ method: "eth_chainId" })
          .then((chainId: any) => {
            provider
              .request({ method: "eth_requestAccounts" })
              .then((accounts: any) => {
                if (accounts.length === 0) reject();

                resolve(true);
              })
              .catch((err: any) => {
                reject(err);
              });
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

  const getRawTransferTx = async (toAddress: string | undefined, amountFCT: string) => {
    const rawData = ERC20_FCT_CONTRACT.methods.transfer(toAddress, web3.utils.toWei(amountFCT)).encodeABI();
    const address = await getEthAddress();

    return {
      to: process.env.REACT_APP_FCT_CONTRACT_ADDRESS,
      from: address,
      data: rawData,
    };
  };

  const getRawBalanceOfTx = (address: any) => {
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
    return new Promise((resolve, reject) => {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: any) => {
          resolve(accounts[0]);
        })
        .catch((err: any) => {
          reject("");
        });
    });
  };

  const transferForSwap = async (amountFCT: string) => {
    const params = await getRawTransferTx(process.env.REACT_APP_FIRMA_ETH_ADDRESS, amountFCT);

    return await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
    });
  };

  const balanceOfFCT = async () => {
    const address = await getEthAddress();
    return await getRawBalanceOfTx(address);
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
