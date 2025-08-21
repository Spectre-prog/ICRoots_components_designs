"use client"

import type React from "react"
import { Bitcoin, Shield, Zap, TrendingUp, Star, ArrowRight, Globe, Lock } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-600/6 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-green-300/4 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-green-400/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-green-300/40 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-green-500/25 rounded-full animate-bounce delay-1100"></div>
          <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-green-400/35 rounded-full animate-bounce delay-1500"></div>
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-green-950/30 border-b border-green-400/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src="/ICRoots logo, no background.png" alt="ICRoots Logo" className="h-10 w-10 drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-sm"></div>
            </div>
            <span className="text-yellow-400 text-2xl font-bold drop-shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              ICRoots
            </span>
          </div>
          <div className="hidden space-x-8 md:flex">
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-yellow-400 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-white/5"
            >
              How It Works
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a
              href="#why-icp"
              className="text-gray-300 hover:text-yellow-400 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Why ICP
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-yellow-400 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Reviews
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
            </a>
          </div>
        </div>
      </nav>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-32 pt-40 text-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/8 via-transparent to-green-600/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/12 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-400/10 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-500/15 rounded-full animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <h1 className="text-5xl mb-8 leading-tight font-bold uppercase md:text-7xl">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
                Where Bitcoin
              </span>
              <br />
              <span className="text-white drop-shadow-lg">Backs You</span>
            </h1>
            <p className="text-gray-300 mx-auto mb-10 max-w-3xl text-lg md:text-xl leading-relaxed">
              Powered by AI, Secured on ICP. The future of Bitcoin-backed lending is here.
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button
                onClick={onGetStarted}
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-lg font-semibold uppercase rounded-2xl px-10 py-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </span>
              </button>
              <button className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-yellow-400/50 hover:border-yellow-400 text-yellow-400 hover:text-yellow-300 text-lg font-semibold uppercase rounded-2xl px-10 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-4xl mb-20 text-center font-bold text-white uppercase tracking-wider">How ICRoots Works</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Bitcoin className="text-yellow-400 h-14 w-14" />}
            title="Deposit Bitcoin"
            description="Securely deposit Bitcoin as collateral into your auto-generated ICP wallet"
          />
          <FeatureCard
            icon={<Zap className="text-green-600 h-14 w-14" />}
            title="AI Assessment"
            description="Our AI evaluates your profile and provides instant loan pre-approval"
          />
          <FeatureCard
            icon={<TrendingUp className="text-green-400 h-14 w-14" />}
            title="Get Funded"
            description="Receive loans in fiat or USDT from our network of verified lenders"
          />
          <FeatureCard
            icon={<Shield className="text-purple-400 h-14 w-14" />}
            title="Build Trust"
            description="Earn soulbound NFTs that grow your trust tier and unlock better rates"
          />
        </div>
      </section>

      <section id="why-icp" className="relative py-24 px-6">
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-r from-green-950/60 via-green-900/40 to-green-950/60"></div>
        <div className="relative mx-auto max-w-6xl">
          <h2 className="text-4xl mb-20 text-center font-bold text-white uppercase tracking-wider">
            Why ICP & Bitcoin?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <BenefitCard
              icon={<Lock className="text-green-700 h-12 w-12" />}
              title="Secure"
              description="End-to-end encryption and decentralized architecture ensure your assets are always protected"
            />
            <BenefitCard
              icon={<Globe className="text-green-400 h-12 w-12" />}
              title="Transparent"
              description="All transactions are recorded on-chain with full auditability and transparency"
            />
            <BenefitCard
              icon={<Zap className="text-yellow-400 h-12 w-12" />}
              title="Borderless"
              description="Access global lending markets without geographic restrictions or traditional banking limits"
            />
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-4xl mb-20 text-center font-bold text-white uppercase tracking-wider">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <TestimonialCard
            quote="ICRoots made it incredibly easy to unlock the value of my Bitcoin without selling. The AI assessment was fair and fast."
            author="Sarah Chen"
            role="Borrower"
            rating={5}
          />
          <TestimonialCard
            quote="As a lender, I love the AI-powered borrower matching. It's helped me make informed decisions and earn consistent returns."
            author="Marcus Rivera"
            role="Lender"
            rating={5}
          />
          <TestimonialCard
            quote="The trust NFT system is genius. My rates improved as I built my reputation. It's lending gamified in the best way."
            author="Alex Petrov"
            role="Borrower"
            rating={5}
          />
        </div>
      </section>

      <footer className="relative backdrop-blur-xl bg-green-950/50 border-t border-green-400/20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center space-x-3">
              <img src="/ICRoots logo, no background.png" alt="ICRoots Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                ICRoots
              </span>
            </div>
            <p className="text-gray-400 text-lg">Where Bitcoin Backs You</p>
          </div>
          <div>
            <h3 className="mb-6 font-bold text-white text-lg">Platform</h3>
            <ul className="text-gray-400 space-y-3">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  For Borrowers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  For Lenders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  AI Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-bold text-white text-lg">Company</h3>
            <ul className="text-gray-400 space-y-3">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-bold text-white text-lg">Legal</h3>
            <ul className="text-gray-400 space-y-3">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-yellow-400 hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Risk Disclosure
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 text-gray-500 py-8 text-center">
          <p>&copy; 2025 ICRoots. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
}> = ({ icon, title, description }) => (
  <div className="group relative backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
)

const BenefitCard: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
}> = ({ icon, title, description }) => (
  <div className="group backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl p-10 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">
    <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="mb-6 text-xl font-bold text-white">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
)

const TestimonialCard: React.FC<{
  quote: string
  author: string
  role: string
  rating: number
}> = ({ quote, author, role, rating }) => (
  <div className="group backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
    <div className="mb-6 flex">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="text-yellow-400 h-5 w-5 fill-current mr-1" />
      ))}
    </div>
    <p className="text-gray-300 text-lg mb-6 italic leading-relaxed">"{quote}"</p>
    <div className="border-t border-white/10 pt-4">
      <p className="font-bold text-white text-lg">{author}</p>
      <p className="text-gray-400">{role}</p>
    </div>
  </div>
)

export default LandingPage
