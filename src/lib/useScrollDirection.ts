import { useState, useEffect, forwardRef } from "react"
import useResponsive from "./useResponsive"

const useScrollDirection = (ref) => {
	const [scrollDirection, setScrollDirection] = useState<string|undefined>(undefined)
	const [prevOffset, setPrevOffset] = useState(0)
	const isResponsive = useResponsive()
	const toggleScrollDirection = () => {
		const scrollY = isResponsive ? window.pageYOffset : ref.current.scrollTop
		if (scrollY <= 0) {
			setScrollDirection(undefined)
		} else if (scrollY > prevOffset) {
			setScrollDirection("down")
		} else if (scrollY < prevOffset) {
			setScrollDirection("up")
		}
		setPrevOffset(scrollY)
	}
	useEffect(() => {
		// added line below recently
		const currentNode = ref && ref.current
		if (isResponsive) {
			document.addEventListener("scroll", toggleScrollDirection)
		} else {
			currentNode.addEventListener("scroll", toggleScrollDirection)
		}
		return () => {
			if (isResponsive) {
				document.removeEventListener("scroll", toggleScrollDirection)
			} else {
				currentNode &&
          currentNode.removeEventListener("scroll", toggleScrollDirection)
			}
		}
	})
	return scrollDirection
}
export default useScrollDirection
