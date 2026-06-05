export const NODE_ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const

export type NodeEnv = (typeof NODE_ENV)[keyof typeof NODE_ENV]
