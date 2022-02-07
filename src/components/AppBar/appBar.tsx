import DesktopAppBar from './desktopAppBar'
import MobileAppBar from './mobileAppBar'

export default function AppBar({scrollDirection}){
	return(
		<div>
			<div className="mobile-layout">
				<MobileAppBar scrollDirection={scrollDirection}/>
			</div>
			<div className="desktop-layout scrollable">
				<DesktopAppBar scrollDirection={scrollDirection}/>
			</div>
		</div>
	)
}
