export default function sendContactMail(req, res){
	const { email, name,  message } = req.body

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
	// TODO replace with another email +
	const mailjet = require ('node-mailjet')
		.connect(process.env.SMTP_USER, process.env.SMTP_PASSWORD)

	const request1 = mailjet
		.post('send', {'version': 'v3.1'})
		.request({
			'Messages': [
				{
					'From': {
						'Email': process.env.MY_PRO_ADDRESS,
					},
					'To': [
						{
							'Email': process.env.MY_PRO_ADDRESS,
						}
					],
					'Subject': '[CONTACT] '+ name,
					'TextPart': email+'\n'+message,
				}
			]
		})
	const request2 = mailjet
		.post('send', {'version': 'v3.1'})
		.request({
			'Messages': [
				{
					'From': {
						'Email': process.env.MY_PRO_ADDRESS,
					},
					'To': [
						{
							'Email': email,
						}
					],
					'Subject': '[AUTOMATIC] Henri Le Page',
					'TextPart': 'Bonjour,\n\nJe vous remercie pour votre message !\nJ\'y répondrai dès que possible.\n\nBien cordialement,\n\nHenri Le Page\n\n________________________________________\n\nHello,\n\nThank you for your message!\nI will answer as soon as possible.\n\nSincerely yours,\n\nHenri Le Page',
				}
			]
		})
	request1
		.then((result) => {
			console.log('===== SENT TO ME')
			console.log(result.body)
			request2
				.then((result2) => {
					console.log('===== SENT TO USER')
					console.log(result2.body)
					res.send('success')
				})
				.catch((err) => {
					console.log(err.statusCode, err)
					res.status(500).send(err)
				})
		})
		.catch((err) => {
			console.log(err.statusCode, err)
			res.status(500).send(err)
		})
}