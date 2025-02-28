import { Bytes } from "@graphprotocol/graph-ts";

export function bytes32ToString(bytes: Bytes): string {
  let str = "";
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] == 0) break; // Stop at first null byte
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}
