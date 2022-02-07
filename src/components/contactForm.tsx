import React from 'react'
import {useState} from 'react'
import { useForm } from 'react-hook-form'
import Spinner from 'components/Base/spinner'
import isEmpty from 'lodash/isEmpty'
import useTranslation from 'next-translate/useTranslation'
import Button from 'components/Button/button'
import Popup from 'components/Base/popup'

export default function ContactForm(){
	const { t } = useTranslation('contact')

	const { register, handleSubmit, errors, reset } = useForm()

	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [sendError, setSendError] = useState(false)

	const submitForm = data => {
		setSubmitting(true)
		fetch('/api/sendContactMail', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => {
			if(res.status === 200){
				setSubmitted(true)
				reset()
			} else {
				console.error(res)
				setSendError(true)
			}
		}).catch( err => {
			console.error(err)
			setSendError(true)
		}).finally(() => {
			setSubmitting(false)
		})
	}
	return(
		<form className="column aligned fullWidth" onSubmit={handleSubmit(submitForm)}>
			{submitted && <Popup onClose={() => setSubmitted(false)}>
				<span>{t('success')}</span>
			</Popup>
			}
			{sendError && <Popup onClose={() => setSendError(null)}>
				<span className="error">{t('error')}</span>
			</Popup>
			}
			<label htmlFor="name"><h3>{t('name')}</h3></label>
			<input name="name" id="name"
				placeholder={t('namePlaceholder')}
				className={'textField '+(errors.name ? 'fieldError':'')} type="text"
				disabled={submitting}	autoComplete="given-name" aria-required
				ref={register({ required: t('required'), maxLength: 20 })} />
			{ errors.name && <span className="error">{errors.name.message}</span>}

			<label htmlFor="email"><h3>{t('email')}</h3></label>
			<input name="email" id="email"
				placeholder={t('emailPlaceholder')}
				className={'textField '+(errors.email ? 'fieldError':'')} type="email"
				disabled={submitting} autoComplete="email" aria-required
				ref={register({ required: t('required')})} />
			{ errors.email && <span className="error">{errors.email.message}</span>}

			<label htmlFor="message"><h3>{t('message')}</h3></label>
			<textarea name="message" id="message"
				placeholder={t('messagePlaceholder')}
				className={'textArea '+(errors.message ? 'fieldError':'')} rows={5}
				disabled={submitting} aria-required
				ref={register({ required: t('required')})} />
			{ errors.message && <span className="error">{errors.message.message}</span>}

			<Button className="marged" variant="primary" disabled={submitting || !isEmpty(errors)}>
				{
					!submitting ? t('send')
						: <Spinner/>
				}
			</Button>
			<div style={{display: 'flex', flexDirection: 'row-reverse'}} className="fullWidth">
				<span className="info">{t('allRequired')}</span>
			</div>
		</form>
	)
}
