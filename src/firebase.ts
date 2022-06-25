import * as admin from 'firebase-admin'
// import fbAccountCreds from '../service-account.json'
// const serviceAccount = fbAccountCreds as admin.ServiceAccount

require('dotenv').config()
const GOOGLE_CONFIG = process.env.GOOGLE_CONFIG

const buffer = Buffer.from(GOOGLE_CONFIG, 'base64') as any

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(buffer)),
})

export default admin
