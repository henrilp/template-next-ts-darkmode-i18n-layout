import { useState, useEffect } from "react"
import variables from "styles/_variables.module.scss"

const bp = parseInt(variables.breakpoint, 10)

export default function useResponsive() {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	})
	// in case wwe are on server side
	if (typeof window === "undefined") {
		return null
	}
	return width < bp
}
