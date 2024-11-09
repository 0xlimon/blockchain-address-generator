import chalk from 'chalk';
import inquirer from 'inquirer';

export class Menu {
    static printHeader() {
        const logo = `
   ___       _      _                       
  / _ \\     | |    (_)                      
 | | | |_  _| |     _ _ __ ___   ___  _ __ 
 | | | \\ \\/ / |    | | '_ ' _ \\ / _ \\| '_ \\
 | |_| |>  <| |____| | | | | | | (_) | | | |
  \\___//_/\\_\\______|_|_| |_| |_|\\___/|_| |_|
                                            
                                            
  https://github.com/0xlimon
******************************************************
`;
        console.log(chalk.cyan(logo));
    }

    static async showMainMenu() {
        const { walletCount } = await inquirer.prompt([
            {
                type: 'input',
                name: 'walletCount',
                message: 'How many wallets do you want to generate?',
                default: '1',
                validate: (input) => {
                    if (!/^\d+$/.test(input)) {
                        return 'Please enter only numbers';
                    }
                    const num = parseInt(input);
                    if (num < 1) {
                        return 'Please enter a number greater than 0';
                    }
                    return true;
                },
                filter: (input) => {
                    const filtered = input.replace(/[^\d]/g, '');
                    return filtered ? parseInt(filtered) : '';
                }
            }
        ]);

        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select blockchain network:',
                choices: [
                    { name: chalk.green('EVM (Ethereum, BSC, Polygon, etc.)'), value: 'evm' },
                    { name: chalk.yellow('Solana'), value: 'solana' },
                    { name: chalk.red('Exit'), value: 'exit' }
                ]
            }
        ]);
        
        return { choice, walletCount };
    }

    static async confirmContinue() {
        const { continue: shouldContinue } = await inquirer.prompt([
            {
                type: 'list',
                name: 'continue',
                message: 'Would you like to:',
                choices: [
                    { name: 'Generate more wallets', value: true },
                    { name: 'Exit', value: false }
                ]
            }
        ]);
        return shouldContinue;
    }

    static displayWalletInfo(network, walletData, index, total) {
        if (index === 0) {
            console.log(chalk.yellow('\nGenerated Wallets:'));
            console.log(chalk.yellow('=================='));
        }
        
        console.log(chalk.yellow(`\nWallet ${index + 1}/${total}:`));
        console.log(chalk.cyan('Network:'), network);
        console.log(chalk.cyan('Address:'), walletData.address);
        
        if (network === 'solana') {
            console.log(chalk.green('Import with Private Key in Phantom/Solflare:'));
            console.log(chalk.cyan('Private Key:'), walletData.privateKey);
        } else {
            console.log(chalk.cyan('Private Key:'), walletData.privateKey);
            console.log(chalk.cyan('Mnemonic:'), walletData.mnemonic);
        }
        console.log(chalk.yellow('------------------------------------------'));
    }

    static displaySummary(network, count, fileName) {
        console.log(chalk.green(`\n✅ Successfully generated ${count} wallets for ${network}!`));
        console.log(chalk.magenta('All wallets have been saved to:'), fileName);
        console.log(chalk.yellow(`Location: wallets/${network}/${fileName}\n`));
    }
} 