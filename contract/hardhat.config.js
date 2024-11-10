/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
module.exports = {
  solidity: "0.8.28",
  networks: {
    mainnet: {
      // url:"https://mainnet.infura.io/v3/ff1caad846e94e90872bd7042ce85f37",
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
