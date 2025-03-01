import { Address } from "viem";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { FaXTwitter } from "react-icons/fa6";
import { LiaTelegramPlane } from "react-icons/lia";

// export const REGISTRY_ADRESS : Address = "0x0Fe166d8E1f8BB1A22D0290B41f3052746775559"
export const REGISTRY_ADDRESS: Address =
  "0xE0DA1966d02d4827F6e2cF536f0565b9Cde39cDd";

export const GRAPH_ENDPOINT: string =
  "https://thegraph.test2.btcs.network/subgraphs/name/counter_game";

export const APOLLO_CLIENT = new ApolloClient({
  uri: GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

export const socials = [
  {
    title: "X",
    url: "#",
    icon: FaXTwitter
  },
  {
    title: "Telegram",
    url: "#",
    icon: LiaTelegramPlane
  }
]

export const subSidebar = [
  {
    title: "Dailies",
    url: "#",
  },
  {
    title: "Referral",
    url: "#",
  }
];

export const availableGames = [
  {
    title: "Counter",
    url: "/games/counter",
  },
  {
    title: "Game 2",
    url: "#",
  },
  {
    title: "Game 3",
    url: "#",
  },
];

export const mockStats = [
  {
    time: Date.now(),
    user: '0xd3...d23d',
    guess: 4
  },
  {
    time: Date.now(),
    user: '0xdc...2efd',
    guess: 7
  },
  {
    time: Date.now(),
    user: '0xo3...2dd4',
    guess: 1
  }
]