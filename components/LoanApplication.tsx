"use client"

import type React from "react"
import { useState } from "react"
import { FileText, Upload, AlertCircle, CheckCircle, X, Brain, DollarSign, Clock } from "lucide-react"

interface LoanApplicationProps {
  aiScore: number
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ aiScore }) => {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD",
    purpose: "",
    idFile: null as File | null,
  })
  const [showAIResult, setShowAIResult] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, idFile: file })
    }
  }

  const calculateCollateral = () => {
    const amount = Number.parseFloat(formData.amount) || 0
    const btcPrice = 41667 // Mock BTC price
    const collateralRatio = 1.5 // 150% collateralization
    return (amount * collateralRatio) / btcPrice
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsSubmitting(false)
      setShowAIResult(true)
    }, 3000)
  }

  const aiResult = {
    approved: aiScore >= 80,
    score: aiScore,
    reasons:
      aiScore >= 80
        ? ["Strong credit history", "Sufficient collateral", "Low risk profile"]
        : ["Credit score needs improvement", "Higher risk assessment", "Additional verification required"],
  }

  if (showAIResult) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-black via-green-950 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-green-600/10 blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 h-32 w-32 rounded-full bg-green-400/10 blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-2xl p-6">
          <div
            className={`rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl border ${
              aiResult.approved
                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border-green-400/30"
                : "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white border-red-400/30"
            }`}
          >
            <div className="mb-6 flex justify-center">
              {aiResult.approved ? <CheckCircle className="h-20 w-20" /> : <X className="h-20 w-20" />}
            </div>

            <h2 className="mb-4 text-3xl font-bold">{aiResult.approved ? "Pre-Approved!" : "Not Approved"}</h2>

            <p className="mb-6 text-xl opacity-90">
              {aiResult.approved
                ? "Your loan application has been pre-approved by our AI system"
                : "Your application needs some improvements before approval"}
            </p>

            <div className="mb-6 rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
              <div className="mb-4 flex items-center justify-center space-x-2">
                <Brain className="h-6 w-6" />
                <span className="text-lg font-semibold">AI Credit Score</span>
              </div>
              <div className="text-4xl font-bold">{aiResult.score}/100</div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur-xl border border-white/10">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              {aiResult.approved ? "Approval Factors" : "Areas for Improvement"}
            </h3>
            <div className="space-y-3">
              {aiResult.reasons.map((reason, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${aiResult.approved ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {aiResult.approved && (
            <div className="mt-6 rounded-3xl border border-green-400/30 bg-green-500/10 p-6 backdrop-blur-xl">
              <h3 className="mb-4 text-lg font-semibold text-green-200">Next Steps</h3>
              <div className="space-y-3 text-green-300">
                <div className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                    1
                  </div>
                  <span>Your application will be reviewed by our lenders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                    2
                  </div>
                  <span>You'll receive funding offers within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                    3
                  </div>
                  <span>Choose your preferred lender and receive funds</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAIResult(false)}
              className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-emerald-700 shadow-lg backdrop-blur-sm"
            >
              Submit New Application
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-black via-green-950 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-green-600/10 blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center p-6">
          <div className="rounded-3xl bg-white/5 p-12 shadow-2xl backdrop-blur-xl border border-white/10">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-white">AI Processing Your Application</h2>
            <p className="mb-6 text-gray-300">
              Our AI is analyzing your profile and determining your creditworthiness...
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">Identity verification complete</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">Credit assessment in progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Risk evaluation pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-green-950 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-green-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 h-32 w-32 rounded-full bg-green-400/10 blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl p-6">
        <div className="rounded-3xl bg-white/5 p-8 shadow-2xl backdrop-blur-xl border border-white/10">
          <div className="mb-6 flex items-center space-x-3">
            <FileText className="h-8 w-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Apply for Loan</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Loan Amount</label>
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <DollarSign className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" size={18} />
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 pr-4 pl-10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400/50 focus:ring-2 focus:ring-green-500/30"
                    required
                  />
                </div>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-sm focus:ring-2 focus:ring-green-500/30"
                >
                  <option value="USD" className="bg-gray-800">
                    USD
                  </option>
                  <option value="USDT" className="bg-gray-800">
                    USDT
                  </option>
                </select>
              </div>
              {formData.amount && (
                <p className="mt-2 text-sm text-gray-400">
                  Required BTC collateral: ~{calculateCollateral().toFixed(4)} BTC
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Purpose of Loan</label>
              <textarea
                name="purpose"
                placeholder="Please describe what you'll use this loan for..."
                value={formData.purpose}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400/50 focus:ring-2 focus:ring-green-500/30"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Upload Valid ID</label>
              <div className="rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center backdrop-blur-sm">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  id="id-upload"
                  required
                />
                <label htmlFor="id-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-2 text-gray-300">
                    {formData.idFile ? formData.idFile.name : "Click to upload your ID"}
                  </p>
                  <p className="text-sm text-gray-500">National ID, Driver's License, or Passport (JPG, PNG, PDF)</p>
                </label>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 backdrop-blur-sm border border-green-400/20">
              <div className="mb-4 flex items-center space-x-3">
                <Brain className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">AI Pre-Assessment</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-gray-400">Current AI Score</p>
                  <p className="text-2xl font-bold text-white">{aiScore}/100</p>
                </div>
                <div
                  className={`rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${
                    aiScore >= 80
                      ? "bg-green-500/20 text-green-300 border border-green-400/30"
                      : aiScore >= 60
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                        : "bg-red-500/20 text-red-300 border border-red-400/30"
                  }`}
                >
                  {aiScore >= 80 ? "Excellent" : aiScore >= 60 ? "Good" : "Needs Improvement"}
                </div>
              </div>
            </div>

            {aiScore < 60 && (
              <div className="rounded-2xl border border-yellow-400/30 bg-yellow-500/10 p-4 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-yellow-300">
                      Your current AI score may affect loan approval. Consider improving your profile before applying.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!formData.amount || !formData.purpose || !formData.idFile}
              className="w-full transform rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-emerald-700 disabled:transform-none disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700 shadow-lg backdrop-blur-sm"
            >
              Submit for AI Review
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            By submitting this application, you agree to our{" "}
            <a href="#" className="text-green-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoanApplication
