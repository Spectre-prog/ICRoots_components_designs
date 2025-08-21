"use client"

import type React from "react"
import { useState } from "react"
import {
  Bitcoin,
  Wallet,
  FileText,
  History,
  Award,
  LogOut,
  Menu,
  X,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react"
import TrustNFTDisplay from "./trust-nft-display"
import BTCWallet from "./BTCWallet"
import LoanApplication from "./LoanApplication"
import LoanHistory from "./LoanHistory"
import { useICRoots } from "../hooks/useICRoots"

interface BorrowerDashboardProps {
  onLogout: () => void
}

const BorrowerDashboard: React.FC<BorrowerDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, wallet, trustProfile, loans, loading, refreshWallet, submitLoanApplication, refreshTrustProfile } =
    useICRoots()

  const activeLoan = loans.find((loan) => loan.status === "active")
  const aiScore = trustProfile?.score || 85

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "wallet", label: "BTC Wallet", icon: Wallet },
    { id: "apply", label: "Apply for Loan", icon: FileText },
    { id: "history", label: "Loan History", icon: History },
    { id: "trust", label: "Trust NFT", icon: Award },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "wallet":
        return (
          <BTCWallet
            balance={wallet?.balance || 0}
            usdValue={wallet?.usdValue || 0}
            address={wallet?.address || ""}
            onRefresh={refreshWallet}
          />
        )
      case "apply":
        return <LoanApplication aiScore={aiScore} onSubmit={submitLoanApplication} loading={loading} />
      case "history":
        return <LoanHistory loans={loans} />
      case "trust":
        return (
          <TrustNFTDisplay
            tier={trustProfile?.tier || "sprout"}
            profile={trustProfile}
            onRefresh={refreshTrustProfile}
          />
        )
      default:
        return (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900/40 via-green-800/30 to-green-950/40 p-8 backdrop-blur-xl border border-green-500/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-yellow-400/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold text-white tracking-wide animate-fade-in">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-green-100/80 text-lg">Ready to unlock your Bitcoin's potential?</p>
                </div>
                <div className="animate-bounce-slow">
                  <TrustNFTDisplay tier={trustProfile?.tier || "sprout"} compact />
                </div>
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-8 w-1 h-1 bg-yellow-400/40 rounded-full animate-ping"></div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <MetricCard
                icon={<Bitcoin className="h-10 w-10 text-yellow-400 animate-pulse" />}
                title="BTC Balance"
                value={`${wallet?.balance.toFixed(4) || "0.0000"} BTC`}
                subtitle={`$${wallet?.usdValue.toLocaleString() || "0"}`}
                trend="+2.5%"
                color="yellow"
              />
              <MetricCard
                icon={<TrendingUp className="h-10 w-10 text-green-400 animate-bounce-slow" />}
                title="AI Credit Score"
                value={aiScore.toString()}
                subtitle="Excellent standing"
                trend="+5 pts"
                color="green"
              />
              <MetricCard
                icon={<CheckCircle className="h-10 w-10 text-blue-400 animate-pulse" />}
                title="Trust Tier"
                value={
                  (trustProfile?.tier || "sprout").charAt(0).toUpperCase() + (trustProfile?.tier || "sprout").slice(1)
                }
                subtitle="Growing steadily"
                trend="Level up soon"
                color="blue"
              />
            </div>

            {activeLoan && (
              <div className="relative overflow-hidden rounded-3xl bg-green-950/30 backdrop-blur-xl border border-green-500/20 p-8 shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent"></div>
                <div className="relative">
                  <h3 className="mb-6 flex items-center text-xl font-bold text-white">
                    <Clock className="mr-3 h-6 w-6 text-green-400 animate-spin-slow" />
                    Active Loan
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-green-200/70 text-sm font-medium uppercase tracking-wide">Loan Amount</p>
                      <p className="text-white text-3xl font-bold animate-fade-in">
                        ${activeLoan.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-green-200/70 text-sm font-medium uppercase tracking-wide">Next Payment</p>
                      <p className="text-white text-lg font-semibold">
                        {activeLoan.nextPaymentDate ? new Date(activeLoan.nextPaymentDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-green-200/70 text-sm font-medium uppercase tracking-wide">Remaining</p>
                      <p className="text-white text-lg font-semibold">{activeLoan.remainingPayments} payments</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-3 rounded-full bg-green-950/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-300 animate-shimmer"
                        style={{
                          width: `${((activeLoan.term - activeLoan.remainingPayments) / activeLoan.term) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-green-200/70 text-sm">
                      {Math.round(((activeLoan.term - activeLoan.remainingPayments) / activeLoan.term) * 100)}% repaid
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="relative overflow-hidden rounded-3xl bg-green-950/30 backdrop-blur-xl border border-green-500/20 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent"></div>
              <div className="relative">
                <h3 className="mb-6 text-xl font-bold text-white">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <button
                    onClick={() => setActiveTab("apply")}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600/40 to-green-700/40 p-6 backdrop-blur-sm border border-green-400/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <FileText className="mr-4 h-8 w-8 text-green-300 group-hover:animate-bounce" />
                      <div className="text-left">
                        <p className="font-bold text-white text-lg uppercase tracking-wide">Apply for New Loan</p>
                        <p className="text-green-200/80 text-sm">Get instant pre-approval</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("wallet")}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-600/40 to-yellow-700/40 p-6 backdrop-blur-sm border border-yellow-400/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <Wallet className="mr-4 h-8 w-8 text-yellow-300 group-hover:animate-bounce" />
                      <div className="text-left">
                        <p className="font-bold text-white text-lg uppercase tracking-wide">Manage BTC Wallet</p>
                        <p className="text-yellow-200/80 text-sm">View balance & deposit</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-400/10 rounded-full animate-ping"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="flex min-h-screen relative z-10">
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-green-950/20 backdrop-blur-xl border-r border-green-500/20 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-500 ease-in-out lg:static lg:inset-0 lg:translate-x-0`}
        >
          <div className="flex items-center justify-between border-b border-green-500/20 p-8">
            <div className="flex items-center space-x-3">
              <img
                src="/ICRoots logo, no background.png"
                alt="ICRoots Logo"
                className="h-10 w-10 animate-bounce-slow"
              />
              <span className="text-white text-2xl font-bold tracking-wide">ICRoots</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6 text-green-200 hover:text-white transition-colors" />
            </button>
          </div>

          <nav className="mt-8 px-6 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`group w-full flex items-center rounded-2xl px-6 py-4 transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-green-600/40 to-green-700/40 text-white shadow-lg shadow-green-500/20 border border-green-400/30"
                    : "text-green-200 hover:bg-green-800/30 hover:text-white"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon
                  className={`mr-4 h-6 w-6 transition-all duration-300 ${
                    activeTab === item.id ? "animate-pulse" : "group-hover:scale-110"
                  }`}
                />
                <span className="font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
            <button
              onClick={onLogout}
              className="group w-full flex items-center rounded-2xl px-6 py-4 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 border border-red-500/20"
            >
              <LogOut className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="flex items-center justify-between bg-green-950/20 backdrop-blur-xl border-b border-green-500/20 p-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-3 hover:bg-green-800/30 transition-colors"
            >
              <Menu className="h-6 w-6 text-green-200" />
            </button>
            <h1 className="text-white text-lg font-bold uppercase tracking-wide">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h1>
            <div className="w-12"></div>
          </div>

          {/* Content */}
          <div className="p-8">{renderContent()}</div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  )
}

const MetricCard: React.FC<{
  icon: React.ReactNode
  title: string
  value: string
  subtitle: string
  trend: string
  color: "yellow" | "green" | "blue"
}> = ({ icon, title, value, subtitle, trend, color }) => {
  const colorClasses = {
    yellow: "from-yellow-600/20 to-yellow-700/20 border-yellow-400/20 hover:shadow-yellow-500/20",
    green: "from-green-600/20 to-green-700/20 border-green-400/20 hover:shadow-green-500/20",
    blue: "from-blue-600/20 to-blue-700/20 border-blue-400/20 hover:shadow-blue-500/20",
  }

  const trendColors = {
    yellow: "text-yellow-400",
    green: "text-green-400",
    blue: "text-blue-400",
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl border p-8 shadow-2xl hover:scale-105 hover:shadow-2xl transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <span className={`text-sm font-bold ${trendColors[color]} animate-pulse`}>{trend}</span>
        </div>
        <h3 className="text-green-200/80 mb-2 text-sm font-bold uppercase tracking-wider">{title}</h3>
        <p className="text-white mb-2 text-3xl font-bold animate-fade-in">{value}</p>
        <p className="text-green-200/60 text-sm">{subtitle}</p>
      </div>
    </div>
  )
}

export default BorrowerDashboard
