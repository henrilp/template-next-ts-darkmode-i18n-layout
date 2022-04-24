import { Ref, useRef } from "react"
import Head from "next/head"
import styles from "./layout.module.scss"
import AppBar from "components/AppBar/appBar"
import useTranslation from "next-translate/useTranslation"
//chatbot
import { useContext } from "react"
import { DrawerContext } from "context/drawerContext"

import useScrollDirection from "lib/useScrollDirection"
import useResponsive from "lib/useResponsive"

// icons
import Popup from "components/Base/popup"
import Drawer from "./AppBar/drawer"
import Close from "svg/close.svg"

export const name = "Henri Le Page"
export const siteTitle = "Web Engineer | Henri Le Page"

export default function Layout({ children, pageId }:{children:React.ReactNode, pageId?:string}) {
	const sectionContainerRef: Ref<HTMLDivElement> = useRef(null)
	const isResponsive = useResponsive()

	const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext)
	const { t } = useTranslation("common")
	// not very elegant, could use context
	const scrollDirection = useScrollDirection(sectionContainerRef)

	// DONE:
	// <div className={"column " + styles.main} className="scrollable">
	// into
	//
	return (
		<div className={"scrollable column " + styles.main}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>{t("siteTitle")}</title>
				{/**** GOOGLE ****/}
				<meta name="description" content={t("siteDescription")} />
				{/**** FACEBOOK ****/}
				<meta property="og:type" content={"siteweb"} />
				<meta property="og:url" content={"https://www.henrilepage.com"} />
				<meta property="og:title" content={t("siteTitle")} />
				<meta property="og:description" content={t("siteDescription")} />
				<meta
					property="og:image"
					content={encodeURI("https://henrilepage.com/images/portrait.png")}
				/>
				{/***** TWITTER (todo)******/}
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			<header style={{ position: "fixed", zIndex: 2 }} className="fullWidth">
				<AppBar scrollDirection={scrollDirection} />
			</header>
			<div className={"column fullWidth positioned"} style={{ flex: "auto" }}>
				<main
					className={"column fullWidth"}
					ref={sectionContainerRef}
					style={
						!isResponsive
							? {
								scrollSnapType: "y mandatory",
								overflowY: "scroll",
								height: "100vh",
								overscrollBehaviorY: "none",
							}
							: {}
					}
				>
					{children}
				</main>

				{isDrawerOpen && (
					<Drawer
						isOpen={isDrawerOpen}
						onClose={() => setIsDrawerOpen && setIsDrawerOpen(false)}
					/>
				)}
			</div>
		</div>
	)
}
