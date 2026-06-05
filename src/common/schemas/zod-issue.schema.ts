import z from 'zod'
import zCore from 'zod/v4/core'

export const zodIssueSchema: z.ZodType<zCore.$ZodIssueBase> = z.object({
  code: z.string().optional(),
  input: z.unknown().optional(),
  path: z.array(z.union([z.string(), z.number(), z.symbol()])),
  message: z.string(),
})
