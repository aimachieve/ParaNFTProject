export const SUCCESS = 'success';
export const INFO = 'info';
export const ERROR = 'error';
export const WARNING = 'warning';

//  Mumbai
// export const CHAIN_ID = '0x4';
// export const CHAIN_NAME = 'Rinkeby Test Network';
export const CHAIN_ID = '0x1';
export const CHAIN_NAME = 'Ethereum Main Net';
// export const RPC_URLS = ['https://rinkeby.infura.io/v3/'];
// export const BLOCK_EXPLORER_URLS = ['https://rinkeby.etherscan.io'];
export const RPC_URLS = ['https://mainnet.infura.io/v3/'];
export const BLOCK_EXPLORER_URLS = ['https://etherscan.io'];
export const NATIVE_CURRENCY_NAME = 'ETH';
export const NATIVE_CURRENCY_SYMBOL = 'ETH';
export const DECIMALS = 18;

//  Polygon
// export const CHAIN_ID = '0x89'; 
// export const CHAIN_NAME = 'Polygon';
// export const RPC_URLS = ['https://polygon-rpc.com'];
// export const BLOCK_EXPLORER_URLS = ['https://polygonscan.com/'];
// export const NATIVE_CURRENCY_NAME = 'MATIC';
// export const NATIVE_CURRENCY_SYMBOL = 'MATIC';
// export const DECIMALS = 18;

export const SWITCH_ERROR_CODE = 4902;
export const TRUE = 'true';
export const CONTRACT_ADDRESS = '0xd913b503f39324541cd21bb19d966a6f73032f81'

export const NFT_PRICE_WH1 = "0.08";
export const NFT_PRICE_WH2 = "0.08";
export const NFT_PRICE_PUBLIC = "0.08";
/* eslint-disable no-underscore-dangle */
export const NETWORK_CHAIN_IDS = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42,
    localhost: 1337,
  };
  
  export const INFURA_ID = '9aa3d95b3bc440fa88ea12eaa4456161';
  
  
  export const INFURA_ENDPOINT = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
export const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"TOTAL_MINT_AMOUNT","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerNft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"privateMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseTokenURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_mintType","type":"string"}],"name":"setMintType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pricePerNft","type":"uint256"}],"name":"setPricePerNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_whitelistMerkleRoot","type":"bytes32"}],"name":"setWhitelistMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelistMerkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ownerWallet","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];