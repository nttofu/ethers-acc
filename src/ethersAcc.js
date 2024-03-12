// Import ethers.js library
const { ethers } = require("ethers");

// Create a class for the Wallet
class CustomWallet {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(); // You can replace this with your preferred provider
        this.account = null; // Will hold the wallet instance
    }

    connect(url, network, options) {
        this.provider = new ethers.JsonRpcProvider(url, network, options);
    }

    // Create a new wallet from a private key
    create() {
        try {
            const privateKey = ethers.hexlify(ethers.randomBytes(32)); // Generate a random private key
            this.account = new ethers.Wallet(privateKey, this.provider);
            console.log("Wallet created successfully!");
        } catch (error) {
            console.error("Error creating wallet:", error);
        }
    }

    // Import an existing wallet from a private key
    import(privateKey) {
        try {
            if (!privateKey || !ethers.isHexString(privateKey, 32)) {
                throw new Error("Invalid private key format");
            }
            this.account = new ethers.Wallet(privateKey, this.provider);
            console.log("Wallet imported successfully!");
        } catch (error) {
            console.error("Error importing wallet:", error);
        }
    }

    // Get the wallet address
    getAddress() {
        if (this.account) {
            return this.account.address;
        } else {
            console.error("Wallet not initialized!");
            return null;
        }
    }

    // Get the balance of the wallet
    async getBalance() {
        if (this.account) {
            try {
                const balance = await this.provider.getBalance(this.account.address);
                return ethers.formatEther(balance);
            } catch (error) {
                console.error("Error getting wallet balance:", error);
                return null;
            }
        } else {
            console.error("Wallet not initialized!");
            return null;
        }
    }

    async transfer(receiver, amount) {
        if (this.account) {
            try {
                const tx = await this.account.sendTransaction({
                    to: receiver,
                    value: ethers.parseUnits(amount, 'ether'),
                });
                return tx;
            } catch (error) {
                console.error("todo:", error);
                return null;
            }
        } else {
            console.error("Wallet not initialized!");
            return null;
        }
    }
}

module.exports = CustomWallet;
