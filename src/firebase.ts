import * as admin from 'firebase-admin'
import fbAccountCreds from '../service-account.json'

const serviceAccount = fbAccountCreds as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default admin
