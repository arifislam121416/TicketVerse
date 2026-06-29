"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TricketDetailsPage = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  // Fetch Ticket
  useEffect(() => {
    const getTicket = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/tricket/${id}`
        );

        const data = await res.json();

        setTicket(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getTicket();
    }
  }, [id]);

  // Countdown
  useEffect(() => {
    if (!ticket?.departureDateTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const departure = new Date(
        ticket.departureDateTime
      ).getTime();

      const distance = departure - now;

      if (distance <= 0) {
        setTimeLeft("Journey Started");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      setTimeLeft(
        `${days} Days ${hours} Hours ${minutes} Minutes`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket]);

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Not Found
  if (!ticket) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl font-bold">
          Ticket Not Found
        </h2>
      </div>
    );
  }

  const expired =
    new Date(ticket.departureDateTime) < new Date();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left Side */}
        <div>
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-[450px] object-cover rounded-3xl shadow-xl"
          />
        </div>

        {/* Right Side */}
        <div className="space-y-6">

          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary badge-lg">
              {ticket.transportType}
            </span>

            <span className="badge badge-success badge-lg">
              Available {ticket.ticketQuantity}
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            {ticket.title}
          </h1>

          <p className="text-4xl font-bold text-primary">
            ৳ {ticket.price}
          </p>

          <div className="space-y-3 text-base">

            <p>
              <span className="font-bold">
                From:
              </span>{" "}
              {ticket.from}
            </p>

            <p>
              <span className="font-bold">
                To:
              </span>{" "}
              {ticket.to}
            </p>

            <p>
              <span className="font-bold">
                Departure:
              </span>{" "}
              {new Date(
                ticket.departureDateTime
              ).toLocaleString()}
            </p>

            <p>
              <span className="font-bold">
                Available Seats:
              </span>{" "}
              {ticket.ticketQuantity}
            </p>
          </div>

          {/* Countdown */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
            <h3 className="font-bold mb-2">
              Departure Countdown
            </h3>

            <p className="text-xl font-bold text-primary">
              {timeLeft}
            </p>
          </div>

          {/* Perks */}
          {ticket.perks?.length > 0 && (
            <div>
              <h3 className="font-bold mb-3">
                Travel Benefits
              </h3>

              <div className="flex flex-wrap gap-2">
                {ticket.perks.map((perk, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-lg"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Button */}
          <button
            disabled={
              expired ||
              ticket.ticketQuantity <= 0
            }
            onClick={() => {
              document
                .getElementById("bookingModal")
                ?.showModal();
            }}
            className="btn btn-primary btn-lg w-full"
          >
            {expired
              ? "Journey Started"
              : ticket.ticketQuantity <= 0
              ? "Sold Out"
              : "Book Now"}
          </button>

        </div>
      </div>

      {/* Booking Modal */}
      <dialog
        id="bookingModal"
        className="modal mx-auto p-6 rounded-3xl mt-20 bg-gray-400"
      >
        <div className="modal-box">

          <h3 className="font-bold text-2xl mb-5">
            Book Ticket
          </h3>

          <form className="space-y-4">

            <div>
              <label className="label">
                Ticket Quantity
              </label>

              <input
                type="number"
                min="1"
                max={ticket.ticketQuantity}
                placeholder="Enter quantity"
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-full"
            >
              Confirm Booking
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default TricketDetailsPage;