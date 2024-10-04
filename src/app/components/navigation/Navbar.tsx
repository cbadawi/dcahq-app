import Link from "next/link"
import Image from "next/image"
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
        px: ["", "1rem"],
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
          alignItems: "center",
          _hover: {
            bg: "#15161f",
            color: "orange"
          }
        })}
      >
        <Flex gap={[0, 3]} alignItems="center">
          <Image
            className={css({ display: ["none", "block"] })}
            src="/favicon.ico"
            width={30}
            height={40}
            style={{ width: "auto" }}
            alt="Logo"
          />
          <Link href="/">DCA-HQ</Link>
        </Flex>
      </div>
      <ul
        className={css({
          display: "flex",
          listStyle: "none",
          gap: [0, "1rem"],
          alignItems: "center",
          margin: 0
        })}
      >
        <li>
          <Link
            href="/portfolio"
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
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className={css({
              color: "white",
              display: "flex",
              padding: ["0.02rem", "0.25rem 1rem"],
              flexDirection: ["column", "row"],
              border: "2px solid transparent",
              transition: "all 0.3s ease",
              _hover: {
                bg: "#15161f",
                borderRadius: "12px",
                color: "orange",
                borderColor: "lightgrey"
              }
            })}
          >
            <span>Strategies</span>
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
