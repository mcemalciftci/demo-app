import * as React from "react"

const TABLET_MIN_WIDTH = 768
const TABLET_MAX_WIDTH = 1024

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= TABLET_MIN_WIDTH && width <= TABLET_MAX_WIDTH)
    }

    checkTablet()
    window.addEventListener("resize", checkTablet)

    return () => window.removeEventListener("resize", checkTablet)
  }, [])

  return isTablet
}
