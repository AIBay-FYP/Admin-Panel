import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
      <div className="flex justify-center items-center h-screen bg-login-bg sm:py-15 relative overflow-clip">
        <div className="flex flex-grow flex-col items-center float-left w-[50%] justify-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <h1 className="text-md">This is specifically designed to manage AI-Bay</h1>
        </div>
        <div className="flex flex-grow float-right w-[50%] justify-center">
            <SignIn
            fallbackRedirectUrl="/complianceMonitoring"
            routing="hash"
            signUpUrl="" // Set signUpUrl to an empty string to disable the sign-up option
            appearance={{
              elements: {
                footer:{
                    display:'none'
                }
              },
            }}
            />
        </div>
        </div>
    );
}