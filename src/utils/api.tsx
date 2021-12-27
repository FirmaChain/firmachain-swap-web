import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = () => {
  const [token, setToken] = useState("");

  const insertOrder = async (
    tokenData: string,
    orderId: string,
    ethAddress: string,
    firmaAddress: string,
    amount: number,
    ethTxHash: string,
    email: string
  ) => {
    checkValidateToken();

    const result = await axios.post(
      `${process.env.REACT_APP_API_HOST}/swaps`,
      {
        tokenData,
        orderId,
        ethAddress,
        firmaAddress,
        ethTxHash,
        amount,
        email,
      },
      { headers: { "Content-Type": `application/json`, authorization: `Bearer ${token}` } }
    );

    setToken(result.headers.ft);

    return result;
  };

  const sendRegistrationMail = async (orderId: string) => {
    checkValidateToken();

    const result = await axios.post(`${process.env.REACT_APP_API_HOST}/swaps/email/${orderId}`, {
      headers: { "Content-Type": `application/json`, authorization: `Bearer ${token}` },
    });

    setToken(result.headers.ft);

    return result;
  };

  const sendVerificationMail = async (email: string) => {
    checkValidateToken();

    const result = await axios.post(
      `${process.env.REACT_APP_API_HOST}/swaps/email`,
      { email },
      { headers: { "Content-Type": `application/json`, authorization: `Bearer ${token}` } }
    );

    setToken(result.headers.ft);

    return result;
  };

  const getBuildURL = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_HOST}/stations/release/latest`);

    setToken(result.headers.ft);

    return result;
  };

  const getSwapList = async () => {
    checkValidateToken();

    const result = await axios.get(`${process.env.REACT_APP_API_HOST}/swaps`, {
      headers: { "Content-Type": `application/json`, authorization: `Bearer ${token}` },
    });

    setToken(result.headers.ft);

    return result;
  };

  const getSwapListByPath = async (path: string) => {
    checkValidateToken();

    const result = await axios.get(`${process.env.REACT_APP_API_HOST}/swaps/${path}`, {
      headers: { "Content-Type": `application/json`, authorization: `Bearer ${token}` },
    });

    setToken(result.headers.ft);

    return result;
  };

  const getIsVerified = async (email: string, authCode: string) => {
    checkValidateToken();

    const result = await axios.put(
      `${process.env.REACT_APP_API_HOST}/swaps/email`,
      { email, authCode },
      { headers: { "Content-Type": `application/json`, authorization: `Bearer ${token}` } }
    );

    setToken(result.headers.ft);

    return result;
  };

  const checkValidateToken = () => {
    if (token === "" || token === undefined) {
      window.location.reload();
    }
  };

  return {
    insertOrder,
    getIsVerified,
    sendRegistrationMail,
    sendVerificationMail,
    getBuildURL,
    getSwapList,
    getSwapListByPath,
  };
};

export default API;
