import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import simpleContractAbi from "../abi/SimpleContract.json";
import { simpleContractAddress } from "../contracts";

const simpleContractInterface = new ethers.utils.Interface(simpleContractAbi);
const contract = new Contract(simpleContractAddress, simpleContractInterface);

export function useAdmStatus(ownerAddress: string) {
  const [status] =
    useContractCall( ownerAddress && {
      abi: simpleContractInterface,
      address: simpleContractAddress,
      method: "isAdmin",
      args: [ownerAddress],
    }) ?? [];
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+status+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  return status;
}

export function useRegStatus(ownerAddress: string) {
  const [status] =
    useContractCall( ownerAddress && {
      abi: simpleContractInterface,
      address: simpleContractAddress,
      method: "isMember",
      args: [ownerAddress],
    }) ?? [];
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+status+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  return status;
}

export function useGetMyGB(ownerAddress: string) {
  const [status] =
    useContractCall( ownerAddress && {
      abi: simpleContractInterface,
      address: simpleContractAddress,
      method: "getIgnotsUser",
      args: [ownerAddress],
    }) ?? [];
  console.log(status);
  return status;
}

export function useGetBuyGB(ownerAddress: string) {
  const [status] =
    useContractCall( ownerAddress && {
      abi: simpleContractInterface,
      address: simpleContractAddress,
      method: "getIgnotsNotUser",
      args: [ownerAddress],
    }) ?? [];
  console.log(status);
  return status;
}

export function useGetStatus(number: Number) {
  const [status] =
    useContractCall( number && {
      abi: simpleContractInterface,
      address: simpleContractAddress,
      method: "getIgnotStatusById",
      args: [number],
    }) ?? [];
  console.log(status);
  return status;
}


export function useAddMember() {
    const { state, send } = useContractFunction(contract, "addMember", {});
    return { state, send };
  }

export function useIncrement() {
  const { state, send } = useContractFunction(contract, "incrementCount", {});
  return { state, send };
}

export function useSetCount() {
  const { state, send } = useContractFunction(contract, "setCount", {});
  return { state, send };
}

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(contract, methodName, {});
  return { state, send };
}