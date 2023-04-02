import { TransferSingle } from "../generated/Web3-Rocketeers/Web3Rocketeers";
import { Balance } from "../generated/schema";

export function handleTransferSingle(event: TransferSingle): void {
  let tokenId = event.params.id;
  let from = event.params.from;
  let to = event.params.to;
  let value = event.params.value;

  if (tokenId == 256) { // Check if the transferred token's ID matches the governance token's ID (256)
    let fromBalanceId = from.toHex() + "-" + tokenId.toString();
    let fromBalance = Balance.load(fromBalanceId);
    if (fromBalance == null) {
      fromBalance = new Balance(fromBalanceId);
      fromBalance.account = from;
      fromBalance.tokenId = tokenId; // Set the tokenId
      fromBalance.value = BigInt.fromI32(0);
    }
    fromBalance.value = fromBalance.value.minus(value);
    fromBalance.save();

    let toBalanceId = to.toHex() + "-" + tokenId.toString();
    let toBalance = Balance.load(toBalanceId);
    if (toBalance == null) {
      toBalance = new Balance(toBalanceId);
      toBalance.account = to;
      toBalance.tokenId = tokenId; // Set the tokenId
      toBalance.value = BigInt.fromI32(0);
    }
    toBalance.value = toBalance.value.plus(value);
    toBalance.save();
  }
}
