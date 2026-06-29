"use client";

import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaTicketAlt,
  FaUser,
  FaCog,
   FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session,isPending  } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
 

  const user = session?.user;
  if (!session && !isPending) {
  return null;
}
  if (isPending) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
   <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"/>
</div>
  );
}

  const menus = [
      {
    title: "Dashboard",
    href: `/dashboard/${user.role}`,
    icon: FaHome,
  },
    {
      title: "My Tickets",
      href: "/dashboard/tickets",
      icon: FaTicketAlt,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: FaUser,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: FaCog,
    },
  ];
  const handleSignOut = async () => {
  try {
    await authClient.signOut();

router.replace("/");
router.refresh();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Desktop Sidebar */}

      <aside className="hidden lg:flex w-72 border-r border-white/10 bg-slate-900 flex-col sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-white/10">
          <Logo />
        </div>

        <div className="px-6 py-5 border-b border-white/10">
        <Image
  src={user?.image || "/default-user.png"}
  alt={user?.name || "User"}
  width={56}
  height={56}
  className="rounded-full object-cover"
/>

          <h2 className="mt-3 font-semibold text-white">
            {user?.name}
          </h2>

          <p className="text-sm text-slate-400 capitalize">
            {user?.role}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
  pathname === menu.href ||
pathname.startsWith(menu.href + "/")
    ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white"
    : "text-slate-300 hover:bg-slate-800"
}`}
              >
                <Icon />
                <span>{menu.title}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
  <button
    onClick={handleSignOut}
    className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
  >
    <FaSignOutAlt />
    <span>Sign Out</span>
  </button>
</div>
      </aside>

      {/* Mobile Drawer */}

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-72 bg-slate-900 p-5">
            <div className="flex justify-between items-center mb-8">
              <Logo />

              <button onClick={() => setOpen(false)}>
                <FaTimes className="text-white text-xl" />
              </button>
            </div>

            <div className="space-y-2">
              {menus.map((menu) => {
                const Icon = menu.icon;

                return (
                  <Link
                    key={menu.title}
                    href={menu.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                      pathname === menu.href
                        ? "bg-pink-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <Icon />
                    {menu.title}
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 border-t border-white/10 pt-4">
  <button
    onClick={handleSignOut}
    className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
  >
    <FaSignOutAlt />
    <span>Sign Out</span>
  </button>
</div>
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main */}

      <div className="flex-1 flex flex-col">
        {/* Topbar */}

        <header className="h-16 border-b border-white/10 bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <FaBars className="text-white text-xl" />
            </button>

            <h1 className="text-xl font-bold text-white">
            Dashboard
            </h1>
        </div>

       <Image
  src={user?.image || "/default-user.png"}
  alt={user?.name || "User"}
  width={40}
  height={40}
  className="rounded-full object-cover"
/>
        </header>

        <main className="flex-1 p-6 bg-slate-950">
        {children}
        </main>
    </div>
    </div>
);
};

export default DashboardLayout;