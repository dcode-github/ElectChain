const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const Elections = await ethers.getContractFactory("Elections");
    const elections = await Elections.deploy();
    await elections.deployed();
    console.log("Contract deployed to:", elections.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
