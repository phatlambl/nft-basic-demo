const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");
const ALCHEMY_KEY = "qhq5gWF4R_TXAK3AVkzUbdLl2VvWwRAm"
const ACCOUNT_PRIVATE_KEY = "0a785101988a0ffea68b165ca5fb3d898acb3cd37e7b1ed624f84b44a830f6e5"
const NFT_CONTRACT_ADDRESS = "0x971294aDd47630c5421E93A514Df834f7322eAF8"


// Helper method for fetching environment variables from .env
function getEnvVariable(key, defaultValue) {
	if (process.env[key]) {
		return process.env[key];
	}
	if (!defaultValue) {
		throw `${key} is not defined and no default value was provided`;
	}
	return defaultValue;
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider() {
	return ethers.getDefaultProvider(getEnvVariable("NETWORK", "rinkeby"), {
		alchemy: getEnvVariable("ALCHEMY_KEY"),
	});
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount() {
	return new ethers.Wallet(getEnvVariable("ACCOUNT_PRIVATE_KEY"), getProvider());
}

// Helper method for fetching a contract instance at a given address
function getContract(contractName, hre) {
	const account = getAccount();
	return getContractAt(hre, contractName, getEnvVariable("NFT_CONTRACT_ADDRESS"), account);
}

module.exports = {
	getEnvVariable,
	getProvider,
	getAccount,
	getContract,
}