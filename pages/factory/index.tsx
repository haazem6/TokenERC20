import { useState, useEffect } from "react"
import ContentWrapper from "../../components/layout/ContentWrapper"
import CenteredContent from "../../components/layout/CenteredContent"
import WrapperDeployForm from "../../components/form/WrapperDeployForm"
import Card from "react-bootstrap/Card"
import { FACTORY_ADDRESS, EXPLORER_TX_BASE_LINK, UNIT } from "../../constants"
import { WrapperDeployParams } from "../../types"
import WRAPPER_FACTORY_ABI from "../../abi/WrapperFactory.json"
import { prepareWriteContract, writeContract, SendTransactionResult } from '@wagmi/core'
import { useWaitForTransaction } from 'wagmi'
import { BigNumber } from "ethers"
import * as ethers from "ethers"
import { toast } from 'react-toastify'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'


export default function Factory() {
  // State to manage transaction hash and created wrapper address
  const [deployTxHash, setDeployTxHash] = useState<`0x${string}`>("0x0")
  const [createdWrapperAddress, setCreatedWrapperAddress] = useState<`0x${string}`>("0x0")

  // Custom hook to wait for the transaction and handle success/error messages
  const { data } = useWaitForTransaction({
    hash: deployTxHash,
    enabled: Boolean(deployTxHash && deployTxHash.length > 3),
    onSuccess(data: any) {
      toast.success("Transaction has been confirmed")
    },
    onError(error: any) {
      toast.error("Error on deploy transaction")
    },
  })

  // Effect to extract information from the transaction logs after it's confirmed
  useEffect(() => {
    if (data) {
      const iface = new ethers.utils.Interface(WRAPPER_FACTORY_ABI);
      const newWrapperLog = iface.parseLog(data.logs?.[0])

      setCreatedWrapperAddress(newWrapperLog?.args?.wrapper)
    }
  }, [data])

  // Function to handle form submission for deploying a new wrapper token
  const onSubmit = async (data: WrapperDeployParams): Promise<void> => {
    setDeployTxHash("0x0")
    setCreatedWrapperAddress("0x0")

    return prepareWriteContract({
      address: FACTORY_ADDRESS,
      abi: WRAPPER_FACTORY_ABI,
      functionName: "deploy",
      args: [
        data.tokenAddress,
        data.wrapperAmount.mul(UNIT).div(data.tokenAmount),
        data.name,
        data.symbol,
        BigNumber.from(data.decimals)
      ]
    })
    .then((config) => {
      return writeContract(config)
      .then((result: SendTransactionResult) => {
        toast.info("Transaction has been submitted. Waiting for confirmation...")
        setDeployTxHash(result.hash)
      })
      .catch((error: any) => {
        toast.warning("Transaction has been rejected")
      })
    })
    .catch((error: any) => {
      toast.error("Error preparing deploy transaction")
    })
  }

  // Rendering the page content
  return (
    <ContentWrapper
      title="Factory"
      description="Send a new token."
    > 
      <CenteredContent size="sm">
        <Card className="p-0 m-0">
          <div className="w-100 text-justify p-4 pb-2">
            📙 ERC-20 is the technical standard for fungible tokens created using the Ethereum blockchain.
          </div>

          <hr/>

          <Card.Body className="px-4">
            <div>
              {/* Form component for deploying a new wrapper token */}
              <WrapperDeployForm 
                onSubmit={onSubmit} 
              />
            </div>

            {/* Displaying loading spinner while waiting for transaction confirmation */}
            {(Boolean(deployTxHash) && deployTxHash.length > 3 && !data) && (
              <Alert 
                className="my-4 text-center "
                variant="info"
              >
                <Spinner size="sm" />
                {" "}
                <span>Your transaction has been submitted.</span>
                {" 🔗"}
                <a
                  href={EXPLORER_TX_BASE_LINK + deployTxHash}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Check status on etherscan.</span>
                </a>
              </Alert>
            )}

            {/* Displaying success message when the transaction is confirmed */}
            {data && (
              <Alert 
                className="my-4 text-center "
                variant="success"
              >
                ✅ Your wrapper contract has been created.
                {" "}
                {/* Link to navigate to the newly created wrapper */}
                <Link
                  href={"/wrappers/" + createdWrapperAddress}
                >
                  Go wrap your assets!
                </Link>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </CenteredContent>
    </ContentWrapper>
  )
}
