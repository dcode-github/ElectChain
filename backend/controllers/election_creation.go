package controllers

import (
	"context"
	"encoding/json"
	"fmt"
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
	contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
	infuraURL       = "http://127.0.0.1:8545"
)

type ElectionRequest struct {
	Name        string `json:"title"`
	Description string `json:"description"`
	StartTime   uint64 `json:"startDate"`
	EndTime     uint64 `json:"endDate"`
	ClientAdd   string `json:"clientAdd"`
}

var client *ethclient.Client

var votingSystemABI = `[{
    "constant": false,
    "inputs": [
        {
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "description",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
        }
    ],
    "name": "createElection",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}]`

func init() {
	var err error
	client, err = ethclient.Dial(infuraURL)
	if err != nil {
		log.Fatal("Failed to connect to the Ethereum client:", err)
	}
}

func CreateElection(w http.ResponseWriter, r *http.Request) {
	var electionReq ElectionRequest
	err := json.NewDecoder(r.Body).Decode(&electionReq)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	fmt.Printf("Received Election Data: %+v\n", electionReq)

	startTime := new(big.Int).SetUint64(electionReq.StartTime)
	endTime := new(big.Int).SetUint64(electionReq.EndTime)

	address := common.HexToAddress(contractAddress)
	parsedABI, err := abi.JSON(strings.NewReader(votingSystemABI))
	if err != nil {
		fmt.Println("Failed to parse ABI:", err)
		http.Error(w, "Failed to parse ABI", http.StatusInternalServerError)
		return
	}

	fmt.Println("Packing data for createElection:")
	fmt.Printf("Name: %s, Description: %s, StartTime: %d, EndTime: %d\n",
		electionReq.Name, electionReq.Description, electionReq.StartTime, electionReq.EndTime)

	data, err := parsedABI.Pack("createElection", electionReq.Name, electionReq.Description, startTime, endTime)
	if err != nil {
		fmt.Println("Failed to pack transaction data:", err)
		http.Error(w, fmt.Sprintf("Failed to pack transaction data: %v", err), http.StatusInternalServerError)
		return
	}

	privateKeyHex := os.Getenv("PRIVATE_KEY")
	privateKey, err := crypto.HexToECDSA(privateKeyHex)
	if err != nil {
		fmt.Println("Failed to convert private key", err)
		http.Error(w, "Failed to convert private key", http.StatusInternalServerError)
		return
	}

	fromAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		fmt.Println("Failed to get nonce", err)
		http.Error(w, "Failed to get nonce", http.StatusInternalServerError)
		return
	}

	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		fmt.Println("Failed to get gas price", err)
		http.Error(w, "Failed to get gas price", http.StatusInternalServerError)
		return
	}

	gasLimit := uint64(300000)

	tx := types.NewTransaction(nonce, address, big.NewInt(0), gasLimit, gasPrice, data)

	chainID := big.NewInt(1337)
	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)
	if err != nil {
		fmt.Println("Failed to sign transaction", err)
		http.Error(w, "Failed to sign transaction", http.StatusInternalServerError)
		return
	}

	fmt.Println(signedTx)

	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		fmt.Println("Failed to send transaction", err)
		http.Error(w, fmt.Sprintf("Failed to send transaction: %v", err), http.StatusInternalServerError)
		return
	}

	log.Printf("Transaction Hash: %s", signedTx.Hash().Hex())

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Election created successfully"))
}
