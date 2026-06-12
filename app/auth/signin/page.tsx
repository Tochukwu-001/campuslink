import { theme } from "@/components/Styles";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Signin() {

  const session = await auth()
  // console.log(session);

  if(session){
    redirect("/feed")
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10">
        {/* Brand & Header text */}
        <div className="text-center mb-8">
          <span
            className="text-2xl font-extrabold tracking-tight block mb-2"
            style={{ color: theme.primaryColor }}
          >
            Campus<span style={{ color: theme.secondaryColor }}>Link</span>
          </span>
          <h1 className="text-xl font-bold text-slate-800 mb-1">
            Welcome back!
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to sync your shared resources
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100/80 shadow-sm transition-all duration-200 text-sm"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </form>

        {/* Visual Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white">
            Or with email
          </span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* Credentials Authentication Form */}
        <form className="space-y-5">
          {/* Email Field Container */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <HiOutlineMail className="text-lg" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@institution.edu"
                required
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Password Field Container */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <Link
                href="/"
                className="text-xs font-medium hover:underline"
                style={{ color: theme.secondaryColor }}
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <HiOutlineLockClosed className="text-lg" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold shadow-lg shadow-teal-600/10 hover:shadow-xl hover:shadow-teal-600/20 text-white text-center text-sm transition-all duration-200 mt-2 hover:opacity-95"
            style={{ backgroundColor: theme.secondaryColor }}
          >
            Sign In
          </button>
        </form>

        {/* Bottom Link Row */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/"
            className="font-semibold hover:underline"
            style={{ color: theme.primaryColor }}
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
