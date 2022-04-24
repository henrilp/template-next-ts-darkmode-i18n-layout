import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import Button from 'components/Button/button'

export default function CustomLink({path, name, onClick}:{path:string, name:string, onClick?:()=>void}) {
	const router = useRouter()
	const { t } = useTranslation('common')
	return(
		<Link href={path}>
			<a className={'route '+(path === router.pathname ? 'currentRoute' : '')}
				onClick={onClick}
				style={path === '/contact' ? {backgroundColor: '#2c7f91'} : undefined}
			>
				{t(name)}
			</a>
		</Link>
	)
}
