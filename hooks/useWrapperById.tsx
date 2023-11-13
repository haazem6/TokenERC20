import { useEffect, useState } from "react"
import { ReadOutput } from "../types"
import { useContractRead } from "wagmi"
import WRAPPER_FACTORY_ABI from "../abi/WrapperFactory.json"
import { toast } from 'react-toastify'
import { FACTORY_ADDRESS } from "../constants"

//  hook to fetch the address of a wrapper token by its ID
export function useWrapperById(wrapperId: number): `0x${string}` {
  // State to store the address 
  const [address, setAddress] = useState<`0x${string}`>()

  // Custom hook to read the 'wrapperById' function from the WrapperFactory contract
  const wrapperByIdRead: ReadOutput<`0x${string}`> = useContractRead({
    address: FACTORY_ADDRESS,
    abi: WRAPPER_FACTORY_ABI,
    functionName: "wrapperById",
    args: [wrapperId]
  })


  useEffect(() => {
    // Setting the state with the fetched address
    setAddress(wrapperByIdRead?.data)
  }, [wrapperByIdRead?.data])

  return address
}
