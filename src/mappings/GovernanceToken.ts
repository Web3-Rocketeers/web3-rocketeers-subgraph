import { Transfer } from "../generated/GovernanceToken/ERC20";
import { TokenHolder } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let from = event.params.from.toHex();
  let to = event.params.to.toHex();
  let value = event.params.value;

  let fromTokenHolder = TokenHolder.load(from);
  if (fromTokenHolder == null) {
    fromTokenHolder = new TokenHolder(from);
    fromTokenHolder.balance = BigInt.fromI32(0);
  }
  fromTokenHolder.balance = fromTokenHolder.balance.minus(value);
  fromTokenHolder.save();

  let toTokenHolder = TokenHolder.load(to);
  if (toTokenHolder == null) {
    toTokenHolder = new TokenHolder(to);
    toTokenHolder.balance = BigInt.fromI32(0);
  }
  toTokenHolder.balance = toTokenHolder.balance.plus(value);
  toTokenHolder.save();
}
