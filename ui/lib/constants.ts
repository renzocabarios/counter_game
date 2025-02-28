import { Address } from "viem";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// export const REGISTRY_ADRESS : Address = "0x0Fe166d8E1f8BB1A22D0290B41f3052746775559"
export const REGISTRY_ADDRESS: Address =
  "0xE0DA1966d02d4827F6e2cF536f0565b9Cde39cDd";

export const GRAPH_ENDPOINT: string =
  "https://thegraph.test2.btcs.network/subgraphs/name/counter_game";

export const APOLLO_CLIENT = new ApolloClient({
  uri: GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});
