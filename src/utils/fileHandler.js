import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FileHandler {
    static async saveWallets(network, wallets) {
        const networkPath = path.join(process.cwd(), 'wallets', network);
        await fs.ensureDir(networkPath);
        
        let counter = 0;
        let fileName;
        
        do {
            fileName = counter === 0 ? 
                `${network}_wallets.json` : 
                `${network}_wallets_${counter}.json`;
            counter++;
        } while (await fs.pathExists(path.join(networkPath, fileName)));

        const dataToSave = {
            network,
            createdAt: new Date().toISOString(),
            numberOfWallets: wallets.length,
            wallets: wallets.map(wallet => ({
                index: wallet.index,
                address: wallet.address,
                privateKey: wallet.privateKey,
                ...(network !== 'solana' && wallet.mnemonic ? { mnemonic: wallet.mnemonic } : {})
            }))
        };

        await fs.writeJson(
            path.join(networkPath, fileName),
            dataToSave,
            { spaces: 2 }
        );
        
        return fileName;
    }
} 