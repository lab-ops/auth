import fastifyPlugin from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

const noFaviconHandler = (req: FastifyRequest, reply: FastifyReply) => {
  reply.code(404).send()
}

const noFaviconPluginFunction = (
  fastify: FastifyInstance,
  option: any,
  next: any
) => {
  fastify.get('/favicon.ico', noFaviconHandler)
  next()
}

const noFaviconPlugin = fastifyPlugin(noFaviconPluginFunction, {
  fastify: '^4.0',
  name: 'fastify-no-icon',
})
export default noFaviconPlugin
