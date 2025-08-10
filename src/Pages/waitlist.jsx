"use client";

import React, { useMemo, useState } from "react";

import { isLikelyEvmAddress } from "../lib/helper";
import { joinWaitlist } from "../api";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  evmAddress: "",
  discordHandle: "",
  xHandle: "",
  telegramHandle: "",
  feedback: "",
};

export default function JoinWaitlist() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const isEvmValid = useMemo(
    () =>
      formData.evmAddress.length === 0
        ? true
        : isLikelyEvmAddress(formData.evmAddress),
    [formData.evmAddress]
  );

  // Light geometric line pattern using layered repeating linear-gradients.
  // Top-half visibility with a soft fade to mimic the design reference.
  const backgroundStyle = {
    height: "50vh", // Reduced to half page height
    backgroundImage: [
      // Primary diagonal lines
      "repeating-linear-gradient(60deg, rgba(112,58,230,0.08) 0, rgba(112,58,230,0.08) 1px, transparent 1px, transparent 78px)",
      // Opposite diagonal lines
      "repeating-linear-gradient(-60deg, rgba(112,58,230,0.06) 0, rgba(112,58,230,0.06) 1px, transparent 1px, transparent 78px)",
      // Horizontal accent lines
      "repeating-linear-gradient(0deg, rgba(112,58,230,0.04) 0, rgba(112,58,230,0.04) 1px, transparent 1px, transparent 78px)",
    ].join(","),
    backgroundPosition: "center top",
    backgroundRepeat: "repeat",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEvmValid) return;
    setIsSubmitting(true);
    try {

      const [data,err] = await joinWaitlist(formData)
      if(err){
        throw err
      }

      if(data){
        alert("Thanks! You have been added to the waitlist.");
        navigate("/")
      }}
      catch (err){
        alert(err.message)
      } finally {
        setIsSubmitting(false);
      }
    } 

  return (
    <section className="relative w-full">
      {/* Subtle geometric background */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 -z-10"
        style={backgroundStyle}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 text-center">
        <div className="flex justify-center mb-6 sm:mb-8">
          <img
            src="/images/vannaLogo.svg"
            height={48}
            width={48}
            alt="Vanna logo"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-baseBlack dark:text-baseWhite">
          Be the First to get update by
          <br className="hidden sm:block" />
          Joining Our <span className="italic gradient-text">Waitlist!</span>
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
          Be first to experience Vanna. Join our waitlist for exclusive benefits
          and revolutionary trading platform
        </p>

        {/* Card */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div className="rounded-3xl p-[1.5px] bg-gradient-to-r from-[#F5ABA1] to-[#703AE6]">
            <div className="rounded-3xl bg-white/80 dark:bg-baseDark p-5 sm:p-6 lg:p-8 shadow-xl w-full max-w-xl text-left">
              <div className="text-center mb-4">
                <div className="bg-gradient-to-r from-[#F5ABA1] to-[#703AE6] bg-clip-text text-transparent font-semibold">
                  Join the waitlist
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  Sign up now for early notification upon launch.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  name="evmAddress"
                  value={formData.evmAddress}
                  onChange={handleChange}
                  placeholder="Your EVM Address (20 Points)"
                  className={`w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border transition-colors ${
                    isEvmValid
                      ? "border-transparent focus:border-purpleBG-light"
                      : "border-error focus:border-error"
                  }`}
                />

                <input
                  name="discordHandle"
                  value={formData.discordHandle}
                  onChange={handleChange}
                  placeholder="Discord Handle (5 Points)"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border border-transparent focus:border-purpleBG-light"
                />

                <input
                  name="xHandle"
                  value={formData.xHandle}
                  onChange={handleChange}
                  placeholder="X Handle (10 Points)"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border border-transparent focus:border-purpleBG-light"
                />

                <input
                  name="telegramHandle"
                  value={formData.telegramHandle}
                  onChange={handleChange}
                  placeholder="Telegram Handle (10 Points)"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border border-transparent focus:border-purpleBG-light"
                />

                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What do you think of Vanna?"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none resize-none border border-transparent focus:border-purpleBG-light"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !isEvmValid}
                  className="w-full rounded-xl py-3 text-sm sm:text-base font-semibold text-[#1a1a2e] dark:text-white bg-gradient-to-r from-[#F5ABA1] to-[#703AE6] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
