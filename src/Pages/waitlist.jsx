"use client";

import React, { useEffect, useMemo, useState } from "react";

import { isLikelyEvmAddress } from "../lib/helper";
import { useNavigate } from "react-router-dom";
import Notification from "../Components/notification";
import { supabase } from "../lib/supabase";

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
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const isEvmValid = useMemo(
    () =>
      formData.evmAddress.length === 0
        ? true
        : isLikelyEvmAddress(formData.evmAddress),
    [formData.evmAddress]
  );

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  };

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

  const authenticateUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }

      const email = import.meta.env.VITE_SUPABASE_USER_EMAIL;
      const password = import.meta.env.VITE_SUPABASE_USER_PASSWORD;
      if (!email || !password) {
        addNotification(
          "error",
          "Something Went Wrong , Try Again Later"
        );
        return false;
      }

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      if (data?.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (err) {
      addNotification("error", "Something Went Wrong , Try Again Later");
      return false;
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEvmValid) return;

    console.log(isAuthenticated,user)

    setIsSubmitting(true);
    try {
      if (!isAuthenticated) {
        const ok = await authenticateUser();
        if (!ok) {
          throw new Error("Supabase user is not authenticated");
        }
      }
      console.log(isAuthenticated,user)
      const { data, error } = await supabase
        .from("waitlist")
        .insert([formData])
        .select();

      if (data && data.length > 0) {
        navigate("/thank-you");
      }

      if (error) {
        throw error;
      }
    } catch (err) {
      if (err?.code == "23505") {
        addNotification("error", "You're Already in Waitlist");
      } else {
        addNotification("error", "Something Went Wrong, Try Again Later");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  required
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
                  required
                  name="discordHandle"
                  value={formData.discordHandle}
                  onChange={handleChange}
                  placeholder="Discord Handle (5 Points)"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border border-transparent focus:border-purpleBG-light"
                />

                <input
                  required
                  name="xHandle"
                  value={formData.xHandle}
                  onChange={handleChange}
                  placeholder="X Handle (10 Points)"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border border-transparent focus:border-purpleBG-light"
                />

                <input
                  required
                  name="telegramHandle"
                  value={formData.telegramHandle}
                  onChange={handleChange}
                  placeholder="Telegram Handle (10 Points)"
                  className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-darkPurpleBG-lighter/40 text-sm outline-none border border-transparent focus:border-purpleBG-light"
                />

                <textarea
                  required
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
      <div className="fixed bottom-5 left-5 w-72">
        {notifications.map(({ id, type, message }) => (
          <Notification
            key={id}
            type={type}
            message={message}
            onClose={() => removeNotification(id)}
            duration={3000}
          />
        ))}
      </div>
    </section>
  );
}
