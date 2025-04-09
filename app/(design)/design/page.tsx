"use client";
import Image from "next/image";

import About from "@/app/(site)/components/about";
import Blog from "@/app/(site)/components/blog";
import Clients from "@/app/(site)/components/clients";
import Contact from "@/app/(site)/components/contact";
import Footer from "@/app/(site)/components/footer";
import Menu from "@/app/(site)/components/global/menu";
import Portfolio from "@/app/(site)/components/portfolio";
import Services from "@/app/(site)/components/services";
import Statistics from "@/app/(site)/components/statistics";
import Work from "@/app/(site)/components/work";

export default function page() {
  return (
    <div id="tbd-delete">
      <Menu />
      <div>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Clients />
        <Work />
        <Statistics />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

interface SocialMediaItem {
  id: string;
  icon: string;
  url: string;
}

function Hero() {
  const socialMedia: SocialMediaItem[] = [
    {
      id: "facebook",
      icon: "bx bxl-facebook-square",
      url: "https://facebook.com",
    },
    {
      id: "twitter",
      icon: "bx bxl-twitter",
      url: "https://x.com/andyfarmer0676",
    },
    { id: "linkedin", icon: "bx bxl-linkedin", url: "https://linkedin.com" },
    {
      id: "instagram",
      icon: "bx bxl-instagram",
      url: "https://instagram.com/",
    },
  ];
  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-8"
        style={{ backgroundImage: "url(/assets/img/bg-desk.jpeg)" }}
      >
        <div className="from-hero-gradient-from to-hero-gradient-to absolute inset-0 z-20 bg-gradient-to-r bg-cover bg-center bg-no-repeat"></div>
        <div className="relative z-30 container pt-20 pb-12 sm:pt-56 sm:pb-48 lg:pt-64 lg:pb-48">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="border-primary rounded-full border-8 shadow-xl">
              <Image
                src="/static/gravatar/DSC02400sml.jpg"
                className="rounded-full"
                alt="author"
                width={224}
                height={224}
              />
            </div>
            <div className="pt-8 sm:pt-10 lg:pt-0 lg:pl-8">
              <h1 className="font-header text-center text-4xl text-white sm:text-left sm:text-5xl md:text-6xl">
                {" "}
                Hey I am Andy Farmer!
              </h1>
              <div className="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start">
                <div className="flex items-center justify-center pl-0 sm:justify-start md:pl-1">
                  <p className="font-body text-lg text-white uppercase">
                    Let&apos;s connect
                  </p>
                  <div className="hidden sm:block">
                    <i className="bx bx-chevron-right text-yellow text-3xl"></i>
                  </div>
                </div>
                {/* looop through socialMedia */}
                <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
                  {socialMedia &&
                    socialMedia.map((socail, key) => (
                      <a
                        key={key}
                        href={socail.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pl-4"
                      >
                        <i
                          className={`hover:text-yellow text-2xl ${socail.icon}`}
                        ></i>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
