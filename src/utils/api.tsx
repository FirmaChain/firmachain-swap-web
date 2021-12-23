import axios from "axios";

const API = () => {
  const insertOrder = async (
    orderId: string,
    ethAddress: string,
    firmaAddress: string,
    amount: number,
    email: string
  ) => {
    return await axios.post(
      `${process.env.REACT_APP_API_HOST}/swaps`,
      {
        orderId,
        ethAddress,
        firmaAddress,
        ethTxHash: "",
        amount,
        email,
      },
      { headers: { "Content-Type": `application/json` } }
    );
  };

  const updateOrderHash = async (orderId: string, ethTxHash: string) => {
    return await axios.put(
      `${process.env.REACT_APP_API_HOST}/swaps/${orderId}`,
      { ethTxHash },
      { headers: { "Content-Type": `application/json` } }
    );
  };

  const sendRegistrationMail = async (orderId: string) => {
    return await axios.post(`${process.env.REACT_APP_API_HOST}/swaps/email/${orderId}`, {
      headers: { "Content-Type": `application/json` },
    });
  };

  const sendVerificationMail = async (email: string) => {
    return await axios.post(
      `${process.env.REACT_APP_API_HOST}/swaps/email`,
      { email },
      { headers: { "Content-Type": `application/json` } }
    );
  };

  const getBuildURL = async () => {
    return await axios.get(`${process.env.REACT_APP_API_HOST}/stations/release/latest`);
  };

  const getSwapList = async () => {
    return await axios.get(`${process.env.REACT_APP_API_HOST}/swaps`);
  };

  const getSwapListByPath = async (path: string) => {
    return await axios.get(`${process.env.REACT_APP_API_HOST}/swaps/${path}`);
  };

  const getIsVerified = async (email: string, authCode: string) => {
    return await axios.put(
      `${process.env.REACT_APP_API_HOST}/swaps/email`,
      { email, authCode },
      { headers: { "Content-Type": `application/json` } }
    );
  };

  return {
    insertOrder,
    updateOrderHash,
    getIsVerified,
    sendRegistrationMail,
    sendVerificationMail,
    getBuildURL,
    getSwapList,
    getSwapListByPath,
  };
};

export default API;
