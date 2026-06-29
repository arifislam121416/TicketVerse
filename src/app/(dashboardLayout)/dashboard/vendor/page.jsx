"use client";

import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaTicketAlt,
  FaCrown,
  FaPlus,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

const OrganizerPage = () => {
  const stats = {
    totalEvents: 20,
    totalAttendees: 500,
    totalRevenue: 2600,
    totalSoldTickets: 750,
  };

  const isPremium = true;

  const recentEvents = [
    {
      id: 1,
      title: "React Conference 2026",
      date: "25 July 2026",
      tickets: 120,
    },
    {
      id: 2,
      title: "Business Summit",
      date: "02 August 2026",
      tickets: 85,
    },
    {
      id: 3,
      title: "Music Festival",
      date: "18 August 2026",
      tickets: 220,
    },
  ];

  const cards = [
    {
      title: "Hosted Events",
      value: stats.totalEvents,
      icon: <FaCalendarAlt size={24} />,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Attendees",
      value: stats.totalAttendees,
      icon: <FaUsers size={24} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue}`,
      icon: <FaDollarSign size={24} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Sold Tickets",
      value: stats.totalSoldTickets,
      icon: <FaTicketAlt size={24} />,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Organizer Dashboard 👋
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your events and monitor performance.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-xl transition">
          <FaPlus />
          Create Event
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 hover:border-pink-500 transition-all hover:-translate-y-1 duration-300"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-slate-400 text-sm uppercase">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Premium */}

        <div className="lg:col-span-1 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-6">

          <div className="flex items-center gap-3">

            <FaCrown className="text-yellow-400 text-3xl" />

            <div>
              <h2 className="font-bold text-xl">
                Premium Account
              </h2>

              <p className="text-slate-300 text-sm">
                Unlock unlimited event creation &
                analytics.
              </p>
            </div>
          </div>

          <div className="mt-6">

            {isPremium ? (
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                Active Premium
              </span>
            ) : (
              <button className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold">
                Upgrade
              </button>
            )}
          </div>
        </div>

        {/* Recent Events */}

        <div className="lg:col-span-2 rounded-3xl bg-slate-900 border border-slate-800 p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold">
              Recent Events
            </h2>

            <button className="flex items-center gap-2 text-pink-400 hover:text-pink-300">
              View All
              <FaArrowRight />
            </button>
          </div>

          <div className="space-y-4">

            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center bg-slate-800 rounded-2xl p-4 hover:bg-slate-700 transition"
              >
                <div>
                  <h3 className="font-semibold">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {event.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-pink-400">
                    {event.tickets}
                  </p>

                  <p className="text-xs text-slate-400">
                    Tickets Sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 hover:border-pink-500 transition cursor-pointer">

          <FaPlus className="text-3xl text-pink-500 mb-4" />

          <h3 className="font-bold text-lg">
            Create Event
          </h3>

          <p className="text-slate-400 mt-2">
            Launch a new event in minutes.
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 hover:border-blue-500 transition cursor-pointer">

          <FaChartLine className="text-3xl text-blue-500 mb-4" />

          <h3 className="font-bold text-lg">
            Analytics
          </h3>

          <p className="text-slate-400 mt-2">
            View detailed revenue and sales reports.
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 hover:border-green-500 transition cursor-pointer">

          <FaTicketAlt className="text-3xl text-green-500 mb-4" />

          <h3 className="font-bold text-lg">
            Manage Tickets
          </h3>

          <p className="text-slate-400 mt-2">
            Update ticket inventory and pricing.
          </p>
        </div>
      </div>

    </div>
  );
};

export default OrganizerPage;