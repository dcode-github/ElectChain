package controllers

import (
	"context"
	"encoding/json"
	"log"
	"math/big"
	"net/http"
	"os"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

const (
	contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Replace with the contract address from Hardhat
	infuraURL       = "http://127.0.0.1:8545"                      // URL for Hardhat's local network
)

// ElectionRequest structure for the incoming JSON body
type ElectionRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	StartTime   uint   `json:"startTime"`
	EndTime     uint   `json:"endTime"`
}

var client *ethclient.Client

// ABI for the Elections contract (simplified version, adjust it as per your contract ABI)
var votingSystemABI = `[{
    "constant": false,
    "inputs": [
        {
            "name": "name",
            "type": "string"
        },
        {
            "name": "description",
            "type": "string"
        },
        {
            "name": "startTime",
            "type": "uint256"
        },
        {
            "name": "endTime",
            "type": "uint256"
        }
    ],
    "name": "createElection",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]`

// Initialize Ethereum client
func init() {
	var err error
	client, err = ethclient.Dial(infuraURL)
	if err != nil {
		log.Fatal(err)
	}
}

// CreateElection handles the HTTP request to create a new election
func CreateElection(w http.ResponseWriter, r *http.Request) {
	// Parse the incoming JSON body
	var electionReq ElectionRequest
	err := json.NewDecoder(r.Body).Decode(&electionReq)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Connect to the contract
	address := common.HexToAddress(contractAddress)
	parsedABI, err := abi.JSON(strings.NewReader(votingSystemABI))
	if err != nil {
		http.Error(w, "Failed to parse ABI", http.StatusInternalServerError)
		return
	}

	// Prepare the transaction data for calling `createElection`
	data, err := parsedABI.Pack("createElection", electionReq.Name, electionReq.Description, electionReq.StartTime, electionReq.EndTime)
	if err != nil {
		http.Error(w, "Failed to pack transaction data", http.StatusInternalServerError)
		return
	}

	// Use the private key to sign the transaction (do NOT hardcode private keys in real applications!)
	privateKeyHex := os.Getenv("PRIVATE_KEY")
	privateKey, err := crypto.HexToECDSA(privateKeyHex)
	if err != nil {
		http.Error(w, "Failed to convert private key", http.StatusInternalServerError)
		return
	}

	// Prepare the account to send the transaction
	fromAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		http.Error(w, "Failed to get nonce", http.StatusInternalServerError)
		return
	}

	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		http.Error(w, "Failed to get gas price", http.StatusInternalServerError)
		return
	}

	gasLimit := uint64(300000) // Set the gas limit for the transaction

	// Create the transaction
	tx := types.NewTransaction(nonce, address, big.NewInt(0), gasLimit, gasPrice, data)

	// Sign the transaction
	chainID := big.NewInt(1337) // Hardhat's default chain ID is 1337, change if necessary
	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)
	if err != nil {
		http.Error(w, "Failed to sign transaction", http.StatusInternalServerError)
		return
	}

	// Send the transaction
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		http.Error(w, "Failed to send transaction", http.StatusInternalServerError)
		return
	}

	// Send a success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Election created successfully"))
}
