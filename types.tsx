import { BigNumber } from "ethers"

export type ReadOutput<T> = {
  data: T | undefined,
  isLoading: boolean,
  isError: boolean,
}

export type AccountResult = {
  address: `0x${string}`,
  isConnecting: boolean,
  isDisconnected: boolean,
  isConnected: boolean,
  isReconnecting: boolean,
}

export type TokenData = {
  address: `0x${string}`,
  name: string,
  symbol: string,
  decimals: number,
  balance: BigNumber,
}

export type WrapperInfo = {
  wrapperId?: number,
  
  wrapper: TokenData,
  token: TokenData,

  liquidity: BigNumber,
  tokenAllowance: BigNumber
}

export type AmountsOut = {
  wrap: BigNumber,
  unwrap: BigNumber,
}

export type WrapOperationType = "wrap" | "unwrap"

export type WrapUnwrapFormParams = {
  amount: BigNumber,
  receiver: `0x${string}`,
  functionName: WrapOperationType,
}

export type WrapperDeployParams = {
  tokenAddress: string,
  name: string,
  symbol: string,
  decimals: number,

  tokenAmount: BigNumber,
  wrapperAmount: BigNumber,
}

export type WrapperListFilter = "all" | "owned"