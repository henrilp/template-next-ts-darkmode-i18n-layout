import {useContext} from 'react'
import useDarkMode from 'use-dark-mode'
import Toggle from 'components/Base/toggle'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import styles from './appbar.module.scss'
import routes from 'routes.json'
import SandwichOpen from 'svg/sandwich-open.svg'
import Sandwich from 'svg/sandwich.svg'
import France from 'svg/france.svg'
import UK from 'svg/united-kingdom.svg'
import DarkMode from 'svg/dark-mode.svg'
import LightMode from 'svg/light-mode.svg'
import {DrawerContext} from 'context/drawerContext'
import Link from 'next/link'

export default function AppBar({scrollDirection}){
	const darkMode = useDarkMode()
	const { t, lang } = useTranslation('common')
	const {isDrawerOpen, setIsDrawerOpen} = useContext(DrawerContext)

	const switchLang = async () => {
		switch(lang){
		case 'fr':
			return await setLanguage('en')
		case 'en':
			return await setLanguage('fr')
		default:
			return
		}
	}
	// full screen fixed
	return(
		<div className={'appBar aligned '+styles.appBarResp+' '+(scrollDirection === 'down' ? styles.hidden : '')}
			style={darkMode.value ? {backgroundColor: 'black'}:null}>
			<div className="row-only aligned spaced">
				<button className="iconButton" aria-label="navigation drawer"
					onClick={(e) => {
						e.preventDefault()
						setIsDrawerOpen(!isDrawerOpen)
					}}>
					{isDrawerOpen
						? <SandwichOpen className={styles.sandwich}/>
						: <Sandwich className={styles.sandwich}/>
					}
				</button>
			</div>

			<div className="row-only aligned spaced">
				<Link href="/">
					<a className="route">
						<span style={{fontSize: '5vw'}}>H.LP</span>
					</a>
				</Link>
			</div>


			<div className="row-only aligned spaced">
				<button className="iconButton"
					aria-label={t(lang === 'fr' ? 'french' : 'english')}
					onClick={switchLang}>
					{lang === 'fr'
						? <France className={styles.flag}/>
						: <UK className={styles.flag}/>
					}
				</button>
			</div>
			<div className="row-only aligned spaced">
				<button className="iconButton" aria-label={'visibility'}
					onClick={darkMode.toggle}>
					{darkMode.value
						? <LightMode className="icon"/>
						: <DarkMode className="icon"/>
					}
				</button>
			</div>
		</div>

	)
}
