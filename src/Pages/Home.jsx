import React, { useState, useEffect, Suspense } from "react";
import Accordion from "../Components/Accordion";
import Button from "../Components/Button";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (typeof this.props.onError === "function") {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const Home = () => {
  const [selectedRole, setSelectedRole] = useState("lender"); // Default to lender
  const [isWebglSupported, setIsWebglSupported] = useState(false);
  const [splineFailed, setSplineFailed] = useState(false);

  const partners = [
    {
      name: "The Graph",
      icon: "/images/partnerLogos/thegraph.svg",
      link: "https://www.thegraph.com/",
    },
    {
      name: "Derive",
      icon: "/images/partnerLogos/derive.svg",
      link: "https://www.derive.xyz/",
    },
    {
      name: "Pivot",
      icon: "/images/partnerLogos/pivot.svg",
      link: "https://www.0xpivot.com/",
    },
    {
      name: "1 Inch",
      icon: "/images/partnerLogos/1inch.svg",
      link: "https://www.1inch.io/",
    },
    {
      name: "Optimism",
      icon: "/images/partnerLogos/optimism.svg",
      link: "https://www.optimism.io/",
    },
    {
      name: "Base",
      icon: "/images/partnerLogos/base.svg",
      link: "https://www.base.org/",
    },
    {
      name: "MUX",
      icon: "/images/partnerLogos/mux.svg",
      link: "https://www.mux.network/",
    },
    {
      name: "GMX",
      icon: "/images/partnerLogos/gmx.svg",
      link: "https://www.gmx.io/",
    },
    {
      name: "Premia",
      icon: "/images/partnerLogos/premia.svg",
      link: "https://www.premia.blue/ ",
    },
    {
      name: "Arbitrum",
      icon: "/images/partnerLogos/arbitrum.svg",
      link: "https://www.arbitrum.io/",
    },
    {
      name: "Perp",
      icon: "/images/partnerLogos/perp.svg",
      link: "https://www.perp.com/",
    },
    {
      name: "Spectral Labs",
      icon: "/images/partnerLogos/spectrallabs.svg",
      link: "https://www.spectrallabs.xyz/",
    },
  ];

  // Function to scroll to the selected section
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to track the section in view
  useEffect(() => {
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl");
        return !!gl;
      } catch (err) {
        return false;
      }
    };

    setIsWebglSupported(isWebGLAvailable());

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
      <section className="custom-container w-full pt-[60px] xl:pt-[140px] flex-col justify-start items-center gap-[80px] inline-flex">
        <div className="max-w-[950px] flex-col justify-start items-center gap-5 flex">
          <h1 className="text-3xl md:text-5xl font-bold md:leading-[60px] lg:leading-[70px] transition-all">
            Unlock <span className="text-primary">Major Liquidity </span>
            with LSTs and LRTs,{" "}
            <span className="text-primary">Trade Across Markets</span>, and{" "}
            <span className="text-primary">Hedge Smart</span> with Advanced
            Strategies
          </h1>
          <p className="text-sm lg:text-xl font-medium mb-4 text-[#76737B] px-2 lg:px-10">
            Vanna provides superior APYs for lenders and empowers traders with
            cross-market strategies using composable leverage and chain
            abstraction.
          </p>
          <div className="flex flex-col md:flex-row gap-[26px] justify-center items-center content-center mt-3.5">
            <Button
              className="rounded-[8px] flex gap-2.5 bg-[#F2ECFE] p-3 px-4"
              redirectTo="https://discord.gg/zwZGkNd3Fb"
            >
              <img src="/icons/discordLogo.svg" />
              <p className="text-base font-[600] text-primary">Join Discord</p>
            </Button>
            <Button
              className="gradient-button text-base font-semibold"
              redirectTo="/join-waitlist"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
        <div className="w-full">
          <img src="/images/heroImage.webp" className="block lg:hidden" />
          {isWebglSupported && !splineFailed ? (
            <SplineErrorBoundary onError={() => setSplineFailed(true)}>
              <Spline
                scene="https://prod.spline.design/IBk2UFq-Ep8YlEIb/scene.splinecode"
                className="hidden lg:block"
              />
            </SplineErrorBoundary>
          ) : (
            <img src="/images/heroImage.webp" className="hidden lg:block" />
          )}
        </div>
      </section>

      {/* Section 2 - Look Beyond Limits */}
      <section className="w-full bg-bgColor">
        <div className="custom-container mx-auto py-[100px] md:py-[140px] flex flex-col gap-20 items-center">
          <div className="max-w-[650px] h-[136px] flex flex-col gap-3 justify-center items-center">
            <h6 className="text-[#969B9C] text-base font-medium">
              Experience the Power of Vanna
            </h6>
            <h3 className="text-white text-3xl md:text-[40px] md:font-bold md:leading-[50px]">
              Look Beyond Limits
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-6 lg:grid-cols-8 gap-5 text-white">
              <div className="col-span-6 md:col-span-3 lg:col-span-5 border-style p-8 px-[27px] rounded-[24px] flex flex-col">
                <div className="order-2 md:order-1 text-start text-[24px]">
                  <h3>Amplify Your Margin Balance with Composable Leverage</h3>
                  <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                    Maximize your trading potential with undercollateralized
                    loans and allocate it across derivatives, spot, automated
                    vaults, yield strategies, and money markets.
                  </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center pb-5 md:p-0 md:pt-5 lg:p-4">
                  <img
                    src="/images/benefits/leverage.webp"
                    className="max-h-[298px] w-full object-contain rounded-2xl"
                  />
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-3 border-style flex flex-col justify-between p-8 px-[27px]">
                <div className="flex justify-center">
                  <img
                    src="/images/benefits/pool.webp"
                    className="w-full max-h-[180px] md:max-h-fit object-contain pb-6"
                  />
                </div>
                <div className="text-start text-[24px]">
                  <h3>Earn Superior Yields with Advanced Lending Pools</h3>
                  <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                    Our innovative lending pools offer higher yields than
                    traditional platforms, thanks to leveraged borrowing and
                    shared liquidation fees.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 lg:grid-cols-8 gap-5 text-white">
              <div className="col-span-6 md:col-span-3 lg:col-span-3 border-style flex flex-col p-8 px-[27px]">
                <div className="flex items-start justify-center">
                  <img
                    src="/images/benefits/borrow.webp"
                    className="w-full max-h-[180px] md:max-h-fit object-contain"
                  />
                </div>
                <div className="text-start text-[24px] mt-[32px]">
                  <h3>Leverage Your Assets with LSTs and LRTs</h3>
                  <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                    Unlock liquidity by using these assets as collateral to
                    borrow additional margin, maximizing capital efficiency
                    while keeping your assets actively in play.
                  </p>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-5 border-style p-8 px-[27px] flex flex-col gap-5">
                <div className="order-2 md:order-1 text-start text-[24px]">
                  <h3>Complete Control with the Greeks Dashboard</h3>
                  <p className="text-sm font-[400] text-[#B5B3B3] mt-[10px]">
                    Gain advanced insights into your positions with our Greeks
                    Dashboard, empowering you to make smarter, data-driven
                    decisions and manage your risk with precision.
                  </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center items-center ">
                  <img src="/images/benefits/chart.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-fit w-full flex flex-col">
        {/* Section 3 - Choose your Role */}
        <section className="custom-container pt-[100px] flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#181822] text-[36px] md:text-5xl md:font-bold md:leading-[60px]">
            Choose your Role
          </h3>
        </section>
        <div className="w-fit sticky top-[60px] mx-auto z-[200] p-1">
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
                className="md:max-w-[650px] w-full object-contain shadow rounded-2xl"
                src="/images/earnDetails.webp"
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
                  redirectTo="https://app.vanna.finance/earn"
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
                    src="/icons/wallet.svg"
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
                    src="/icons/explore.svg"
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
            <div className="p-5 bg-[#f2f2f2] rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="w-8 h-8 relative">
                  <img
                    src="/icons/supplyLiquidity.svg"
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
          </div>
        </div>

        {/* Section 5 - Trader Section */}

        {/* <div className={`${selectedRole === "trader" ? "order-1" : "order-2"} w-full bg-bgColor flex flex-col`}> */}
        <div id="trader" className="w-full bg-bgColor flex flex-col pb-36">
          <div className="custom-container pt-[100px] md:pt-[140px] pb-[100px] flex-col justify-start items-start gap-20 inline-flex">
            <div className="flex flex-col lg:flex-row justify-start items-center gap-20">
              <div className="order-2 lg:order-1 flex-col justify-start items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-8 flex">
                  <div className="flex-col justify-start items-start gap-2.5 flex">
                    <div className="flex-col justify-start items-start gap-2.5 flex">
                      <div className="text-white text-[40px] font-bold text-left leading-[50px]">
                        Multiply your Trading Power with Leveraged Borrowing
                      </div>
                      <div className="text-white text-xl font-normal text-left leading-normal">
                        Maximize trading limit with simple steps.
                      </div>
                    </div>
                  </div>
                  <div className="py-2 flex-col justify-start items-start gap-4 flex">
                    <div className="justify-start items-start gap-4 inline-flex">
                      <img src="/icons/cube.svg" className="w-4 h-4 relative" />
                      <div className="w-full flex flex-col">
                        <span className="text-white text-base font-medium text-left leading-tight">
                          Deposit Collateral
                        </span>
                        <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                          Securely provide your LSTs, LRTs, or native assets to
                          obtain an undercollateralized loan and boost your
                          trading capacity.
                        </span>
                      </div>
                    </div>
                    <div className="justify-start items-start gap-4 inline-flex">
                      <img src="/icons/cube.svg" className="w-4 h-4 relative" />
                      <div className="w-full flex flex-col">
                        <span className="text-white text-base font-medium text-left leading-tight">
                          Borrow with Leverage
                        </span>
                        <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                          Choose your leverage up to 10x and borrow instantly
                          against your collateral to increase your market
                          exposure across derivatives, spot, and other markets.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="px-6 py-3 rounded-md !border-l !border-r-4 !border-t !border-b-4 border-style justify-center items-center gap-2 inline-flex cursor-pointer"
                  redirectTo="https://app.vanna.finance/borrow"
                >
                  <div className="gradient-text text-base font-semibold leading-tight">
                    Borrow & Trade
                  </div>
                </Button>
              </div>
              <div className="order-1 lg:order-2 lg:w-full">
                <img
                  className="w-full object-contain rounded-[10px]"
                  src="/images/traders/borrow.webp"
                />
              </div>
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
          </div>
          <div className="px-10 flex-col xl:flex-row justify-start items-start gap-10 flex">
            <div className="flex flex-1 flex-col sm:flex-row xl:flex-col gap-10 items-start self-stretch justify-center order-2 xl:order-1">
              <div className="flex flex-1 p-5 items-start gap-4 rounded-2xl border border-white">
                <img src="/icons/cube.svg" className="w-4 h-4 relative" />
                <div className="w-full flex flex-col">
                  <span className="text-white text-base font-medium text-left leading-tight">
                    Multi-Leg Strategies & Payoff Graphs:
                  </span>
                  <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                    Build complex multi-leg options strategies like straddles
                    and spreads, visualized with real-time payoff graphs for
                    better strategy management.
                  </span>
                </div>
              </div>
              <div className="flex flex-1 p-5 items-start gap-4 rounded-2xl border border-white">
                <img src="/icons/cube.svg" className="w-4 h-4 relative" />
                <div className="w-full flex flex-col">
                  <span className="text-white text-base font-medium text-left leading-tight">
                    Live Position Simulation:
                  </span>
                  <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                    Monitor live simulations of your open options and futures
                    positions, with real-time profit/loss and payoff graphs to
                    dynamically adjust your strategies.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center self-stretch w-full xl:max-w-[650px] order-1">
              <img
                className="w-full object-contain rounded-2xl"
                src="/images/traders/dashboard.webp"
              />
            </div>
            <div className="flex flex-1 flex-col sm:flex-row xl:flex-col gap-10 items-start self-stretch justify-center order-3 xl:order-1">
              <div className="flex flex-1 p-5 items-start gap-4 rounded-2xl border border-white">
                <img src="/icons/cube.svg" className="w-4 h-4 relative" />
                <div className="w-full flex flex-col">
                  <span className="text-white text-base font-medium text-left leading-tight">
                    Real-Time Greeks Calculation:
                  </span>
                  <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                    Get instant insights into key Greeks (Delta, Gamma, Theta,
                    Vega, Rho) to understand how your positions react to market
                    changes, volatility, and time decay.
                  </span>
                </div>
              </div>
              <div className="flex flex-1 p-5 items-start gap-4 rounded-2xl border border-white">
                <img src="/icons/cube.svg" className="w-4 h-4 relative" />
                <div className="w-full flex flex-col">
                  <span className="text-white text-base font-medium text-left leading-tight">
                    Live PnL Tracking:
                  </span>
                  <span className="text-[#b5b3b3] text-base font-medium text-left leading-tight">
                    Track real-time profit and loss across individual options or
                    entire strategies, refining your hedging approaches to
                    maximize profitability.
                  </span>
                </div>
              </div>
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
          {partners.map((item, index) => (
            <div
              key={index}
              className="w-20 h-20 p-[12.50px] justify-center items-center flex"
            >
              <a href={item.link} target="_blank">
                <img
                  src={item.icon}
                  className="w-[55px] h-[55px] relative"
                  alt={item.name}
                  title={item.name}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
