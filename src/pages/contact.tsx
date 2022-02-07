import Layout from 'components/layout'
import ContactForm from 'components/contactForm'
import useTranslation from 'next-translate/useTranslation'
import Section from '../components/section'

export default function Contact() {
	const {t} = useTranslation('common')

	return (
		<Layout>
			<Section footer>
				<h1>{t('contact')}</h1>
				<ContactForm/>
			</Section>
		</Layout>
	)
}
