// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Elections {
    address public admin;
    uint public electionCount;

    struct Election {
        uint electionId;
        string name;
        string description;
        uint startTime;
        uint endTime;
        bool isLive;
        address[] candidates;
    }

    // Moved mappings outside the struct
    mapping(uint => Election) public elections;
    mapping(uint => mapping(address => bool)) public voters;  // electionId => voter => hasVoted
    mapping(uint => mapping(address => uint)) public votes;   // electionId => candidate => voteCount
    mapping(uint => bool) private electionResultsCalculated;

    // Events remain the same
    event ElectionCreated(uint electionId, string name);
    event CandidateAdded(uint electionId, address candidate);
    event ElectionStarted(uint electionId);
    event ElectionEnded(uint electionId);
    event Voted(uint electionId, address voter, address candidate);
    event ElectionResult(uint electionId, address winner, uint votes);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier electionExists(uint electionId) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist");
        _;
    }

    constructor() {
        admin = msg.sender;
        electionCount = 0;  // Explicitly initialize electionCount
    }
    
    function createElection(string memory name, string memory description, uint startTime, uint endTime) public onlyAdmin {
        require(startTime < endTime, "Invalid start and end times");
        require(startTime > block.timestamp, "Start time must be in the future");

        electionCount++;
        
        // Create new election without nested mappings
        elections[electionCount] = Election({
            electionId: electionCount,
            name: name,
            description: description,
            startTime: startTime,
            endTime: endTime,
            isLive: false,
            candidates: new address[](0)
        });

        emit ElectionCreated(electionCount, name);
    }

    function addCandidate(uint electionId, address candidate) public onlyAdmin electionExists(electionId) {
        require(candidate != address(0), "Invalid candidate address");
        elections[electionId].candidates.push(candidate);
        emit CandidateAdded(electionId, candidate);
    }

    function startElection(uint electionId) public onlyAdmin electionExists(electionId) {
        require(block.timestamp >= elections[electionId].startTime, "Election has not started yet");
        require(!elections[electionId].isLive, "Election is already live");
        elections[electionId].isLive = true;
        emit ElectionStarted(electionId);
    }

    function endElection(uint electionId) public onlyAdmin electionExists(electionId) {
        require(block.timestamp >= elections[electionId].endTime, "Election is still ongoing");
        require(elections[electionId].isLive, "Election is not live");
        elections[electionId].isLive = false;
        emit ElectionEnded(electionId);
    }

    function vote(uint electionId, address candidate) public electionExists(electionId) {
        require(elections[electionId].isLive, "Election is not live");
        require(!voters[electionId][msg.sender], "You have already voted");
        
        bool isValidCandidate = false;
        for (uint i = 0; i < elections[electionId].candidates.length; i++) {
            if (elections[electionId].candidates[i] == candidate) {
                isValidCandidate = true;
                break;
            }
        }
        require(isValidCandidate, "Invalid candidate");

        voters[electionId][msg.sender] = true;
        votes[electionId][candidate]++;

        emit Voted(electionId, msg.sender, candidate);
    }

    function calculateResult(uint electionId) public onlyAdmin electionExists(electionId) {
        require(!elections[electionId].isLive, "Election is still live");
        require(!electionResultsCalculated[electionId], "Results already calculated");

        address winner = address(0);
        uint highestVotes = 0;

        for (uint i = 0; i < elections[electionId].candidates.length; i++) {
            address candidate = elections[electionId].candidates[i];
            uint candidateVotes = votes[electionId][candidate];
            if (candidateVotes > highestVotes) {
                highestVotes = candidateVotes;
                winner = candidate;
            }
        }

        require(winner != address(0), "No votes cast");
        electionResultsCalculated[electionId] = true;
        emit ElectionResult(electionId, winner, highestVotes);
    }
}