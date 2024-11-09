import { Wallet } from 'ethers';

export class EVMGenerator {
    static generate() {
        const wallet = Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        };
    }
} 