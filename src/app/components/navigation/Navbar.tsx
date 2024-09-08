import Link from "next/link"
import { css } from "../../../../styled-system/css"
import { Flex } from "../../../../styled-system/jsx"
import ConnectWallet from "./ConnectWallet"
import Soon from "../soon"

const Navbar = () => {
  return (
    <nav
      className={`navbar ${css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: "1rem",
        py: "0.5rem",
        backgroundColor: "#131721"
      })}`}
    >
      <div
        className={css({
          fontWeight: "bold",
          fontSize: "xl",
          color: "white",
          display: "flex",
          alignItems: "center"
        })}
      >
        <Flex gap={3} alignItems="center">
          {/* <Image src="/favicon.ico" width={30} height={40} alt="Logo" /> */}
          <Link href="/">DCA-HQ</Link>
        </Flex>
      </div>
      <ul
        className={css({
          display: "flex",
          listStyle: "none",
          gap: "1rem",
          alignItems: "center",
          margin: 0
        })}
      >
        <li>
          <Link
            href="/"
            className={css({
              color: "white",
              padding: "0.25rem 1rem", // Add padding for a nicer hover effect
              border: "2px solid transparent", // Initial border setup
              transition: "all 0.3s ease", // Smooth transition on hover
              _hover: {
                bg: "#15161f",
                borderRadius: "12px",
                color: "orange", // Change color to orange
                borderColor: "lightgrey" // Change border color to white
              }
            })}
          >
            Strategies
            <Soon />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className={css({
              color: "white",
              padding: "0.25rem 1rem",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
              _hover: {
                borderRadius: "12px",
                bg: "#15161f",
                color: "orange",
                borderColor: "lightgrey"
              }
            })}
          >
            Portfolio
            <Soon />
          </Link>
        </li>
        <li>
          <ConnectWallet />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
