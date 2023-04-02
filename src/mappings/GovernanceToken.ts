import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { abi } from './Web3Rocketeers.json';

export class GovernanceToken {
  private contract: Contract;

  constructor(provider: Web3Provider, contractAddress: string) {
    this.contract = new Contract(contractAddress, abi, provider);
  }

  async getTotalSupply(): Promise<number> {
    // Implement this method based on the contract's functionality
    throw new Error('Not implemented');
  }

  async getBalanceOf(address: string): Promise<number> {
    // For ERC-1155, balanceOf method takes two arguments: account and id
    // Use the specific token ID you mentioned (256)
    const tokenId = 256;
    const balance = await this.contract.balanceOf(address, tokenId);
    return balance.toNumber();
  }

  onTransfer(listener: (from: string, to: string, value: number) => void): void {
    this.contract.on('TransferSingle', (operator, from, to, id, value) => {
      // For ERC-1155, check if the transferred token's id matches the governance token's id (256)
      if (id === 256) {
        listener(from, to, value.toNumber());
      }
    });
  }

  offTransfer(listener: () => void): void {
    this.contract.off('TransferSingle', listener);
  }
}
