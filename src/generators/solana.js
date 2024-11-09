import { Keypair } from '@solana/web3.js';

export class SolanaGenerator {
    static generate() {
        const keypair = Keypair.generate();
        
        return {
            address: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('hex')
        };
    }
} 