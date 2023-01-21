import supertokens from 'supertokens-node'
import Dashboard from 'supertokens-node/recipe/dashboard'
import Session from 'supertokens-node/recipe/session'
import ThirdPartyEmailPassword, {
  Discord,
  Github,
} from 'supertokens-node/recipe/thirdpartyemailpassword'
import jwt from 'supertokens-node/recipe/jwt'
import UserRoles from 'supertokens-node/recipe/userroles'
import EmailVerification from 'supertokens-node/recipe/emailverification'

const setEmailVerificationMode = () => {
  if (process.env.SUPERTOKENS_VERIFY_EMAIL?.toLowerCase() === 'true') {
    return 'REQUIRED'
  }
  return 'OPTIONAL'
}

supertokens.init({
  framework: 'fastify',
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI:
      process.env.SUPERTOKENS_CONNECTION_URI ?? 'http://localhost:3567',
    // apiKey: <API_KEY(if configured)>,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'Lab Ops',
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN ?? 'http://localhost:3000',
    websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN ?? 'http://localhost',
    apiBasePath: '/',
    websiteBasePath: '/login',
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        Github({
          clientId: process.env.SUPERTOKENS_GITHUB_CLIENT_ID ?? '',
          clientSecret: process.env.SUPERTOKENS_GITHUB_CLIENT_SECRET ?? '',
        }),
        Discord({
          clientId: process.env.SUPERTOKENS_DISCORD_CLIENT_ID ?? '',
          clientSecret: process.env.SUPERTOKENS_DISCORD_CLIENT_SECRET ?? '',
        }),
      ],
    }),
    Session.init(),
    jwt.init(),
    UserRoles.init(),
    Dashboard.init({
      apiKey: process.env.SUPERTOKENS_DASHBOARD_API_KEY ?? 'password',
    }),
    EmailVerification.init({
      mode: setEmailVerificationMode(),
    }),
  ],
})
