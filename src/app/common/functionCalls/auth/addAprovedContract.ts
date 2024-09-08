import { principalCV } from "@stacks/transactions"
import { appName } from "../../helpers"
import { StacksMainnet } from "@stacks/network"
import { openContractCall } from "@stacks/connect"

export function addApproved(
  approvedAddress: string,
  contractAddress: string,
  contractName: string,
  network: StacksMainnet
) {
  const functionArgs = [principalCV(approvedAddress)]

  const options = {
    contractAddress,
    contractName,
    functionName: "add-approved-contract",
    functionArgs,
    network,
    // postConditions,
    appDetails: {
      name: appName,
      icon: "https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde2ae1fe3a1f_icon-isotipo.svg"
    },
    onFinish: (data: any) => {
      console.log(
        " add-approved Transaction ID: " +
          data.txId +
          "Raw transaction:" +
          data.txRaw
      )
    }
  }

  return openContractCall(options)
}
