import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  const backgroundStyle = {
    height: "50vh",
    backgroundImage: [
      "repeating-linear-gradient(60deg, rgba(112,58,230,0.08) 0, rgba(112,58,230,0.08) 1px, transparent 1px, transparent 78px)",
      "repeating-linear-gradient(-60deg, rgba(112,58,230,0.06) 0, rgba(112,58,230,0.06) 1px, transparent 1px, transparent 78px)",
      "repeating-linear-gradient(0deg, rgba(112,58,230,0.04) 0, rgba(112,58,230,0.04) 1px, transparent 1px, transparent 78px)",
    ].join(","),
    backgroundPosition: "center top",
    backgroundRepeat: "repeat",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
  };

  return (
    <section className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 -z-10"
        style={backgroundStyle}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center">
        <div className="flex justify-center mb-6 sm:mb-8">
          <img
            src="/images/vannaLogo.svg"
            height={48}
            width={48}
            alt="Vanna logo"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-baseBlack dark:text-baseWhite">
          Thanks for joining{" "}
          <span className="italic gradient-text">Vanna</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
          You're on the list. We'll keep you posted with the latest updates.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-xl py-3 px-6 text-sm sm:text-base font-semibold text-[#1a1a2e] dark:text-white bg-gradient-to-r from-[#F5ABA1] to-[#703AE6]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
