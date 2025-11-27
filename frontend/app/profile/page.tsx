"use client";

import { useState } from "react";
import { X, Home, ShoppingBag, MapPin, LogOut } from "lucide-react";

type Order = {
  id: string;
  date: string;
  amount: string;
  status: "PROCESSING" | "Delivered";
  image: string;
};

type Address = {
  label: string;
  lines: string[];
};

const profileData = {
  user: {
    name: "Pooju Pandey",
    email: "pooju@gmail.com",
  },
  stats: {
    totalOrders: 10,
    toDeliver: 1,
    wishlist: 12,
  },
  recentOrders: [
    {
      id: "1",
      date: "11/10/2004",
      amount: "NPR 3000.00",
      status: "PROCESSING",
      image: "/red-coat.jpg",
    },
    {
      id: "2",
      date: "11/10/2004",
      amount: "NPR 3000.00",
      status: "Delivered",
      image: "/red-coat.jpg",
    },
  ] as Order[],
  orderHistory: [
    {
      id: "3",
      date: "11/10/2004",
      amount: "NPR 3000.00",
      status: "PROCESSING",
      image: "/red-coat.jpg",
    },
    {
      id: "4",
      date: "11/10/2004",
      amount: "NPR 3000.00",
      status: "Delivered",
      image: "/red-coat.jpg",
    },
    {
      id: "5",
      date: "11/10/2004",
      amount: "NPR 3000.00",
      status: "Delivered",
      image: "/red-coat.jpg",
    },
    {
      id: "6",
      date: "11/10/2004",
      amount: "NPR 3000.00",
      status: "Delivered",
      image: "/red-coat.jpg",
    },
  ] as Order[],
  addresses: [
    {
      label: "Default",
      lines: ["Bhandari tol, agyat galli", "Kathmandu, Gongabu", "Nepal"],
    },
    {
      label: "Add 1",
      lines: ["Bhandari tol, agyat galli", "Kathmandu, Gongabu", "Nepal"],
    },
  ] as Address[],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "addresses"
  >("overview");

  return (
    <main className="bg-white">
      <div className="container mx-auto! px-4! py-12!">
        {/* Layout: sidebar left, content right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8!">
          {/* Sidebar */}
          <aside className="md:top-20 space-y-6!">
            {/* Profile card */}
            <div className="bg-cream rounded-lg p-6! text-center">
              <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center text-white text-3xl mx-auto! mb-4!">
                👤
              </div>
              <h2 className="text-xl font-bold mb-2">
                {profileData.user.name}
              </h2>
              <p className="text-gray-600 text-sm">{profileData.user.email}</p>
              <button className="mt-4 text-gray-700 hover:text-gray-900 font-semibold">
                ✎ Edit Profile
              </button>
            </div>

            {/* Navigation */}
            <nav className="grid grid-cols-2 space-y-2! sm:block">
              <SidebarItem
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                icon={<Home size={20} />}
                label="Overview"
              />
              <SidebarItem
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
                icon={<ShoppingBag size={20} />}
                label="Orders"
              />
              <SidebarItem
                active={activeTab === "addresses"}
                onClick={() => setActiveTab("addresses")}
                icon={<MapPin size={20} />}
                label="Address"
              />
              <button className="w-full flex items-center gap-3! px-4! py-3! rounded-lg hover:bg-gray-100 transition">
                <LogOut size={20} />
                <span className="font-bold">Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <section>
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "addresses" && <AddressesTab />}
          </section>
        </div>
      </div>
    </main>
  );
}

/* Sidebar item component for consistency */
function SidebarItem({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4! py-3! rounded-lg transition ${
        active ? "bg-cream border-l-4 border-green-700" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  );
}

/* Tabs — broken into small components for clarity */
function OverviewTab() {
  return (
    <div>
      <h2 className="text-4xl font-light mb-8!">Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4! mb-12!">
        <StatCard label="Total Orders" value={profileData.stats.totalOrders} />
        <StatCard label="To Deliver" value={profileData.stats.toDeliver} />
        <StatCard label="Wishlist" value={profileData.stats.wishlist} />
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-2xl font-light mb-6!">Recent Orders</h3>
        <div className="space-y-4!">
          {profileData.recentOrders.map((order, i) => (
            <OrderRow key={i} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <div>
      <h2 className="text-4xl font-light mb-8!">Order History</h2>
      <div className="space-y-4!">
        {profileData.orderHistory.map((order, i) => (
          <OrderRow key={i} order={order} />
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  return (
    <div>
      <div className="flex flex-wrap gap-4! items-center justify-between mb-8!">
        <h2 className="text-4xl font-light">Saved Addresses</h2>
        <button className="bg-green-700 text-white px-6! py-2! font-bold hover:bg-green-800 transition rounded-lg">
          ADD NEW
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {profileData.addresses.map((address, i) => (
          <div
            key={i}
            className="bg-cream p-6! rounded-lg flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-lg mb-4!">{address.label}</h3>
              {address.lines.map((line, idx) => (
                <p key={idx} className="text-gray-700 mb-2!">
                  {line}
                </p>
              ))}
            </div>
            <div className="flex gap-4!">
              <button className="text-gray-600 hover:text-gray-900">✎</button>
              <button className="text-red-600 hover:text-red-800">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Subcomponents */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-cream p-6! rounded-lg text-center">
      <div className="text-3xl font-bold text-green-700 mb-2!">{value}</div>
      <p className="font-bold">{label}</p>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <div className="bg-cream p-6! rounded-lg flex gap-6! items-center">
      <img
        src={order.image}
        alt="Order"
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <p className="text-sm text-gray-600">Tracking ID: {order.id}</p>
        <p className="text-sm text-gray-600">{order.date}</p>
        <p className="font-bold text-orange-500 mt-2!">{order.amount}</p>
      </div>
      <div className="text-right">
        <span
          className={`text-xs font-bold px-3! py-1! rounded ${
            order.status === "PROCESSING"
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {order.status}
        </span>
        <button className="block mt-4! text-green-700 font-bold hover:underline">
          View Details
        </button>
      </div>
    </div>
  );
}
