import { FirmaWebLedgerWallet } from "@firmachain/firma-js-ledger";
import TransportHID from "@ledgerhq/hw-transport-webhid";

const webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);

export const getAddress = async () => {
  try {
    const address = await webLedgerWallet.getAddress();
    return address;
  } catch (e) {
    return "";
  }
};
