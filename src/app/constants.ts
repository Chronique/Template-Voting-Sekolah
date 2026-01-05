// src/app/constants.ts
export const CONTRACT_ADDRESS = "0xBB9D42b6186f52Ea5167051f7D66B3D6C04932A8";
export const BUILDER_CODE_HEX = "62635f7667687139383365"; // Hex dari "bc_vghq983e"

export const CLASS_VOTE_ABI = 
[
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_paymasterAdmin",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_guru",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_kepsek",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "addAdmin",
    "type": "function",
    "inputs": [
      {
        "name": "_newAdmin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "addToWhitelist",
    "type": "function",
    "inputs": [
      {
        "name": "students",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "candidates",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "photoUrl",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "votes",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "createPoll",
    "type": "function",
    "inputs": [
      {
        "name": "names",
        "type": "string[]",
        "internalType": "string[]"
      },
      {
        "name": "photos",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "getCandidates",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "photoUrl",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "votes",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct ClassVoteSMP21.Candidate[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "hasVoted",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "isAdmin",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "isWhitelisted",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "pollCreated",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "resetPoll",
    "type": "function",
    "inputs": [
      {
        "name": "clearWhitelist",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "vote",
    "type": "function",
    "inputs": [
      {
        "name": "index",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const;