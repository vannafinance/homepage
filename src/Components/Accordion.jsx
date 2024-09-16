import React, { useState } from 'react';
import Button from './Button';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionData = [
    {
      title: 'Futures',
      content: [
        { detail: '1. Advanced Hedge Mode', description: 'Protect futures trades on both sides.' },
        { detail: '2. Cross-Chain Access', description: 'Trade on multiple platforms with top liquidity.' }
      ],
      tryNowRedirectTo: '/',
      imgSrc: '/assets/images/traders/futures.webp',
    },
    {
      title: 'Options',
      content: [
        { detail: '1. Flexible Strategies', description: 'Customize your options trades for any market scenario.' },
        { detail: '2. Platform Choice', description: 'Trade across multiple options platforms with diverse assets.' }
      ],
      tryNowRedirectTo: '/',
      imgSrc: '/assets/images/traders/option.webp',
    },
    {
      title: 'Spot',
      content: [
        { detail: '1. Instant Execution', description: 'Customize your options trades for any market scenario.' },
        { detail: '2. Cross-Chain Trading', description: 'Trade across multiple options platforms with diverse assets.' }
      ],
      tryNowRedirectTo: '/',
      imgSrc: '/assets/images/traders/spot.webp',
    }
  ];

  const toggleItem = (index) => {
    setOpenIndex(index);
  };

  return (
    <div className="custom-container py-[80px] md:py-[100px] flex-col justify-start items-center gap-20 inline-flex">
      <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-20 flex-wrap">
        <img className="md:max-w-[600px] w-full object-contain" src={accordionData[openIndex].imgSrc} />
        <div className="flex-1 py-2 justify-start items-start flex flex-col gap-8 w-full text-white">
          {accordionData.map((item, index) => (
            <div key={index} className={`w-full lg:w-fit max-w-[360px] pl-5 border-l-4 flex flex-col gap-6 ${openIndex === index ? "border-[#9064e0]" : "border-transparent"}`}>
              <div
                className="w-full justify-start items-start gap-6 inline-flex cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                <div className="flex-1 md:min-w-[280px] flex-col justify-start items-start gap-7 inline-flex">
                  <div
                    className="w-full justify-start items-center gap-4 inline-flex"
                  >
                    <div className={`${openIndex !== index ? "text-[#8D8896]" : "text-[#9064e0]"} text-2xl font-bold leading-[33.60px] text-left`}>{item.title}</div>
                  </div>
                </div>
                {
                  openIndex === index
                    ? <img src='/assets/icons/upArrow.svg' className="w-8 h-8" />
                    : <img src='/assets/icons/downArrow.svg' className="w-8 h-8" />
                }
              </div>
              {openIndex === index && (
                <div className='flex flex-col gap-6'>
                  <div className="flex-col justify-start items-start gap-4 flex">
                    {
                      item.content.map((elm, index) => (
                        <div key={index} className="h-fit flex-col justify-start items-start gap-1.5 flex">
                          <div className="text-white text-base font-semibold leading-tight text-left">{elm.detail}</div>
                          <div className="text-[#b5b3b3] text-base font-normal leading-tight text-left">{elm.description}</div>
                        </div>
                      ))
                    }
                  </div>
                  <Button
                    className="w-fit p-2.5 rounded-[10px] border-style justify-center items-center gap-2 inline-flex cursor-pointer"
                    redirectTo={item.tryNowRedirectTo}
                  >
                    <div className="gradient-text text-base font-semibold leading-tight">Trade now</div>
                    <img src="/assets/icons/arrow.svg" className="w-5 h-5 relative" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Accordion;