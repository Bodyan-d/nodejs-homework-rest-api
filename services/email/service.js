const Mailgen = require('mailgen');

class EmailService {
	constructor(env, sender) {
		this.sender = sender;

		switch (env) {
			case 'development':
				this.link = 'https://677a-185-151-84-94.ngrok.io';
				break;
			case 'production':
				this.link = 'link for production';
				break;

			default:
				this.link = 'https://677a-185-151-84-94.ngrok.io';
				break;
		}
	}

	createTemplateEmail(verifyToken) {
		const mailGenerator = new Mailgen({
			theme: 'cerberus',
			product: {
				name: 'TheOdd1sOut',
				link: this.link,
			},
		});

		const email = {
			body: {
				intro:
					"Welcome to TheOdd1sOut! We're very excited to have you on board.",
				action: {
					instructions: 'To get started with TheOdd1sOut, please click here:',
					button: {
						color: '#22BC66',
						text: 'Confirm your account',
						link: `${this.link}/api/users/verify/${verifyToken}`,
					},
				},
			},
		};

		return mailGenerator.generate(email);
	}

	async sendVerifyEmail(email, verifyToken) {
		const emailHTML = this.createTemplateEmail(verifyToken);

		const msg = {
			to: email,
			subject: 'Verify your email',
			html: emailHTML,
		};
		try {
			const result = await this.sender.send(msg);
			return { result, status: 'success' };
		} catch (error) {
			return { error, status: 'error' };
		}
	}
}

module.exports = EmailService;
