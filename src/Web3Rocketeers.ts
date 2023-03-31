import { BigInt } from "@graphprotocol/graph-ts";
import { Web3Rocketeers, MemberRegistered, ProposalCreated } from "../generated/Web3Rocketeers/Web3Rocketeers";
import { Member, Proposal } from "../generated/schema";

export function handleMemberRegistered(event: MemberRegistered): void {
  let member = new Member(event.params.address.toHex());
  member.address = event.params.address;
  member.tokens = event.params.tokens;
  member.save();
}

export function handleProposalCreated(event: ProposalCreated): void {
  let proposal = new Proposal(event.params.proposalId.toString());
  let contract = Web3Rocketeers.bind(event.address);
  let proposalData = contract.proposals(event.params.proposalId);

  proposal.proposer = event.params.proposer.toHex();
  proposal.description = event.params.description;
  proposal.startTime = proposalData.value0;
  proposal.endTime = proposalData.value1;
  proposal.yesVotes = BigInt.fromI32(0);
  proposal.noVotes = BigInt.fromI32(0);
  proposal.status = "Active";
  proposal.save();
}