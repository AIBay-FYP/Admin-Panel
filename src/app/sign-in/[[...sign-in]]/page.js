'use client'
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Login() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      window.location.reload(); 
    }
  }, [isSignedIn]);
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-teal-900 to-indigo-900 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-emerald-500 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-violet-500 blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-cyan-500 blur-xl animate-pulse" style={{animationDelay: "2s"}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-amber-400 blur-2xl animate-pulse" style={{animationDelay: "1.5s"}}></div>
        </div>
        
        {/* Left side - Branding */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-6 py-12 md:py-0 text-center z-10">
          <div className="max-w-md">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <span className="text-indigo-900 text-2xl font-bold">AI-B</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3 text-shadow">Admin Portal</h1>
            <p className="text-lg text-teal-100 mb-8">Manage and monitor AI-Bay with powerful admin tools</p>
            
            {/* Feature highlights */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-20 text-left">
                  <div className="text-cyan-300 mb-1 font-medium">Compliance Monitoring</div>
                  <p className="text-white text-xs opacity-80">Real-time insights and alerts on platform activities</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-20 text-left">
                  <div className="text-cyan-300 mb-1 font-medium">User Management</div>
                  <p className="text-white text-xs opacity-80">Manage accounts, roles and access privileges</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-20 text-left">
                  <div className="text-cyan-300 mb-1 font-medium">System Analytics</div>
                  <p className="text-white text-xs opacity-80">Performance metrics and usage statistics</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-20 text-left">
                  <div className="text-cyan-300 mb-1 font-medium">Content Moderation</div>
                  <p className="text-white text-xs opacity-80">Review and moderate user-generated content</p>
                </div>
              </div>
              <p className="text-teal-200 text-sm mx-auto max-w-xs italic">
                Secure access for authorized administrators only
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-6 z-10">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-white border-opacity-20 relative overflow-hidden">
            {/* Glass reflection effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-10"></div>
            
            <div className="relative z-10">
              <SignIn
                fallbackRedirectUrl="/complianceMonitoring"
                routing="hash"
                signUpUrl=""
                appearance={{
                  elements: {
                    rootBox: {
                      boxShadow: "none",
                      width: "100%"
                    },
                    card: {
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent"
                    },
                    headerTitle: {
                      fontSize: "1.5rem",
                      color: "white",
                      fontWeight: "bold"
                    },
                    headerSubtitle: {
                      color: "rgba(255, 255, 255, 0.8)"
                    },
                    formButtonPrimary: {
                      backgroundColor: "#0d9488", 
                      "&:hover": {
                        backgroundColor: "#0f766e" 
                      }
                    },
                    formFieldLabel: {
                      color: "white"
                    },
                    formFieldInput: {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "black",
                      "&:focus": {
                        borderColor: "#22d3ee", 
                        outline: "none"
                      }
                    },
                    footer: {
                      display: "none"
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
}