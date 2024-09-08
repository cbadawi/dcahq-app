import { openContractCall } from "@stacks/connect"
import {
  uintCV,
  principalCV,
  boolCV,
  makeStandardSTXPostCondition,
  FungibleConditionCode
} from "@stacks/transactions"
import { StacksMainnet } from "@stacks/network"
import { appName } from "../../helpers"

export const setSourcesTargetsConfig = (
  source: string,
  target: string,
  id: number,
  feeFixed: number,
  feePercent: number,
  sourceFactor: number,
  helperFactor: number,
  isSourceNumerator: boolean,
  minDcaThreshold: number,
  maxDcaThreshold: number,
  strategyPrincipal: string,
  maxSlippage: number,
  contractAddress: string,
  contractName: string,
  network: StacksMainnet
) => {
  const functionArgs = [
    principalCV(source),
    principalCV(target),
    uintCV(id),
    uintCV(feeFixed),
    uintCV(feePercent),
    uintCV(sourceFactor),
    uintCV(helperFactor),
    boolCV(isSourceNumerator),
    uintCV(minDcaThreshold),
    uintCV(maxDcaThreshold),
    principalCV(strategyPrincipal),
    uintCV(maxSlippage)
  ]

  const options = {
    contractAddress,
    contractName,
    functionName: "set-sources-targets-config",
    functionArgs,
    network,
    // postConditions,
    appDetails: {
      name: appName,
      // icon: window.location.origin + "/logo."
      icon: "https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde2ae1fe3a1f_icon-isotipo.svg"
    },
    onFinish: (data: any) => {
      console.log(
        " set-sources-targets-config Transaction ID: " +
          data.txId +
          "Raw transaction:" +
          data.txRaw
      )
    }
  }

  return openContractCall(options)
}
