import type React from "react"

interface TrustNFTDisplayProps {
  tier: string
  compact?: boolean
  completedLoans?: number
  totalRepaymentAmount?: number
  onTimePayments?: number
  averageRating?: number
}

const TrustNFTDisplay: React.FC<TrustNFTDisplayProps> = ({
  tier,
  compact = false,
  completedLoans = 0,
  totalRepaymentAmount = 0,
  onTimePayments = 0,
  averageRating = 0,
}) => {
  const getTierInfo = (tier: string) => {
    const calculateNextLevelRequirements = (currentLevel: number) => {
      const requirements = {
        2: { loans: 2, amount: 1000, onTime: 90 },
        3: { loans: 5, amount: 5000, onTime: 95 },
        4: { loans: 10, amount: 15000, onTime: 98 },
        5: { loans: 20, amount: 50000, onTime: 100 },
      }
      return requirements[currentLevel + 1] || null
    }

    switch (tier) {
      case "sprout":
        return {
          emoji: "🌱",
          name: "Sprout",
          description: "New user - Building your reputation",
          level: 1,
          progress: Math.min((completedLoans / 2) * 100, 100),
          benefits: ["Basic loan access", "Standard rates", "Community support"],
          color: "from-green-400 to-emerald-500",
          bgColor: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
          nextRequirements: calculateNextLevelRequirements(1),
        }
      case "sapling":
        return {
          emoji: "🌿",
          name: "Sapling",
          description: "Growing trust - Proven reliability",
          level: 2,
          progress: Math.min(((completedLoans - 2) / 3) * 100, 100),
          benefits: ["Faster approval", "0.5% rate reduction", "Priority queue"],
          color: "from-green-500 to-teal-500",
          bgColor: "bg-gradient-to-br from-green-800/20 to-teal-800/20",
          nextRequirements: calculateNextLevelRequirements(2),
        }
      case "branch":
        return {
          emoji: "🌲",
          name: "Branch",
          description: "Established borrower - Excellent history",
          level: 3,
          progress: Math.min(((completedLoans - 5) / 5) * 100, 100),
          benefits: ["Priority support", "1% rate reduction", "Higher loan limits", "Flexible terms"],
          color: "from-teal-500 to-cyan-500",
          bgColor: "bg-gradient-to-br from-teal-800/20 to-cyan-800/20",
          nextRequirements: calculateNextLevelRequirements(3),
        }
      case "trunk":
        return {
          emoji: "🌳",
          name: "Trunk",
          description: "Elite borrower - Exceptional performance",
          level: 4,
          progress: Math.min(((completedLoans - 10) / 10) * 100, 100),
          benefits: ["Premium rates", "Extended terms", "Exclusive products", "Personal advisor"],
          color: "from-cyan-500 to-blue-500",
          bgColor: "bg-gradient-to-br from-cyan-800/20 to-blue-800/20",
          nextRequirements: calculateNextLevelRequirements(4),
        }
      case "oak":
        return {
          emoji: "🌰",
          name: "Oak",
          description: "Legendary status - Maximum trust achieved",
          level: 5,
          progress: 100,
          benefits: [
            "Best rates available",
            "Maximum loan amounts",
            "VIP support",
            "Beta features access",
            "Revenue sharing",
          ],
          color: "from-blue-500 to-purple-500",
          bgColor: "bg-gradient-to-br from-blue-800/20 to-purple-800/20",
          nextRequirements: null,
        }
      default:
        return getTierInfo("sprout")
    }
  }

  const tierInfo = getTierInfo(tier)

  if (compact) {
    return (
      <div className="flex items-center space-x-3 rounded-xl bg-green-950/20 backdrop-blur-md border border-green-500/20 p-3 hover:bg-green-950/30 transition-all duration-300">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${tierInfo.color} text-xl shadow-lg`}
        >
          {tierInfo.emoji}
        </div>
        <div>
          <p className="font-semibold text-white">{tierInfo.name}</p>
          <p className="text-xs text-green-400">Level {tierInfo.level}/5</p>
        </div>
        <div className="ml-auto">
          <div className="h-2 w-16 rounded-full bg-green-500/20">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${tierInfo.color} transition-all duration-500`}
              style={{ width: `${tierInfo.progress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 bg-gradient-to-br from-black via-green-950 to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-600/3 to-green-400/3 rounded-full blur-3xl animate-spin-slow"></div>

        <div className="absolute top-20 left-20 w-2 h-2 bg-green-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-300/40 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-green-500/25 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-green-400/35 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-6">
        <div
          className={`relative rounded-3xl ${tierInfo.bgColor} backdrop-blur-xl border border-green-500/20 p-8 text-center shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-400/30`}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/5 to-transparent" />

          <div
            className={`mb-6 text-8xl drop-shadow-lg animate-bounce-slow inline-block p-4 rounded-full bg-gradient-to-br ${tierInfo.color}`}
          >
            {tierInfo.emoji}
          </div>

          <h2 className={`mb-3 text-4xl font-bold bg-gradient-to-r ${tierInfo.color} bg-clip-text text-transparent`}>
            {tierInfo.name}
          </h2>

          <p className="mb-6 text-lg text-green-200/80 max-w-md mx-auto">{tierInfo.description}</p>

          <div className="mb-8 flex items-center justify-center space-x-4">
            <span className="text-sm text-green-200/60">Trust Level</span>
            <span
              className={`rounded-full bg-gradient-to-r ${tierInfo.color} px-4 py-2 text-sm font-bold text-white shadow-lg`}
            >
              {tierInfo.level}/5
            </span>
          </div>

          {tierInfo.level < 5 && (
            <div className="mb-8">
              <div className="mb-3 flex justify-between text-sm text-green-200/70">
                <span>
                  Progress to{" "}
                  {tierInfo.level === 1
                    ? "Sapling"
                    : tierInfo.level === 2
                      ? "Branch"
                      : tierInfo.level === 3
                        ? "Trunk"
                        : "Oak"}
                </span>
                <span className="font-semibold">{Math.round(tierInfo.progress)}%</span>
              </div>
              <div className="relative h-4 w-full rounded-full bg-green-500/10 overflow-hidden">
                <div
                  className={`h-4 rounded-full bg-gradient-to-r ${tierInfo.color} transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${tierInfo.progress}%` }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-green-950/20 backdrop-blur-xl border border-green-500/20 p-6 shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-400/30">
          <h3 className="mb-6 text-2xl font-bold text-white flex items-center">
            <span className="mr-3 text-2xl">✨</span>
            Your Benefits
          </h3>
          <div className="grid gap-4">
            {tierInfo.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-xl bg-green-500/5 hover:bg-green-500/10 transition-all duration-300"
              >
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${tierInfo.color} shadow-lg animate-pulse`} />
                <span className="text-green-100/90 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-green-950/20 backdrop-blur-xl border border-green-500/20 p-6 shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-400/30">
            <h3 className="mb-4 text-xl font-bold text-white flex items-center">
              <span className="mr-3 text-xl">📊</span>
              Your Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">Completed Loans:</span>
                <span className="font-bold text-green-400">{completedLoans}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">On-time Payments:</span>
                <span className="font-bold text-green-400">{onTimePayments}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">Average Rating:</span>
                <span className="font-bold text-yellow-400">{averageRating}/5 ⭐</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-green-950/20 backdrop-blur-xl border border-green-500/20 p-6 shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-400/30">
            <h3 className="mb-4 text-xl font-bold text-white flex items-center">
              <span className="mr-3 text-xl">🔗</span>
              NFT Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">Type:</span>
                <span className="font-bold text-white">Soulbound NFT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">Blockchain:</span>
                <span className="font-bold text-white">Internet Computer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">Transferable:</span>
                <span className="font-bold text-red-400">No (Soulbound)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-200/70">Upgradeable:</span>
                <span className="font-bold text-green-400">Yes (Automatic)</span>
              </div>
            </div>
          </div>
        </div>

        {tierInfo.level < 5 && tierInfo.nextRequirements && (
          <div
            className={`rounded-3xl ${tierInfo.bgColor} backdrop-blur-xl border border-green-500/20 p-6 shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-400/30`}
          >
            <h3 className="mb-6 text-2xl font-bold text-white flex items-center">
              <span className="mr-3 text-2xl">🎯</span>
              Next Level Requirements
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-green-500/5">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-sm text-green-200/70">Loans Needed</div>
                <div className="text-xl font-bold text-white">{tierInfo.nextRequirements.loans}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-500/5">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-green-200/70">Total Amount</div>
                <div className="text-xl font-bold text-white">${tierInfo.nextRequirements.amount.toLocaleString()}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-500/5">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-sm text-green-200/70">On-time Rate</div>
                <div className="text-xl font-bold text-white">{tierInfo.nextRequirements.onTime}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrustNFTDisplay
