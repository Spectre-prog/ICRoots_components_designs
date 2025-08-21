"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Mail, Lock, User, Globe, Gift } from "lucide-react"

interface AuthPageProps {
  onAuth: (email: string, password: string, role: "borrower" | "lender") => Promise<void>
  onBack: () => void
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth, onBack }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [selectedRole, setSelectedRole] = useState<"borrower" | "lender" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    country: "",
    referral: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "signup" && !selectedRole) return

    setIsSubmitting(true)
    setError(null)
    const role = mode === "signin" ? "borrower" : selectedRole!

    try {
      await onAuth(formData.email, formData.password, role)
    } catch (error) {
      console.error("Authentication failed:", error)
      setError("Authentication failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 bg-gradient-to-br from-black via-green-950 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-600/3 to-green-400/3 rounded-full blur-3xl animate-spin-slow"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-300/40 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-green-500/25 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-green-400/35 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={onBack}
          className="text-green-100 hover:text-green-300 mb-8 flex items-center transition-all duration-300 hover:translate-x-1 backdrop-blur-sm bg-green-900/10 px-4 py-2 rounded-full border border-green-500/20 hover:border-green-400/40"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </button>

        <div className="bg-green-950/20 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-400/30">
          <div className="mb-8 text-center">
            <h1 className="text-3xl mb-3 font-bold text-white uppercase tracking-wider bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
              {mode === "signin" ? "Welcome Back" : "Join ICRoots"}
            </h1>
            <p className="text-green-200/70 text-lg">
              {mode === "signin" ? "Sign in to your account" : "Create your account to get started"}
            </p>
          </div>

          {/* Role Selection for Signup */}
          {mode === "signup" && (
            <div className="mb-6">
              <label className="text-green-200 mb-4 block font-semibold text-lg">I want to:</label>
              <div className="grid grid-cols-2 gap-4">
                <RoleCard
                  role="borrower"
                  title="Borrow"
                  description="Get loans using Bitcoin"
                  selected={selectedRole === "borrower"}
                  onClick={() => setSelectedRole("borrower")}
                />
                <RoleCard
                  role="lender"
                  title="Lend"
                  description="Fund loans and earn"
                  selected={selectedRole === "lender"}
                  onClick={() => setSelectedRole("lender")}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 mb-6 rounded-2xl p-4">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <InputField
                icon={<User size={18} />}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            )}

            <InputField
              icon={<Mail size={18} />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <InputField
              icon={<Lock size={18} />}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {mode === "signup" && (
              <>
                <div className="relative">
                  <Globe className="text-green-300/60 absolute top-1/2 left-4 -translate-y-1/2 transform" size={18} />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="bg-green-950/30 backdrop-blur-sm border border-green-500/30 focus:border-green-400/60 focus:ring-2 focus:ring-green-400/20 w-full rounded-2xl py-4 pr-4 pl-12 text-white transition-all duration-300 hover:border-green-400/40"
                    required
                  >
                    <option value="" className="bg-green-950 text-green-200">
                      Select Country
                    </option>
                    <option value="US" className="bg-green-950 text-green-200">
                      United States
                    </option>
                    <option value="CA" className="bg-green-950 text-green-200">
                      Canada
                    </option>
                    <option value="UK" className="bg-green-950 text-green-200">
                      United Kingdom
                    </option>
                    <option value="DE" className="bg-green-950 text-green-200">
                      Germany
                    </option>
                    <option value="FR" className="bg-green-950 text-green-200">
                      France
                    </option>
                    <option value="JP" className="bg-green-950 text-green-200">
                      Japan
                    </option>
                    <option value="AU" className="bg-green-950 text-green-200">
                      Australia
                    </option>
                  </select>
                </div>

                <InputField
                  icon={<Gift size={18} />}
                  type="text"
                  name="referral"
                  placeholder="Referral Code (Optional)"
                  value={formData.referral}
                  onChange={handleInputChange}
                />
              </>
            )}

            <button
              type="submit"
              disabled={(mode === "signup" && !selectedRole) || isSubmitting}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-green-800/30 disabled:to-green-700/30 text-white shadow-lg hover:shadow-green-500/25 flex w-full transform items-center justify-center rounded-2xl py-4 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed backdrop-blur-sm border border-green-400/20 hover:border-green-300/40"
            >
              {isSubmitting ? (
                <div className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-green-200/70 text-lg">
              {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-green-300 ml-2 font-semibold hover:text-green-200 transition-colors duration-300 hover:underline"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          {mode === "signin" && (
            <div className="mt-6 text-center">
              <button className="text-green-300/60 hover:text-green-200 transition-colors duration-300 hover:underline">
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const RoleCard: React.FC<{
  role: "borrower" | "lender"
  title: string
  description: string
  selected: boolean
  onClick: () => void
}> = ({ role, title, description, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-2xl border-2 p-5 text-left transition-all duration-300 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1 ${
      selected
        ? "border-green-400 bg-green-500/20 shadow-lg shadow-green-500/20"
        : "border-green-600/30 bg-green-950/20 hover:border-green-400/60 hover:bg-green-500/10"
    }`}
  >
    <div className="mb-2 font-bold text-white text-lg">{title}</div>
    <div className="text-green-200/70">{description}</div>
  </button>
)

const InputField: React.FC<{
  icon: React.ReactNode
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}> = ({ icon, type, name, placeholder, value, onChange, required }) => (
  <div className="relative">
    <div className="text-green-300/60 absolute top-1/2 left-4 -translate-y-1/2 transform">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="bg-green-950/30 backdrop-blur-sm border border-green-500/30 focus:border-green-400/60 focus:ring-2 focus:ring-green-400/20 placeholder-green-300/50 w-full rounded-2xl py-4 pr-4 pl-12 text-white transition-all duration-300 hover:border-green-400/40"
    />
  </div>
)

export default AuthPage
