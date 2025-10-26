import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretManagerService {
    constructor() {}
    async getDatabaseSecrets(secretName: string) {
        const client = new SecretsManagerClient({ region: "us-east-1" }); 

        const command = new GetSecretValueCommand({ SecretId: secretName });
        const response = await client.send(command);

        if (!response.SecretString) {
            throw new Error("Secret vazio!");
        }

        return JSON.parse(response.SecretString);
    }
}
