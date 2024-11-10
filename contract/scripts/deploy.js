// Import ethers from hardhat
const { ethers } = require("hardhat");

async function main() {
    // Get the deployer's address (first signer)
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    // Get the contract factory for the contract you want to deploy
    const MyContract = await ethers.getContractFactory("Elections");

    // Deploy the contract with constructor parameters
    const myContract = await MyContract.deploy("Hello, World!");

    // Log the contract's deployed address
    console.log("Contract deployed to address:", myContract.address);
}

// Run the deployment script
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
