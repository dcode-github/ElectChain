// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Get the deployer's address (first signer)
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for the contract you want to deploy
    const Elections = await ethers.getContractFactory("Elections");

    // Deploy the contract with constructor arguments
    const elections = await Elections.deploy();
    
    // Wait for the contract to be deployed
    await elections.deployed();

    console.log("Contract deployed to:", elections.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
