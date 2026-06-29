"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TricketPage = ({id}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transportType, setTransportType] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let url = `http://localhost:8000/tricket?`;

    if (from) url += `from=${from}&`;
    if (to) url += `to=${to}&`;
    if (transportType) url += `transportType=${transportType}&`;
    if (sort) url += `sort=${sort}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      });
  }, [from, to, transportType, sort]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold">
          Explore Tickets
        </h1>

        <p className="text-base-content/70 mt-3">
          Bus • Train • Launch • Flight
        </p>
      </div>

      {/* Search Filter Section */}
      <div className="bg-base-200 p-5 rounded-2xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="From"
            className="input input-bordered w-full"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            type="text"
            placeholder="To"
            className="input input-bordered w-full"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
          >
            <option value="">All Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
            <option value="Launch">Launch</option>
          </select>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By Price</option>
            <option value="asc">
              Low → High
            </option>
            <option value="desc">
              High → Low
            </option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <p className="mb-6 text-lg font-medium">
            {tickets.length} Tickets Found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="card bg-base-100 shadow-xl border hover:-translate-y-1 duration-300"
              >
                <figure>
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="h-60 w-full object-cover"
                  />
                </figure>

                <div className="card-body">

                  <div className="flex justify-between">
                    <span className="badge badge-primary">
                      {ticket.transportType}
                    </span>

                    <span className="font-bold text-primary">
                      ৳ {ticket.price}
                    </span>
                  </div>

                  <h2 className="card-title">
                    {ticket.title}
                  </h2>

                  <p>
                    📍 {ticket.from} → {ticket.to}
                  </p>

                  <p>
                    🎟️ Available:
                    {" "}
                    {ticket.ticketQuantity}
                  </p>

                  <p>
                    🕒{" "}
                    {new Date(
                      ticket.departureDateTime
                    ).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {ticket.perks?.map((perk, idx) => (
                      <span
                        key={idx}
                        className="badge badge-outline"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions mt-5">
<Link
  href={`/tricket/${ticket._id}`}
  className="btn btn-primary w-full"
>
  See Details
</Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default TricketPage;