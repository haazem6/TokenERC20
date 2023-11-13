import { useEffect, useState } from "react"
import { ReadOutput } from "../types"
import { useContractRead } from "wagmi"
import WRAPPER_FACTORY_ABI from "../abi/WrapperFactory.json"
import { toast } from 'react-toastify'
import { FACTORY_ADDRESS } from "../constants"
import { BigNumber } from "ethers"


export function useTotalWrappersCount(): number {
  // State to store the total count of wrappers
  const [count, setCount] = useState<number>(0)

  //  hook to read the 'nextId' function from the WrapperFactory contract
  const nextIdRead: ReadOutput<BigNumber> = useContractRead({
    address: FACTORY_ADDRESS,
    abi: WRAPPER_FACTORY_ABI,
    functionName: "nextId",
    onError(error: any) {
      toast.error("Error fetching wrappers count")
    },
  })


  useEffect(() => {
    // Calculating the total count of wrappers from the fetched data
    const totalWrappers: number = nextIdRead && nextIdRead.data ? (Math.max(nextIdRead.data.toNumber(), 0)) : 0

    // Setting the state with the total count
    setCount(totalWrappers)
  }, [nextIdRead?.data])

  return count
}
