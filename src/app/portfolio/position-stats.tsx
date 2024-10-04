import { useRef, type ChangeEvent } from "react"
import { StacksMainnet } from "@stacks/network"
import React, { useEffect, useState } from "react"
import {
  Contract,
  contractMap,
  DcaData,
  Intervals,
  intervalSeconds,
  tokenMap,
  Tokens,
  UserKey
} from "../common/utils/helpers"
import { getDcaData } from "../common/functionCalls/getDcaData"
import { Box, Flex, Grid, HStack, styled, VStack } from "@/styled-system/jsx"
import SourceTargetImageStack from "./source-target-image-stack"
import HamburgerIcon from "../components/icons/hamburger"
import {
  prettyBalance,
  prettyPrice,
  prettyTimestamp
} from "../common/utils/pretty"
import LabelInput from "./label-input"
import { getPrice, getPriceParams } from "../common/functionCalls/getPrice"
import {
  getPriceRatioDisplay,
  isSourceANumerator
} from "../common/utils/isSourceANumerator"
import { Toggle } from "../components/toggle"
import { connectWalletRecipe } from "../components/navigation/connect-wallet-recipe"
import { setUserDcaData } from "../common/functionCalls/dca/setUserDcaData"
import {
  handleFunctionCallError,
  handleFunctionCallTx
} from "../common/tx-handlers"
import Dropdown from "../components/dropdown"
import { withdraw } from "../common/functionCalls/dca/withdraw"
import Modal from "../components/modal"
import InputAmount from "../components/dca/input-amount"
import { addToPosition } from "../common/functionCalls/dca/addToPosition"
import { reducePosition } from "../common/functionCalls/dca/reducePosition"

const PositionStats = ({
  address,
  network,
  userKey
}: {
  address: string
  network: StacksMainnet
  userKey: UserKey
}) => {
  const [dcaData, setDcaData] = useState<DcaData | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [relativePrice, setRelativePrice] = useState(0)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [txID, setTxId] = useState("")
  const [modal, setModal] = useState(false)
  const [modalStatus, setModalStatus] = useState<
    "withdraw" | "add" | "reduce" | ""
  >("")
  const [modalInputAmount, setModalInputAmount] = useState("")

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  useEffect(() => {
    if (!userKey) return
    const fetchData = async () => {
      const dcaData = await getDcaData(
        address,
        userKey.source,
        userKey.target,
        userKey.interval,
        userKey.strategy,
        network
      )
      if (!dcaData) return
      setDcaData(dcaData)

      setIsPaused(dcaData.isPaused)
      setMinPrice(`${parseInt(dcaData.minPrice) / 10 ** sourceDetails.decimal}`)
      setMaxPrice(`${parseInt(dcaData.maxPrice) / 10 ** sourceDetails.decimal}`)
      setIsPaused(dcaData.isPaused)

      const setPriceAsync = async () => {
        const sourcePriceParams = getPriceParams(sourceToken, network)
        const targetPriceParams = getPriceParams(targetToken, network)
        const sourcePriceInStxPromise = getPrice(sourcePriceParams)
        const targetPriceInStxPromise = getPrice(targetPriceParams)
        const [sourcePrice, targetPrice] = await Promise.all([
          sourcePriceInStxPromise,
          targetPriceInStxPromise
        ])

        const relativePrice = sourcePrice / targetPrice
        setRelativePrice(relativePrice)
        // if (onDcaDataFetching)
        // onDcaDataFetching(dcaData, sourcePrice, targetPrice)

        console.log("position-stats", {
          source: userKey.source,
          target: userKey.target,
          relativePrice,
          dcaData,
          issourcenumerator: isSourceANumerator(sourceToken, targetToken)
        })
      }
      setPriceAsync()
    }

    fetchData()
  }, [address])

  // todo rename it to something more generic like primary/secondary
  const Button = styled("button", connectWalletRecipe)

  if (!userKey) return null
  const sourceToken = contractMap[userKey.source as Contract]
  const sourceDetails = tokenMap[sourceToken]
  const targetToken = contractMap[userKey.target as Contract]
  const targetDetails = tokenMap[targetToken]

  function handleIsPausedSelection(
    e: ChangeEvent<HTMLInputElement>,
    isSelected: boolean
  ) {
    const token = e.target.value
    setIsPaused(isSelected)
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value)
  }

  const handleDcaAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBuyAmount(value)
  }

  const onSelect = (option: any) => {
    setModalStatus(option.split(" ")[0] ?? "")
    setModal(true)
  }
  const renderModal = () => {
    let title = ""
    let callbackFunc
    switch (modalStatus.toLowerCase()) {
      case `withdraw`:
        title = `Withdraw`
        callbackFunc = () =>
          withdraw(
            network,
            address,
            sourceToken,
            targetToken,
            userKey.interval,
            userKey.strategy,
            modalInputAmount,
            setTxId
          )
      case `add`:
        title = `Add To Position `
        callbackFunc = () =>
          addToPosition(
            network,
            address,
            sourceToken,
            targetToken,
            userKey.interval,
            userKey.strategy,
            modalInputAmount,
            setTxId
          )
      case `reduce`:
        title = `Reduce Position `
        callbackFunc = () =>
          reducePosition(
            network,
            address,
            sourceToken,
            targetToken,
            userKey.interval,
            userKey.strategy,
            modalInputAmount,
            setTxId
          )
      default:
        console.log(`Unknown option selected:` + modalStatus)
    }

    console.log("PositionStats 2")
    return (
      <VStack
        maxWidth={"10rem"}
        justifyContent={"center"}
        alignItems={"center"}
        overflow={"hidden"}
      >
        <InputAmount
          amount={modalInputAmount}
          setAmount={setModalInputAmount}
          name="Amount"
          center={true}
        />
        <Button onClick={callbackFunc}>{title}</Button>
      </VStack>
    )
  }

  if (!dcaData) return null
  // TODO using which amm?
  // Todo how many buy s left
  // Todo how many were done
  // Todo average price so far
  // Todo hamburger menu that adds to position, or reducres position or withdraws targets
  // Todo change the interval from setdcadata by deleting and recreading the position.
  // TODO one limitation of the contracts is that the dca positions are never deleted, the amount to trade just stays at zero.
  // 				so when a user wants to start another dca position for the same key, we need to detect that at the level of the create dca button and redirect them to the appropriate card here

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="1rem"
      borderColor={"grey"}
      bg="#15161f"
      width={["100%", "100%", "700px"]}
      maxWidth="800px"
      margin="auto"
    >
      <HStack justifyContent={"space-between"}>
        <HStack>
          <SourceTargetImageStack
            sourceImage={sourceDetails.image}
            targetImage={targetDetails.image}
          />
        </HStack>
        <Flex onClick={toggleDropdown}>
          <Box position={"relative"} minWidth={"10rem"}>
            <Dropdown
              options={[
                `Withdraw ${targetDetails.displayName}`,
                `Add ${sourceDetails.displayName}`,
                `Reduce ${sourceDetails.displayName}`
              ]}
              onSelect={onSelect}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              displayHandler={(o: string) => o}
            />
          </Box>
          <HamburgerIcon />
        </Flex>
        <Modal
          isVisible={modal}
          onClose={() => setModal(false)}
          setIsVisible={setModal}
        >
          {renderModal()}
        </Modal>
      </HStack>
      <Grid
        gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={4}
        mt="0.5rem"
        pb="0.5rem"
        gridColumnGap={8}
        borderBottom="1px solid grey"
      >
        <LabelInput
          input={`${dcaData.targetAmount}`}
          label={`${targetDetails.displayName} Rewards`}
          prettier={(balance: string) =>
            prettyBalance(balance, sourceDetails.decimal)
          }
        />
        <LabelInput
          input={`${Number(dcaData.sourceAmountLeft)}`}
          label={`${sourceDetails.displayName} Left`}
          prettier={(balance: string) =>
            prettyBalance(balance, sourceDetails.decimal)
          }
        />
        <LabelInput
          input={`${prettyTimestamp((Number(dcaData.lastUpdatedTimestamp) + intervalSeconds[userKey.interval as Intervals]) * 1000)}`}
          label="Next Buy In"
        />
        <LabelInput
          input={`${prettyTimestamp(Number(dcaData.lastUpdatedTimestamp) * 1000)}`}
          label="Last Buy Time"
        />

        <LabelInput
          input={BigInt(dcaData.sourceAmountLeft) / BigInt(dcaData.amount)}
          label="Buys Left"
        />
        <LabelInput
          input={relativePrice}
          label={getPriceRatioDisplay(sourceToken, targetToken)}
          prettier={prettyPrice}
        />
        {/* <Box mb="5rem">ww</Box> */}
      </Grid>
      <Grid
        gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={4}
        mt="0.5rem"
        pb="0.5rem"
        gridColumnGap={8}
      >
        <LabelInput
          input={minPrice}
          label="Min Price"
          prettier={prettyPrice}
          handleChange={handleMinPriceChange}
        />
        <LabelInput
          input={maxPrice}
          label="Max Price"
          prettier={prettyPrice}
          handleChange={handleMaxPriceChange}
        />
        <LabelInput
          input={buyAmount}
          label="Buy Amount"
          prettier={(balance: string) =>
            prettyBalance(balance, sourceDetails.decimal)
          }
          handleChange={handleDcaAmountChange}
        />
        <HStack justifyContent={["none", "flex-end"]} alignItems={"center"}>
          <span>Pause</span>
          <Toggle
            inputValue={"isPaused"}
            getInitialState={() => isPaused}
            handleSelection={handleIsPausedSelection}
          />
        </HStack>
      </Grid>

      <HStack justifyContent={"flex-end"}>
        <Button
          onClick={async () => {
            try {
              await setUserDcaData(
                network,
                sourceToken,
                targetToken,
                userKey.interval,
                userKey.strategy,
                isPaused,
                buyAmount,
                minPrice,
                maxPrice,
                setTxId
              )
              handleFunctionCallTx(txID)
            } catch (error) {
              handleFunctionCallError(txID)
            }
          }}
        >
          Adjust Position
        </Button>
      </HStack>
    </Box>
  )
}

export default PositionStats
