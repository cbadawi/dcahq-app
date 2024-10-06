import { VStack } from "@/styled-system/jsx"
import DcaCard from "./components/dca/DcaCard"
import HeaderBanner from "./components/header-banner"
import { css } from "@/styled-system/css"

export default function Home() {
  return (
    <VStack className={css({ pt: "10px" })}>
      <VStack justifyContent="center" alignItems="center" maxWidth={"90%"}>
        <HeaderBanner>
          For everyone who has bought a token only to see its value plummet a
          few days later.
        </HeaderBanner>
        <HeaderBanner>
          Non-Custodial, Emotion-Free Investing on Auto-Pilot.
        </HeaderBanner>
        {/* <HeaderBanner>Build Wealth, One Swap at a Time</HeaderBanner> */}
        {/* Ideal for bear markets */}
      </VStack>
      <div className={css({ fontSize: "2xl" })}>
        <DcaCard />
      </div>
    </VStack>
  )
}
