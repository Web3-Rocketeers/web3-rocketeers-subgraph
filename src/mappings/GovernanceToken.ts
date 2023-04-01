import { BigInt, store } from "@graphprotocol/graph-ts";

import { TransferSingle } from "../../generated/GovernanceToken/Web3Rocketeers";
import { TokenHolder } from "../../generated/schema";

// Update GOVERNANCE_TOKEN_ID to match the ID of your governance token
const GOVERNANCE_TOKEN_ID = "256";

export function handleTransferSingle(event: TransferSingle): void {
  let tokenId = event.params.id.toHex();

  // Only track transfers for the governance token
  if (tokenId === GOVERNANCE_TOKEN_ID) {
    let from = event.params.from.toHex();
    let to = event.params.to.toHex();
    let value = event.params.value;

    // Update the balance for the 'from' TokenHolder
    let fromTokenHolder = TokenHolder.load(from);
    if (fromTokenHolder == null) {
      fromTokenHolder = new TokenHolder(from);
      fromTokenHolder.balance = BigInt.fromI32(0);
    }
    fromTokenHolder.balance = fromTokenHolder.balance.minus(value);
    fromTokenHolder.save();

    // Update the balance for the 'to' TokenHolder
    let toTokenHolder = TokenHolder.load(to);
    if (toTokenHolder == null) {
      toTokenHolder = new TokenHolder(to);
      toTokenHolder.balance = BigInt.fromI32(0);
    }
    toTokenHolder.balance = toTokenHolder.balance.plus(value);
    toTokenHolder.save();
  }
}
