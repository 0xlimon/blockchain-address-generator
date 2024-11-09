import { EVMGenerator } from './generators/evm.js';
import { SolanaGenerator } from './generators/solana.js';
import { Menu } from './utils/menu.js';
import { FileHandler } from './utils/fileHandler.js';
import { NETWORKS } from './config/constants.js';
import chalk from 'chalk';

async function main() {
    console.clear();
    Menu.printHeader();

    while (true) {
        const { choice, walletCount } = await Menu.showMainMenu();
        
        if (choice === 'exit') {
            console.log(chalk.yellow('\n👋 Goodbye!'));
            process.exit(0);
        }

        const wallets = [];
        console.clear();
        
        for (let i = 0; i < walletCount; i++) {
            let walletData;
            switch (choice) {
                case NETWORKS.EVM:
                    walletData = EVMGenerator.generate();
                    break;
                case NETWORKS.SOLANA:
                    walletData = SolanaGenerator.generate();
                    break;
            }

            wallets.push({
                index: i + 1,
                ...walletData
            });

            Menu.displayWalletInfo(choice, walletData, i, walletCount);
        }

        const fileName = await FileHandler.saveWallets(choice, wallets);
        Menu.displaySummary(choice, walletCount, fileName);

        const shouldContinue = await Menu.confirmContinue();
        
        if (!shouldContinue) {
            console.log(chalk.yellow('\n👋 Goodbye!'));
            break;
        }
        console.clear();
    }
}

main().catch(console.error);