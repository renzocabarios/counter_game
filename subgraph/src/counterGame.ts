import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  IncrementCount as IncrementCountEvent,
  CreateRound as CreateRoundEvent,
} from "../generated/CounterGame/CounterGame";
import { Round } from "../generated/schema";

export function handleIncrementCount(event: IncrementCountEvent): void {
  let round = Round.load(event.params.round.toString());

  if (round) {
    round.currentCount = round.currentCount.plus(BigInt.fromString("1"));
    round.save();
  }
}
export function handleCreateRound(event: CreateRoundEvent): void {
  let round = new Round(event.params.round.toString());

  round.countLimit = event.params.countLimit;
  round.currentCount = BigInt.fromString("0");
  round.roundNumber = event.params.round;
  round.save();
}
