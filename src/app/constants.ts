export const CONTRACT_ADDRESS = "0x3C9b3A6A56204dC2149cCD93Cc5Fb01677b5B8a6";
export const BUILDER_CODE_HEX = "0x62635f7667687139383365"; // Pastikan ada 0x di depannya

export const CLASS_VOTE_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_admin1", "type": "address" },
      { "internalType": "address", "name": "_admin2", "type": "address" },
      { "internalType": "address", "name": "_admin3", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // --- FUNGSI WRITE (Harus ada di Paymaster CDP) ---
  {
    "inputs": [{ "internalType": "uint256", "name": "_candidateIndex", "type": "uint256" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string[]", "name": "_names", "type": "string[]" },
      { "internalType": "string[]", "name": "_photos", "type": "string[]" }
    ],
    "name": "createPoll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address[]", "name": "_voters", "type": "address[]" }],
    "name": "addToWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_newTitle", "type": "string" }],
    "name": "updateTitle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bool", "name": "_clearWhitelist", "type": "bool" }],
    "name": "resetPoll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // --- FUNGSI VIEW (Membaca Data) ---
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "photoUrl", "type": "string" },
          { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
        ],
        "internalType": "struct SMP21Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pollCreated",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pollId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pollTitle",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFullWhitelist",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "hasVotedInPoll",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "isAdmin",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;