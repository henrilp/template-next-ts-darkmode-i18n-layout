import styles from './appbar.module.scss'
import { Transition } from 'react-transition-group'
import DrawerContent from './drawerContent'

const transitionStyles = {
	entering: { maxWidth: 0, opacity: 0 },
	entered: { maxWidth: '20rem', opacity: 1 },
	exiting: { maxWidth: 0 },
	exited: { maxWidth: 0 },
}

export default function Drawer({isOpen, onClose}){
	return(
		<div className={styles.drawerContainer}>
			<Transition in appear timeout={0}>
				{ state => {
					return(
						<div style={transitionStyles[state]}
							className={'fullHeight '+styles.drawer}>
							{state === 'entered' && <DrawerContent />}
						</div>
					)
				}}
			</Transition>
			{isOpen && <div className={styles.obscure} onClick={onClose}/>}
		</div>
	)
}
