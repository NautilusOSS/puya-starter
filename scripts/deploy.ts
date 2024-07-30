import { BaseClient as Client, APP_SPEC } from "./BaseClient.js";

import algosdk from "algosdk";

import { CONTRACT } from "ulujs";

import moment from "moment";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const { MN, MN2 } = process.env;

const mnemonic = MN || "";
const mnemonic2 = MN2 || "";

const { addr, sk } = algosdk.mnemonicToSecretKey(mnemonic);
const { addr: addr2, sk: sk2 } = algosdk.mnemonicToSecretKey(mnemonic2);

const address = addr;
const key = sk;

console.log({ addr, addr2 });

const ALGO_SERVER = "https://testnet-api.voi.nodly.io";
const ALGO_INDEXER_SERVER = "https://testnet-idx.voi.nodly.io";

const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN || "",
  process.env.ALGOD_SERVER || ALGO_SERVER,
  process.env.ALGOD_PORT || ""
);

const indexerClient = new algosdk.Indexer(
  process.env.INDEXER_TOKEN || "",
  process.env.INDEXER_SERVER || ALGO_INDEXER_SERVER,
  process.env.INDEXER_PORT || ""
);

const signSendAndConfirm = async (txns: string[], sk: any) => {
  const stxns = txns
    .map((t) => new Uint8Array(Buffer.from(t, "base64")))
    .map(algosdk.decodeUnsignedTransaction)
    .map((t: any) => algosdk.signTransaction(t, sk));
  console.log(stxns.map((res: any) => res.txID));
  await algodClient.sendRawTransaction(stxns.map((txn: any) => txn.blob)).do();
  await Promise.all(
    stxns.map((res: any) =>
      algosdk.waitForConfirmation(algodClient, res.txID, 4)
    )
  );
};

const deployer = {
  addr: address,
  sk: key,
};

// deploy contract with deploy time params
do {
  break;
  const appClient = new Client(
    {
      resolveBy: "creatorAndName",
      findExistingUsing: indexerClient,
      creatorAddress: deployer.addr,
      name: "1",
      sender: deployer,
    },
    algodClient
  );
  console.log(appClient);
  const app = await appClient.deploy({
    deployTimeParams: {},
    onUpdate: "update",
    onSchemaBreak: "fail",
  });
} while (0);

process.exit(0);

// update contract
do {
  break;
  const appUpdate = {
    "application-transaction": {
      accounts: [],
      "application-args": [],
      "application-id": 70662205,
      "approval-program":
        "CiADAQAFJgMHbWFuYWdlcgVvd25lcgQVH3x1MRhAAAOIAIgxG0EAUoAErHzvG4AEJT7ShYAEwwbEHTYaAI4DAAEAEwAkADEZFEQxGEQ2GgE2GgKIAC4iQzEZFEQxGESIAD4WKkxQsCJDMRkURDEYRIgAMhYqTFCwIkMxGRREMRgURCJDigIAIyhlRDIDEkQjKWVEMgMSRCiL/mcpi/9niYoAASSJigABgQqJigAAKDIDZykyA2eAB3ZlcnNpb24kZ4k=",
      "clear-state-program": "CoEBQw==",
      "foreign-apps": [],
      "foreign-assets": [],
      "global-state-schema": { "num-byte-slice": 0, "num-uint": 0 },
      "local-state-schema": { "num-byte-slice": 0, "num-uint": 0 },
      "on-completion": "update",
    },
  };
  const suggestedParams = await algodClient.getTransactionParams().do();
  const obj = {
    from: address,
    lease: undefined,
    appIndex: 70666257,
    approvalProgram: new Uint8Array(
      Buffer.from(
        appUpdate["application-transaction"]["approval-program"],
        "base64"
      )
    ),
    clearProgram: new Uint8Array(
      Buffer.from(
        appUpdate["application-transaction"]["clear-state-program"],
        "base64"
      )
    ),
    suggestedParams,
  };
  const txns = algosdk.makeApplicationUpdateTxnFromObject(obj);
  const signedTxn = txns.signTxn(key);
  await algodClient.sendRawTransaction(signedTxn).do();
} while (0);

//process.exit(0);

// create instance of existing contract

const ctcInfo = 70667685;

const spec = {
  name: "",
  desc: "",
  methods: APP_SPEC.contract.methods,
  events: [],
};

console.log(spec);

const makeCi = (ctcInfo: number, addr: string) => {
  return new CONTRACT(ctcInfo, algodClient, indexerClient, spec, {
    addr,
    sk: new Uint8Array(0),
  });
};

const ci = makeCi(ctcInfo, addr);
const ci2 = makeCi(ctcInfo, addr2);

const currentTimestamp = moment().unix();

// step 1: creator sets owner

do {
  break;
  ci.setPaymentAmount(0.1 * 1e6);
  const setupR = await ci.setup(addr, addr2);
  console.log(setupR);
  const res = await signSendAndConfirm(setupR.txns, sk);
  console.log(res);
} while (0);

// step 2: owner approves update

do {
  break;
  const setupR = await ci2.approve_update(1);
  console.log(setupR);
  const res = await signSendAndConfirm(setupR.txns, sk2);
  console.log(res);
} while (0);

process.exit(0);
