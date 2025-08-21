"use client"

import type React from "react"
import { useState } from "react"
import { History, Eye, Download, Filter, Calendar, DollarSign } from "lucide-react"

const LoanHistory: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Mock loan data
  const loans = [
    {
      id: "LN001",
      amount: 25000,
      currency: "USD",
      status: "repaid",
      date: "2024-12-15",
      collateral: 0.6,
      interestRate: 8.5,
      term: 12,
      nextPayment: null,
      progress: 100,
    },
    {
      id: "LN002",
      amount: 18000,
      currency: "USDT",
      status: "active",
      date: "2025-01-10",
      collateral: 0.45,
      interestRate: 7.2,
      term: 18,
      nextPayment: "2025-02-15",
      progress: 15,
    },
    {
      id: "LN003",
      amount: 15000,
      currency: "USD",
      status: "pending",
      date: "2025-01-28",
      collateral: 0.38,
      interestRate: 9.1,
      term: 12,
      nextPayment: null,
      progress: 0,
    },
    {
      id: "LN004",
      amount: 30000,
      currency: "USD",
      status: "rejected",
      date: "2024-11-20",
      collateral: 0.72,
      interestRate: null,
      term: null,
      nextPayment: null,
      progress: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "repaid":
        return "bg-green-500/20 text-green-300 border border-green-500/30"
      case "active":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-300 border border-red-500/30"
      case "defaulted":
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
    }
  }

  const filteredLoans = loans.filter((loan) => filterStatus === "all" || loan.status === filterStatus)

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "amount":
        return b.amount - a.amount
      case "status":
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-600/10 rounded-full blur-2xl animate-bounce-slow"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-500/30">
              <History className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Loan History
            </h2>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-xl p-2 border border-green-500/20">
              <Filter className="h-5 w-5 text-green-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-white border-none focus:ring-0 focus:outline-none"
              >
                <option value="all" className="bg-gray-900">
                  All Status
                </option>
                <option value="active" className="bg-gray-900">
                  Active
                </option>
                <option value="repaid" className="bg-gray-900">
                  Repaid
                </option>
                <option value="pending" className="bg-gray-900">
                  Pending
                </option>
                <option value="rejected" className="bg-gray-900">
                  Rejected
                </option>
              </select>
            </div>

            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-xl p-2 border border-green-500/20">
              <Calendar className="h-5 w-5 text-green-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white border-none focus:ring-0 focus:outline-none"
              >
                <option value="date" className="bg-gray-900">
                  Sort by Date
                </option>
                <option value="amount" className="bg-gray-900">
                  Sort by Amount
                </option>
                <option value="status" className="bg-gray-900">
                  Sort by Status
                </option>
              </select>
            </div>

            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600/80 to-green-500/80 backdrop-blur-md px-6 py-3 rounded-xl text-white transition-all duration-300 hover:from-green-500/90 hover:to-green-400/90 hover:scale-105 border border-green-400/30 shadow-lg hover:shadow-green-500/25">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <SummaryCard
            title="Total Loans"
            value={loans.length.toString()}
            icon={<History className="h-6 w-6 text-green-400" />}
            gradient="from-green-600/20 to-green-500/10"
          />
          <SummaryCard
            title="Total Borrowed"
            value={`$${loans.reduce((sum, loan) => sum + loan.amount, 0).toLocaleString()}`}
            icon={<DollarSign className="h-6 w-6 text-yellow-400" />}
            gradient="from-yellow-600/20 to-yellow-500/10"
          />
          <SummaryCard
            title="Active Loans"
            value={loans.filter((loan) => loan.status === "active").length.toString()}
            icon={<Eye className="h-6 w-6 text-blue-400" />}
            gradient="from-blue-600/20 to-blue-500/10"
          />
          <SummaryCard
            title="Repaid Loans"
            value={loans.filter((loan) => loan.status === "repaid").length.toString()}
            icon={<Calendar className="h-6 w-6 text-purple-400" />}
            gradient="from-purple-600/20 to-purple-500/10"
          />
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-green-500/20 shadow-2xl overflow-hidden">
          {sortedLoans.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-900/30 backdrop-blur-sm border-b border-green-500/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Loan ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Next Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-green-300 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-500/10">
                  {sortedLoans.map((loan, index) => (
                    <tr
                      key={loan.id}
                      className="transition-all duration-300 hover:bg-green-500/5 hover:backdrop-blur-sm group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white group-hover:text-green-200 transition-colors">
                          {loan.id}
                        </div>
                        <div className="text-sm text-gray-400">Collateral: {loan.collateral} BTC</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white group-hover:text-green-200 transition-colors">
                          ${loan.amount.toLocaleString()} {loan.currency}
                        </div>
                        {loan.interestRate && <div className="text-sm text-gray-400">{loan.interestRate}% APR</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${getStatusColor(loan.status)}`}
                        >
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-white group-hover:text-green-200 transition-colors">
                        {new Date(loan.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {loan.status === "active" || loan.status === "repaid" ? (
                          <div className="w-24">
                            <div className="h-2 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/30">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${loan.status === "repaid" ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-blue-500 to-blue-400"}`}
                                style={{ width: `${loan.progress}%` }}
                              ></div>
                            </div>
                            <div className="mt-1 text-xs text-gray-400">{loan.progress}%</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-white group-hover:text-green-200 transition-colors">
                        {loan.nextPayment ? new Date(loan.nextPayment).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <button className="p-2 rounded-lg bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 hover:bg-green-500/30 hover:scale-110 transition-all duration-300">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="p-4 rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20 w-fit mx-auto mb-6">
                <History className="h-16 w-16 text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">No loans found</h3>
              <p className="text-gray-400">
                {filterStatus === "all"
                  ? "You haven't applied for any loans yet"
                  : `No loans with status "${filterStatus}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SummaryCard: React.FC<{
  title: string
  value: string
  icon: React.ReactNode
  gradient?: string
}> = ({ title, value, icon, gradient = "from-green-600/20 to-green-500/10" }) => (
  <div
    className={`bg-gradient-to-br ${gradient} backdrop-blur-md rounded-2xl p-6 border border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 group`}
  >
    <div className="mb-4 flex items-center justify-between">
      <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-green-500/20 group-hover:border-green-400/40 transition-colors">
        {icon}
      </div>
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">{value}</p>
  </div>
)

export default LoanHistory
