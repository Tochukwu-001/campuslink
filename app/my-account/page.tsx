import { auth, signOut } from "@/auth";
import { theme } from "@/components/Styles";
import { redirect } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLogout,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export default async function MyAccount() {
  const session = await auth();

  if(!session){
    redirect("/auth/signin")
  }

  // Handle null/undefined values by establishing safe fallback defaults
  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email provided",
    picture: session?.user?.image || "",
  };

  // Pure Server Side Action to update the user's name
  async function updateProfileName(formData: FormData) {
    "use server";
    const updatedName = formData.get("profileName");

    // Implement mutation database logic here (e.g., Prisma, Supabase, etc.)
    console.log(`Server updating user name to: ${updatedName}`);
  }

  // Pure Server Side Action to handle system logging out
  async function handleLogout() {
    "use server";
    // Implement session destruction/cookie clearance logic here
    console.log("Server destroying session...");
  }

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Profile Card Header Top Accent Panel */}
        <div
          className="h-32 w-full relative opacity-90"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Profile Card Content Base */}
        <div className="px-6 pb-8 md:px-10 relative">
          {/* User Profile Avatar Configuration Layer */}
          <div className="absolute -top-16 left-6 md:left-10">
            {user.picture ? (
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white bg-white shadow-md relative">
                {/* Fixed TypeScript error by ensuring alt is a clean string type */}
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-28 h-28 rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-white text-4xl font-black"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Quick Identity Details Block */}
          <div className="pt-16 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              {user.name}
            </h2>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <HiOutlineMail className="text-base text-slate-400" />
              {user.email}
            </p>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Account Interactive Settings Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Account Settings
              </h3>

              {/* Form Handling Name Updates via Server Action */}
              <form action={updateProfileName} className="space-y-2">
                <label className="block text-xs font-bold tracking-wide text-slate-600">
                  Update Display Name
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <HiOutlineUser className="text-lg" />
                    </span>
                    <input
                      type="text"
                      name="profileName"
                      defaultValue={user.name}
                      placeholder="Enter new display name"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-md shadow-teal-600/10 hover:shadow-lg transition-all active:scale-[0.98]"
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    <HiOutlineCheckCircle className="text-lg" />
                    Save Name
                  </button>
                </div>
              </form>
            </div>

            <hr className="border-slate-100 my-2" />

            {/* Session Management Security Zone */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Session Control
              </h3>

              {/* Logout Button Form Layout Grid */}
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-red-200 bg-red-50/40 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 hover:border-red-300 active:bg-red-100/50 transition-all duration-200"
                  >
                    <HiOutlineLogout className="text-lg" />
                    Log Out from CampusLink
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
