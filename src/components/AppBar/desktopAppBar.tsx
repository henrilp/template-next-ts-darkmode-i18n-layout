import useDarkMode from 'use-dark-mode'
import Toggle from 'components/Base/toggle'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import styles from './appbar.module.scss'
import routes from 'routes.json'
import Link from './link'
import France from 'svg/france.svg'
import UK from 'svg/united-kingdom.svg'
import DarkMode from 'svg/dark-mode.svg'
import LightMode from 'svg/light-mode.svg'
import {name} from '../layout'
import NextLink from 'next/link'

export default function AppBar({scrollDirection}){

	const { t, lang } = useTranslation('common')

	const darkMode = useDarkMode()

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

	return(
		<div className={'column '+styles.main}>
			<div className={'appBar aligned '+(scrollDirection === 'down' ? styles.hidden : '')}>
				<div className="row-only aligned spaced">
					<NextLink href="/">
						<a className="route" style={{paddingTop: 0, paddingBottom: 0, paddingRight: '1rem'}}>
							<span className={styles.name} style={{fontSize: '2.5vw', lineHeight: '4rem' /* here should be height of appBar*/}}>
								Henri Le Page
							</span>
						</a>
					</NextLink>
				</div>
				<nav className={'row-only aligned spaced '+styles.links}>
					{ routes.map((route,i) => (
						<div className="column aligned" key={i}>
							<Link path={route.path} name={route.name}/>
						</div>
					))}
				</nav>
				<div className={'row-only aligned '+styles.features} >
					<button className="iconButton"
						aria-label={t(lang === 'fr' ? 'french' : 'english')}
						onClick={switchLang}>
						{lang === 'fr'
							? <France className={styles.flag}/>
							: <UK className={styles.flag}/>
						}
					</button>
					<button className="iconButton" aria-label={'visibility'}
						onClick={darkMode.toggle}>
						{darkMode.value
							? <LightMode className="icon"/>
							: <DarkMode className="icon"/>
						}
					</button>
				</div>
			</div>
		</div>
	)
}
