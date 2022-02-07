import {useContext} from "react"
import Link from "./link"
import useTranslation from "next-translate/useTranslation"
import styles from "./appbar.module.scss"
import routes from "routes.json"
import SandwichOpen from "svg/sandwich-open.svg"
import {DrawerContext} from "context/drawerContext"

export default function DrawerContent(){
	const { t } = useTranslation("common")
	const {setIsDrawerOpen} = useContext(DrawerContext)
	const close = () => setIsDrawerOpen(false)
	return(
		<nav className="column aligned padded scrollable">
			<button className="iconButton" aria-label="navigation drawer"
				onClick={close}>
				<SandwichOpen className={styles.sandwich}/>
			</button>
			{ routes.map((route,i) =>(
				<Link path={route.path} key={i} name={route.name} onClick={close}/>
			))}
			<a className="route" target={"_blank"} href={t("urlRandom")} rel="noreferrer">{t("random")}</a>
		</nav>
	)
}
