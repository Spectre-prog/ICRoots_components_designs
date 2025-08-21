"use client"

import type React from "react"
import { useState } from "react"
import { Bitcoin, Copy, QrCode, RefreshCw, ExternalLink, AlertTriangle } from "lucide-react"

interface BTCWalletProps {
  balance: number
  usdValue: number
}

const BTCWallet: React.FC<BTCWalletProps> = ({ balance, usdValue }) => {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock wallet address
  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRefresh = () => {
    // Mock refresh functionality
    console.log("Refreshing wallet balance...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Pulsing Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/5 rounded-full animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-400/5 rounded-full animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Wallet Balance Card */}
        <div className="rounded-3xl bg-gradient-to-r from-yellow-600/90 via-orange-500/90 to-yellow-500/90 backdrop-blur-xl border border-white/10 p-8 text-white shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02] group">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Bitcoin className="h-10 w-10 animate-bounce-slow" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  BTC Wallet
                </h2>
                <p className="opacity-90 text-yellow-100">ICP-Generated Address</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="rounded-full bg-white/20 backdrop-blur-sm p-3 transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:rotate-180"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              <p className="mb-1 text-lg opacity-90">Bitcoin Balance</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                {balance} BTC
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              <p className="mb-1 text-lg opacity-90">USD Value</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                ${usdValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Warning for Empty Wallet */}
        {balance === 0 && (
          <div className="rounded-3xl bg-yellow-500/10 backdrop-blur-xl border border-yellow-400/20 p-6 hover:bg-yellow-500/20 transition-all duration-500 hover:scale-[1.01]">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-yellow-400/20 backdrop-blur-sm">
                <AlertTriangle className="mt-1 h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-yellow-200">Empty Wallet</h3>
                <p className="mb-4 text-yellow-300/90">
                  Your BTC wallet is empty. You need to deposit Bitcoin to use as collateral for loans.
                </p>
                <button className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-white font-medium transition-all duration-300 hover:from-yellow-400 hover:to-orange-400 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
                  Learn How to Deposit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Address */}
        <div className="rounded-3xl bg-green-900/20 backdrop-blur-xl border border-green-500/20 p-6 shadow-2xl hover:bg-green-900/30 transition-all duration-500 hover:scale-[1.01] group">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-green-100 group-hover:text-white transition-colors duration-300">
              Wallet Address
            </h3>
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-white transition-all duration-300 hover:from-green-500 hover:to-emerald-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <QrCode className="h-4 w-4" />
              <span>{showQR ? "Hide" : "Show"} QR</span>
            </button>
          </div>

          <div className="mb-4 rounded-2xl bg-green-950/30 backdrop-blur-sm border border-green-500/20 p-4 hover:bg-green-950/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <code className="text-sm break-all text-green-100 font-mono">{walletAddress}</code>
              <button
                onClick={handleCopyAddress}
                className="ml-4 rounded-lg p-2 bg-green-600/20 backdrop-blur-sm transition-all duration-300 hover:bg-green-600/40 hover:scale-110"
              >
                <Copy className="h-4 w-4 text-green-300" />
              </button>
            </div>
          </div>

          {copied && (
            <div className="mb-4 text-sm text-green-400 animate-fade-in bg-green-500/10 rounded-lg p-2 border border-green-500/20">
              ✓ Address copied to clipboard
            </div>
          )}

          {showQR && (
            <div className="mb-4 text-center animate-fade-in">
              <div className="inline-block rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-lg border border-green-500/20">
                <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100">
                  <p className="text-sm text-green-600 font-medium">QR Code</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-green-200/80">
            <p className="mb-2">
              This is your automatically generated ICP wallet address for Bitcoin deposits. Send Bitcoin to this address
              to use as collateral for loans.
            </p>
            <div className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300">
              <ExternalLink className="h-4 w-4" />
              <a href="#" className="hover:underline">
                View on blockchain explorer
              </a>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="rounded-3xl bg-green-900/20 backdrop-blur-xl border border-green-500/20 p-6 shadow-2xl hover:bg-green-900/30 transition-all duration-500 hover:scale-[1.01]">
          <h3 className="mb-4 text-xl font-semibold text-green-100">Recent Transactions</h3>

          {balance > 0 ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl bg-green-950/30 backdrop-blur-sm border border-green-500/10 p-4 hover:bg-green-950/50 hover:border-green-500/20 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 group-hover:from-green-400 group-hover:to-emerald-400 transition-all duration-300">
                      <Bitcoin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-100 group-hover:text-white transition-colors duration-300">
                        Received
                      </p>
                      <p className="text-sm text-green-300/80">Jan {15 + i}, 2025 at 3:42 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      +0.{15 + i * 5} BTC
                    </p>
                    <p className="text-sm text-green-300/80">${(8000 + i * 2000).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20 backdrop-blur-sm border border-green-500/20">
                <Bitcoin className="h-8 w-8 text-green-400 animate-pulse" />
              </div>
              <p className="text-green-200">No transactions yet</p>
              <p className="mt-1 text-sm text-green-300/60">
                Your transaction history will appear here once you make deposits
              </p>
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="rounded-3xl bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 p-6 hover:bg-blue-500/20 transition-all duration-500 hover:scale-[1.01]">
          <h3 className="mb-2 text-lg font-semibold text-blue-200">Security Information</h3>
          <div className="space-y-2 text-sm text-blue-300/90">
            <p>• This wallet is automatically generated and secured by the Internet Computer Protocol</p>
            <p>• Your private keys are managed securely by ICP smart contracts</p>
            <p>• Bitcoin deposits are locked as collateral and can be released upon loan repayment</p>
            <p>• All transactions are recorded on-chain for full transparency</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BTCWallet
