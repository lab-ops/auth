import Fastify, { FastifyInstance } from 'fastify'
import noFaviconPlugin from './plugins/favicon'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import supertokens from 'supertokens-node'
import {
  plugin as supertokensPlugin,
  errorHandler,
} from 'supertokens-node/framework/fastify'
import './supertokens'

const app: FastifyInstance = Fastify({
  logger: true,
})

app.setErrorHandler(errorHandler())

app.register(noFaviconPlugin)

app.register(fastifyFormbody)

app.register(fastifyCors, {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Cross-Origin-Resource-Policy',
    ...supertokens.getAllCORSHeaders(),
  ],
  credentials: true,
})

app.register(supertokensPlugin)

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
