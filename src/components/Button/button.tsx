import styles from './button.module.scss'
import useDarkMode from 'use-dark-mode'
import { useRouter } from 'next/router'

const Button = ({ children, onClick, variant, className, href, disabled, isSubmit }:{
	children:any,
	onClick?:()=>void,
	variant?:string,
	className?:string,
	href?:string,
	disabled?:boolean,
	isSubmit?:boolean
}) => {
	const darkMode = useDarkMode()
	const router = useRouter()
	return(
		<button type={isSubmit ? 'submit' : undefined}
			disabled={disabled}
			className={(className ? className : '')+' positioned '+
      (styles.common + ' '+
      (variant === 'primary' ? styles.primary :
      	variant === 'outlined' ? (darkMode.value ? styles.darkOutlined : styles.outlined) : ''
      ))}
			role={href ? 'link' : 'button'}
			onClick={() => {
				if(onClick){
					onClick()
				}
				if (href){
					router.push(href)
				}
			}}
		>
			{children}
		</button>
	)
}
export default Button
