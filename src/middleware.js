import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default clerkMiddleware((req) => {
//   // Log request details to debug
//   console.log("Middleware executed for:", req.nextUrl.pathname);

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     '/complianceMonitoring',
//     '/contractMonitoring',
//     '/disputes',
//     '/documentVerification',
//     '/editProfile',
//     '/feedback',
//     '/listedServices',
//     '/moderatorPage',
//     '/moderatorsRegistration',
//     '/serviceDetails',
//     '/totalUsers',
//     '/transactions',
//   ],
// };
