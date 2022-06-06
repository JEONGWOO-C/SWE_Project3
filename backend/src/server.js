import express from 'express';
import { init } from './config/db.js';
import login from './api/User/login.js';

const connection = init();

const app = express();

app.use(
  express.json({
    limit: '1000mb',
  }),
);

const router = express.Router();

app.set('port', process.env.PORT || 4000);

login(app, connection);

app.listen(app.get('port'), () => {
  console.log('Port : ' + app.get('port'));
});
