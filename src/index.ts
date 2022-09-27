import express from 'express';
import path from 'path';
import http from 'http';

class App {
	private server: http.Server;
	private port: number;
	constructor(port: number) {
		this.port = port;

		const app = express();

		app.use(express.json());
		app.use(
			express.urlencoded({
				extended: true,
			})
		);
		app.use(express.static(path.join(__dirname, '../publish')));

		app.all('/*', (req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', '*');
			if (req.method === 'OPTIONS') {
				res.status(200).end();
			} else {
				next();
			}
		});

		this.server = new http.Server(app);

		app.get('/', (req, res) => {
			res.send('Welcome to zone kitti convertor server!');
		});

		app.get('/convertor/kitti', (req, res) => {
			// let cad = req.body.cad;
			// if (!cad) {
			// 	res.status(202).json({
			// 		message: 'no convertor!',
			// 	});
			// 	return;
			// }
			res.status(200).json({
				message: 'hello kitti convertor',
				url: 'tiles url',
			});
		});
	}

	public Start() {
		this.server.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}.`);
		});
	}
}

const port: number = 5001;
new App(port).Start();
