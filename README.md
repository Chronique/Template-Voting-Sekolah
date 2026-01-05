# 🗳️ ClassVote & SMP21 On-Chain Voting


![Application Screenshot](./assets/Screenshot%202026-01-06%20000512.png)

A decentralized, transparent, and user-friendly voting ecosystem built on the Base network. This project is designed to digitize school elections (such as Class President or Student Council) using blockchain technology to ensure every vote is tamper-proof and verifiable.

🚀 Key Features
Gasless Transactions: Powered by Base Paymaster, allowing students to vote without holding any ETH. The school sponsors the gas fees for a seamless user experience.

Dynamic Poll Titles: Admins can update the election title (e.g., from "Class Election" to "Student Council Election") directly through the UI without redeploying the contract.

Multiple Admin Support: Securely manage multiple admin accounts (Teachers, Principals, or Committee members) registered directly on the blockchain.

Sessional Voting (Poll ID): Supports multiple election cycles using a unique pollID. This allows the same contract to be reused for different elections without losing the student whitelist.

Transparent & Immutable: All results are recorded permanently on the Base ledger, preventing any data manipulation.

Base Builder Integrated: Proudly contributing to the Base ecosystem with integrated Builder Codes on every transaction.

📜 Smart Contracts
This repository contains the following contracts:

contracts/ClassVote.sol: The initial version for basic on-chain voting.

contracts/SMP21Voting.sol: The advanced version optimized for school environments with multi-admin support, dynamic titles, and session management.

🛠️ Tech Stack
Smart Contracts: Solidity

Network: Base (Layer 2)

Blockchain Hooks: Wagmi & Viem

Frontend: React & Next.js

Animations: Framer Motion (for smooth, cinematic UI transitions)

Design System: Material Design 3 (M3)

⚙️ How It Works
Admin Dashboard
Setup Candidates: Add candidate names and photo URLs (Supports direct links from Google Drive).

Student Whitelisting: Register student wallet addresses to grant them voting rights. The whitelist persists across different election sessions.

Title Management: Change the election header dynamically via the Admin Settings tab.

Voting Process
Confirmation: A built-in confirmation prompt ensures voters are certain of their choice before submitting.

One Vote Per Session: Students can only vote once per pollID, mirroring real-world election integrity.

🏗️ Developer Info
This project is part of the Base Builder community.

Builder Code: bc_vghq983e

Built with ❤️ for the digital transformation of SMP Negeri 21 Jambi.

Verified on BaseScan: [0x91B76ee72F7739a429ab59Db2D43C104dA16E5b6] (https://basescan.org/address/0x91B76ee72F7739a429ab59Db2D43C104dA16E5b6#code)
