const {OAuth2Client} = require('google-auth-library');

export default {
    async fetchPayload(token: string) {
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        
        const client = new OAuth2Client(CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        return ticket.getPayload();
    }
}
