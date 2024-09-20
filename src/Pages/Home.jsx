import React, { useState, useEffect, Suspense } from "react";
import Accordion from "../Components/Accordion";
import Button from "../Components/Button";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const Home = () => {
  const [selectedRole, setSelectedRole] = useState("lender"); // Default to lender

  // Function to scroll to the selected section
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to track the section in view
  useEffect(() => {
    const handleScroll = () => {
      const lenderSection = document.getElementById("lender");
      const traderSection = document.getElementById("trader");

      const lenderRect = lenderSection.getBoundingClientRect();
      const traderRect = traderSection.getBoundingClientRect();

      // Check if the lender section is in view
      if (
        lenderRect.top <= window.innerHeight / 2 &&
        lenderRect.bottom >= window.innerHeight / 2
      ) {
        setSelectedRole("lender");
      }

      // Check if the trader section is in view
      if (
        traderRect.top <= window.innerHeight / 2 &&
        traderRect.bottom >= window.innerHeight / 2
      ) {
        setSelectedRole("trader");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-x-0 border-primary"></div>
          </div>
        </div>
      }
    >
      {/* Section 1 - Hero Section */}
      <section className="custom-container w-full pt-[60px] md:pt-[50px] flex-col justify-start items-center gap-[50px] inline-flex">
        <div className="max-w-[650px] flex-col justify-start items-center gap-5 flex">
          <h1 className="text-[32px] md:text-[48px] font-bold md:leading-[60px] lg:leading-[70px] transition-all">
            Trade Big, Hedge Smart with
            <span className="text-primary px-3">Minimal Collateral</span>&
            Advance Strategies
          </h1>
          <p className="text-[14px] lg:text-[16px] text-neutral-500 mb-4">
            Vanna provides superior APYs for lenders and empowers traders with
            cross-market strategies using composable leverage and chain
            abstraction
          </p>
          <div className="flex flex-col md:flex-row gap-[26px] justify-center items-center content-center mt-3.5">
            <Button
              className="rounded-[8px] flex gap-2.5 bg-[#F2ECFE] p-3 px-4"
              redirectTo="https://discord.gg/x3VHkx8A"
              shouldOpenInNewTab
            >
              <img src="/assets/icons/discordLogo.svg" />
              <p className="text-[16px] font-[600] text-primary">
                Join Discord
              </p>
            </Button>
            <Button
              className="gradient-button text-base font-semibold"
              redirectTo="https://app.vannafinance.xyz/"
              shouldOpenInNewTab
            >
              Launch VANNA
            </Button>
          </div>
        </div>
        <div className="w-full">
          <img
            src="/assets/images/heroImage.webp"
            className="block lg:hidden"
          />
          <Spline
            scene="https://prod.spline.design/IBk2UFq-Ep8YlEIb/scene.splinecode"
            className="hidden lg:block"
          />
        </div>
      </section>

      {/* Section 2 - Look Beyond Limits */}
      <section className="w-full bg-bgColor">
        <div className="custom-container mx-auto py-[100px] md:py-[140px] flex flex-col gap-20 items-center">
          <div className="max-w-[650px] h-[136px] flex flex-col gap-3 justify-center items-center">
            <h6 className="text-[#969B9C] text-base font-medium">
              Introducing Vanna’s Benefit
            </h6>
            <h3 className="text-white text-[32px] md:text-[40px] md:font-bold md:leading-[50px]">
              Look Beyond Limits
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-6 gap-5 text-white">
              <div className="col-span-6 md:col-span-3 lg:col-span-4 border-style p-8 px-[27px] flex flex-col gap-5 md:gap-[60px]">
                <div className="order-2 md:order-1 text-start text-[24px]">
                  <h3>Complete Control with the Greeks Dashboard</h3>
                  <p className="text-[14px] font-[400] text-[#B5B3B3] mt-[10px]">
                    Our Greek dashboard gives traders advanced insights into
                    their positions, enabling you to make informed decisions
                    while managing your risk efficiently.
                  </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center items-center pb-5 md:pb-10">
                  <img src="/assets/images/benefits/chart.webp" />
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-2 border-style flex flex-col justify-between p-8 px-[27px]">
                <div className="flex justify-center">
                  <img
                    src="/assets/images/benefits/pool.webp"
                    className="w-full max-h-[180px] md:max-h-fit object-contain pb-6"
                  />
                </div>
                <div className="text-start text-[24px]">
                  <h3>Optimized Earning Opportunities for Lenders</h3>
                  <p className="text-[14px] font-[400] text-[#B5B3B3] mt-[10px]">
                    Invest in a range of pools, each designed to offer
                    competitive returns and diverse options to suit different
                    risk appetites.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-5 text-white">
              <div className="col-span-6 md:col-span-3 lg:col-span-2 border-style flex flex-col p-8 px-[27px]">
                <div className="flex-1 flex items-start justify-center">
                  <img
                    src="/assets/images/benefits/cardHolding.webp"
                    className="w-full max-h-[180px] md:max-h-fit object-contain"
                  />
                </div>
                <div className="text-start text-[24px] mt-[32px]">
                  <h3>Seamless Overview for Both Lenders & Traders</h3>
                  <p className="text-[14px] font-[400] text-[#B5B3B3] mt-[10px]">
                    Manage all your financial activities from a single overview
                    page, giving you total visibility and control over your
                    investments and trades.
                  </p>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-4 border-style p-8 px-[27px] rounded-[24px] flex flex-col">
                <div className="order-2 md:order-1 text-start text-[24px]">
                  <h3>Amplified Trading with Composable Leverage</h3>
                  <p className="text-[14px] font-[400] text-[#B5B3B3] mt-[10px]">
                    Borrow up to 10x leverage and use your margin balance to
                    trade derivatives with up to 100x leverage. Vanna empowers
                    you to expand your market positions and maximize returns
                    across multiple trading products
                  </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center pb-5 md:p-0 md:pt-5 lg:p-4">
                  <img
                    src="/assets/images/benefits/leverage.webp"
                    className="max-h-[298px] w-full object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-fit w-full flex flex-col">
        {/* Section 3 - Choose your Role */}
        <section className="custom-container pt-[100px] flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#181822] text-[36px] md:text-[48px] md:font-bold md:leading-[60px]">
            Choose your Role
          </h3>
        </section>
        <div className="w-fit sticky top-[60px] mx-auto z-[200] p-7">
          <div className="bg-[#181822] p-2.5 flex gap-2 justify-center items-center rounded-[14px]">
            <div
              className={`w-[120px] md:w-[220px] py-3 flex justify-center items-center border ${
                selectedRole === "lender"
                  ? "text-[#181822] border-white-style"
                  : "text-white bg-transparent border-transparent"
              } font-semibold text-base rounded-[10px] transition-all cursor-pointer`}
              onClick={() => {
                scrollToElement("lender");
                setTimeout(() => {
                  setSelectedRole("lender"); // Delay the role change
                }, 450);
              }}
            >
              Lender
            </div>
            <div
              className={`w-[120px] md:w-[220px] py-3 flex justify-center items-center border ${
                selectedRole === "trader"
                  ? "text-[#181822] border-white-style"
                  : "text-white bg-transparent border-transparent"
              } font-semibold text-base rounded-[10px] transition-all cursor-pointer`}
              onClick={() => {
                scrollToElement("trader");
                setTimeout(() => {
                  setSelectedRole("trader"); // Delay the role change
                }, 500);
              }}
            >
              Trader
            </div>
          </div>
        </div>

        {/* Section 4 - Lender Section */}

        {/* <div className={`${selectedRole === "lender" ? "order-1" : "order-2"} custom-container w-full flex flex-col`}> */}
        <div id="lender" className="custom-container w-full flex flex-col">
          <div className="w-full">
            <div className="w-full py-[50px] md:py-[100px] flex justify-center items-center gap-10 flex-col lg:flex-row">
              <img
                className="md:max-w-[650px] w-full object-contain shadow"
                src="/assets/images/earn.webp"
              />
              <div className="flex-col justify-center items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-2.5 flex">
                  <div className="text-left text-[#181822] text-[40px] font-bold leading-[50px]">
                    Lend and Grow with Vanna
                  </div>
                  <div className="text-left text-[#636060] text-xl font-normal leading-normal">
                    Maximize your returns by supplying liquidity to our secure
                    crypto pools.
                  </div>
                </div>
                <Button
                  className="px-6 py-3 rounded-md !border-l !border-r-4 !border-t !border-b-4 border-white-style justify-center items-center gap-2 inline-flex cursor-pointer"
                  redirectTo="/"
                >
                  <div className="gradient-text text-base font-semibold leading-tight">
                    Start Earning Now
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full pb-[100px] flex flex-col lg:flex-row justify-center items-start gap-7">
            <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="w-8 h-8 relative">
                  <img
                    src="/assets/icons/wallet.svg"
                    className="w-8 h-8 left-0 top-0 absolute"
                  />
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-[#201c1c] text-base font-semibold leading-snug">
                    Connect your Wallet
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start flex">
                <div className="text-[#636060] text-base font-medium leading-tight text-left">
                  Start by connecting your preferred crypto wallet. This allows
                  you to access the platform and manage your investments
                  seamlessly.
                </div>
              </div>
            </div>
            <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="w-8 h-8 relative">
                  <img
                    src="/assets/icons/supplyLiquidity.svg"
                    className="w-8 h-8 left-0 top-0 absolute"
                  />
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-[#201c1c] text-base font-semibold leading-snug">
                    Supply Liquidity
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start flex">
                <div className="text-[#636060] text-base font-medium leading-tight text-left">
                  Deposit your chosen asset into the pool. This instantly begins
                  generating rewards, and you can track your earnings in real
                  time.
                </div>
              </div>
            </div>
            <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="w-8 h-8 relative">
                  <img
                    src="/assets/icons/explore.svg"
                    className="w-8 h-8 left-0 top-0 absolute"
                  />
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-[#201c1c] text-base font-semibold leading-snug">
                    Explore and Choose pool
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start flex">
                <div className="text-[#636060] text-base font-medium leading-tight text-left">
                  Browse our available pools across various assets. Choose the
                  one that fits your strategy and view detailed stats like APY
                  and pool size.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 - Trader Section */}

        {/* <div className={`${selectedRole === "trader" ? "order-1" : "order-2"} w-full bg-bgColor flex flex-col`}> */}
        <div id="trader" className="w-full bg-bgColor flex flex-col">
          <div className="custom-container pt-[100px] md:pt-[140px] pb-[100px] flex-col justify-start items-start gap-20 inline-flex">
            <div className="flex flex-col lg:flex-row justify-start items-center gap-20">
              <div className="order-2 lg:order-1 flex-col justify-start items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-8 flex">
                  <div className="flex-col justify-start items-start gap-2.5 flex">
                    <div className="flex-col justify-start items-start gap-2.5 flex">
                      <div className="text-white text-[40px] font-bold text-left leading-[50px]">
                        Multiply Your Potential with Leverage
                      </div>
                      <div className="text-white text-xl font-normal text-left leading-normal">
                        Maximize trading limit with simple steps.
                      </div>
                    </div>
                  </div>
                  <div className="py-2 flex-col justify-start items-start gap-4 flex">
                    <div className="justify-start items-start gap-4 inline-flex">
                      <img
                        src="/assets/icons/cube.svg"
                        className="w-4 h-4 relative"
                      />
                      <div className="w-full flex flex-col">
                        <span className="text-white text-base font-medium text-left leading-tight">
                          Deposit Collateral
                        </span>
                        <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                          Securely deposit your crypto as collateral to start
                          borrowing with leverage.
                        </span>
                      </div>
                    </div>
                    <div className="justify-start items-start gap-4 inline-flex">
                      <img
                        src="/assets/icons/cube.svg"
                        className="w-4 h-4 relative"
                      />
                      <div className="w-full flex flex-col">
                        <span className="text-white text-base font-medium text-left leading-tight">
                          Borrow with Leverage:
                        </span>
                        <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                          Choose your leverage amount and borrow against your
                          collateral instantly.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="px-6 py-3 rounded-md !border-l !border-r-4 !border-t !border-b-4 border-style justify-center items-center gap-2 inline-flex cursor-pointer"
                  redirectTo="/"
                >
                  <div className="gradient-text text-base font-semibold leading-tight">
                    Borrow & Trade
                  </div>
                </Button>
              </div>
              <img
                className="order-1 lg:order-2 md:max-w-[650px] w-full object-contain rounded-[10px]"
                src="/assets/images/traders/borrow.webp"
              />
            </div>
          </div>

          <Accordion />

          <div className="custom-container pt-[100px] pb-[140px] flex-col justify-center items-center gap-20 inline-flex">
            <div className="max-w-[650px] flex-col justify-center items-center gap-5 flex">
              <div className="text-white text-[40px] font-bold leading-[50px]">
                Greeks Dashboard
              </div>
              <div className="text-center text-[#9f9c9c] text-base font-normal leading-normal">
                Track and manage your risk with real-time Greeks data. Optimize
                your options and futures positions to align with your trading
                strategies and market conditions
              </div>
            </div>
            <div className="p-[9.23px] bg-white rounded-[18.47px] border border-white flex-col justify-start items-start gap-[9.23px] flex">
              <img
                className="md:max-w-[900px] w-full object-contain"
                src="/assets/images/dashboard.webp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 -  Vanna Ecosystem Partner */}
      <div className="custom-container py-[100px] md:py-[140px] flex-col justify-start items-center gap-10 inline-flex">
        <div className="pb-4 flex-col justify-start items-start flex">
          <div>
            <span className="text-[#7b44e1] text-4xl font-semibold leading-10">
              Vanna
            </span>
            <span className="text-black text-4xl font-semibold leading-10">
              {" "}
              Ecosystem Partner
            </span>
          </div>
        </div>
        <div className="max-w-[680px] w-full flex justify-center items-center gap-10 flex-wrap">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="w-20 h-20 p-[12.50px] justify-center items-center flex"
            >
              <img
                src={`/assets/images/partnerLogos/partnerLogo${index + 1}.svg`}
                className="w-[55px] h-[55px] relative"
              />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
