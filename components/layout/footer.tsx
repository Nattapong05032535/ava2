"use client";

import { FOOTER_SECTIONS } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5] pt-12 pb-24 w-full mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-[#e5e5e5]">
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
              <h3 className="text-[16px] font-bold text-black mb-5">{section.title}</h3>
              <ul className="flex flex-col gap-3.5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-[13px] text-[#555] hover:text-black transition-colors block leading-snug"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              {section.title2 && (
                <>
                  <h3 className="text-[16px] font-bold text-black mb-5 mt-10">{section.title2}</h3>
                  <ul className="flex flex-col gap-3.5">
                    {section.links2?.map((link, i) => (
                      <li key={i}>
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()}
                          className="text-[13px] text-[#555] hover:text-black transition-colors block leading-snug"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
