import { useRef, useEffect, Ref } from "react"
import useDarkMode from "use-dark-mode"
import Close from "svg/close.svg"
import { Transition } from "react-transition-group"
import useTranslation from "next-translate/useTranslation"

export default function Popup({ onClose, style, title, children }: { 
  onClose: () => void; 
  style?: React.CSSProperties; 
  title?: string; 
  children: React.ReactNode
 }) {
	const { t } = useTranslation("common")
	const darkMode = useDarkMode()
	const node: Ref<HTMLDivElement> = useRef(null)

	useEffect(() => {
		const handleClick = (e) => {
			if (node && node.current && node.current.contains(e.target)) {
				// inside click
				return
			}
			onClose()
		}

		// add when mounted
		document.addEventListener("mousedown", handleClick)
		// return function to be called when unmounted
		return () => {
			document.removeEventListener("mousedown", handleClick)
		}
	}, [onClose])

	const transitionStyles = {
		entering: {
			opacity: 0,
		},
		entered: {
			opacity: 1,
		},
		exiting: {
			opacity: 0,
		},
		exited: {
			opacity: 0,
		},
	}
	return (
		<div>
			<div className="modal column aligned spaced">
				<Transition in appear timeout={0}>
					{(state) => (
						// kind of sloppy
						<div
							ref={node}
							className="paper scrollable content positioned"
							style={{
								...style,
								...transitionStyles[state],
							}}
						>
							<button
								className={"close iconButton"}
								style={{ zIndex: 1000 }}
								onClick={onClose}
								aria-label={t("close")}
							>
								<Close className="contrastIcon smallIcon" />
							</button>
							{title && <h2 style={{ textAlign: "center" }}>{title}</h2>}
							{children}
						</div>
					)}
				</Transition>
			</div>
			<style jsx>{`
        .modal {
          top: 0;
          left: 0;
          position: fixed;
          z-index: 10;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }
        .content {
          margin-left: 1rem;
          margin-right: 1rem;
          overflow-y: auto;
          box-shadow: 0 0 1rem black;
          background-color: ${darkMode.value ? "black" : "white"};
          transition: opacity 400ms ease-in;
          opacity: 0;
        }
        .close {
          position: absolute;
          top: 0;
          right: 0;
        }
      `}</style>
		</div>
	)
}
