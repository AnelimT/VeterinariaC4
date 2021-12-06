const admin = require('firebase-admin');
admin.initializeApp();

import { Saludo } from "./src/http";
import { sendEmail } from "./src/email";
export { Saludo,sendEmail}
