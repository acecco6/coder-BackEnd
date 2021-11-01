import admin from 'firebase-admin';
const DATABASE_URL = "https://coder-backend-e4ce3.firebaseio.com";
const serviceAccount = {
	type: process.env.GOOGLE_APPLICATION_CREDENTIALS_type,
	project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_project_id,
	private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_private_key_id,
	private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_private_key,
	client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_client_email,
	client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_client_id,
	auth_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_auth_uri,
	token_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_token_uri,
	auth_provider_x509_cert_url:
		process.env.GOOGLE_APPLICATION_CREDENTIALS_auth_provider,
	client_x509_cert_url: process.env.GOOGLE_APPLICATION_CREDENTIALS_client,
};

export default function Firebase() {
	this.connection = admin;
	this.initialize = async () => {
		let firebase = await admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: DATABASE_URL,
		});
		return `Conexión exitosa a ${firebase.options.credential.projectId}`;
	};
	this.create = async (objectName, items) => {
		let url = await this.connection.database().ref(objectName).push(items);
		return await this.connection.database().ref(url).once('value');
	};
	this.find = async (objectName) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.once('value');
			
		return snapshot.val();
	};
	this.findById = async (objectName, id) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.orderByChild('id')
			.equalTo(id)
			.once('value');
		return snapshot.val();
	};

	this.update = async (objectName, id, items) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.set(items);
		return await this.connection
			.database()
			.ref(objectName + '/' + id)
			.once('value');
	};
	this.remove = async (objectName, id) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.remove();
		return 1;
	};
	this.validateId = () => {}; // optional
	this.validateDataType = () => {}; // optional
}
