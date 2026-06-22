import { Injectable } from '@nestjs/common'
import { decodeJwt, importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose'

import { tokenPayloadSchema } from '@auth/schemas/token-payload.schema'
import { TokenPayload } from '@auth/types/token-payload.type'

import { ConfigService } from '@config/services/config.service'

const decodeB64ToPem = (b64String: string): string =>
  Buffer.from(b64String, 'base64').toString('utf-8')

const JWT_ALGORITHM = 'EdDSA'

@Injectable()
export class JwtService {
  private privateKey: CryptoKey
  private publicKey: CryptoKey

  constructor(private readonly configService: ConfigService) {
    void this.init()
  }

  private async init(): Promise<void> {
    const privateKeyPem = decodeB64ToPem(this.configService.authJwtPrivateKey)
    const publicKeyPem = decodeB64ToPem(this.configService.authJwtPublicKey)
    this.privateKey = await importPKCS8(privateKeyPem, JWT_ALGORITHM)
    this.publicKey = await importSPKI(publicKeyPem, JWT_ALGORITHM)
  }

  sign(sub: string, expirationTime: string): Promise<string> {
    const alg = JWT_ALGORITHM
    return new SignJWT()
      .setProtectedHeader({ alg })
      .setExpirationTime(expirationTime)
      .setSubject(sub)
      .sign(this.privateKey)
  }

  decode(token: string): TokenPayload {
    return tokenPayloadSchema.parse(decodeJwt(token))
  }

  async verifyAsync(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, this.publicKey)
    return tokenPayloadSchema.parse(payload)
  }
}
