import { useEffect, useState } from "react"
import { ReadOutput, AmountsOut } from "../types"
import { useContractReads } from "wagmi"
import WRAPPER_TOKEN_ABI from "../abi/WrapperToken.json"
import { toast } from 'react-toastify'
import { BigNumber } from "ethers"

export function useAmountsOut(
  address: `0x${string}`,
  tokenAmountIn: BigNumber | undefined,
  wrapperAmountIn: BigNumber | undefined,
): AmountsOut {
  // State to store the fetched amounts out
  const [amountsOut, setAmountsOut] = useState<AmountsOut>()

  // Array to hold contract calls based on provided input amounts
  let contractCalls = []
  if (tokenAmountIn) {
    contractCalls.push({
      address: address,
      abi: WRAPPER_TOKEN_ABI,
      functionName: 'getWrapAmountOut',
      args: [tokenAmountIn]
    })
  }
  if (wrapperAmountIn) {
    contractCalls.push({
      address: address,
      abi: WRAPPER_TOKEN_ABI,
      functionName: 'getUnwrapAmountOut',
      args: [wrapperAmountIn]
    })
  }

  // Custom hook to read data from the contract(s)
  const amountsOutRead: ReadOutput<Array<any>> = useContractReads({
    contracts: contractCalls,
    enabled: Boolean(address && address.length > 3 && contractCalls.length > 0),
    onError(error: any) {
      toast.error("Error fetching amounts out")
    },
  })

  // Effect to update the state when data is fetched
  useEffect(() => {
    // Mapping the fetched data to the AmountsOut type
    const result: AmountsOut = {
      wrap: tokenAmountIn ? amountsOutRead?.data?.[0] : undefined,
      unwrap: (tokenAmountIn && wrapperAmountIn) ? amountsOutRead?.data?.[1] 
        : (!tokenAmountIn && wrapperAmountIn) ? amountsOutRead?.data?.[0] : undefined,
    }

    // Setting the state with the fetched amounts out
    setAmountsOut(result)
  }, [amountsOutRead?.data])

  
  return amountsOut
}
