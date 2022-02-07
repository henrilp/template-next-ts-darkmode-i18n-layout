
import {useRef} from 'react'
import Footer from './footer'
import Up from 'svg/upwards-arrow.svg'
import Down from 'svg/arrow-pointing-downwards.svg'
import useResponsive from 'lib/useResponsive'

export default function Section({alternate, footer, children, downScroll, upScroll}){
	const ref = useRef()
	const handleDownScroll = () => {
		// it refers to the "main" node, which has css scroll snap attributes
		ref.current.parentNode.scrollBy({
			top: window.innerHeight,
			left: 0,
			behavior: 'smooth'
		})
	}
	const isResponsive = useResponsive()
	return(
		<div ref={ref} className={'column scrollable fullView '
      + (alternate ? 'alternate' : '')}
		style={!isResponsive ? {scrollSnapAlign: 'start'} : null}
		>
			<section className="positioned column centered fluid">
				{children}
				{!isResponsive && downScroll && (
					<button className={'iconButton'}
						style={{position: 'absolute', bottom: '2rem', left: '50%', marginLeft: '-1.25rem'}}
						onClick={handleDownScroll} aria-label={'down'}>
						<Down className="contrastIcon smallIcon"/>
					</button>
				)}
			</section>
			{footer &&(
				<Footer />
			)}
		</div>
	)
}
