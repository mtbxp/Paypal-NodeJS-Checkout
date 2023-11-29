import dotenv  from "dotenv"
dotenv.config()

export const CLIENT_ID = process.env.CLIENT_ID || 'AfjRE2q_p_yFjhfoCcLWg3CQPmP8ZK_oN1Cnq4XGg62iVkS5RC-QILvU3QZN5hSWjWV-Q98dKXmZWkgY'
export const CLIENT_SECRET = process.env.CLIENT_SECRET || 'EAx8l0JIUnBvI_g0FpL7-fH7zGrCVO4rMrud99CdGKE2iDlpqnANKYpsiVtlzemYiOLQ1P34tHX6klmv'
export const PAYPAL_API = process.env.PAYPAL_API || 'https://api-m.sandbox.paypal.com'
export const PORT = process.env.PORT || 4000
export const HOST = process.env.NODE_ENV === "production" ? process.env.HOST : "http://localhost:" + PORT;
