interface SocialMediaItem {
  id: string;
  icon: string;
  url: string;
}

export default function About() {
  const socialMedia: SocialMediaItem[] = [
    {
      id: "facebook",
      icon: "bx bxl-facebook-square",
      url: "https://www.facebook.com/andyfarmer76/",
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
      url: "https://www.instagram.com/akf0676/",
    },
  ];

  return (
    <div className="bg-grey-50" id="about">
      <div className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
        <div className="w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left">
          <h2 className="font-header text-primary text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl">
            {" "}
            Who am I?{" "}
          </h2>
          <h4 className="font-header pt-6 text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            {" "}
            I&apos;m Andy Farmer, a Software Engineering Manager & Web Developer
          </h4>
          <p className="font-body text-grey-20 pt-6 leading-relaxed">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
          </p>
          <div className="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start">
            <div className="flex items-center justify-center sm:justify-start">
              <p className="font-body text-grey-20 text-lg font-semibold uppercase">
                {" "}
                Connect with me{" "}
              </p>
              <div className="hidden sm:block">
                <i className="bx bx-chevron-right text-primary text-2xl"></i>
              </div>
            </div>
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
                      className={`bx text-primary hover:text-yellow text-2xl${socail.icon}`}
                    ></i>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full pt-10 pl-0 sm:w-3/4 lg:w-2/5 lg:pt-0 lg:pl-12">
          <div>
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                {" "}
                HTML & CSS{" "}
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">85%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                Python
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">70%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                {" "}
                Javascript{" "}
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">98%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "98%" }}
              ></div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                Figma
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">91%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "91%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
