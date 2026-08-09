type SocialMediaItem = {
  id: string;
  icon: string;
  url: string;
};

export default function About() {
  // TODO: Move to Sanity or static file as shared with footer
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
            Who am I?
          </h2>
          <h4 className="font-header pt-6 text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            {" "}
            I&apos;m Andy Farmer, a Software Engineering Manager & Web Developer
          </h4>
          <p className="font-body text-grey-20 pt-6 leading-relaxed">
            I’m an Engineering Manager with more than 20 years’ experience in software engineering and technology, much of it spent leading teams that build and run customer-facing digital products.
          </p>
          <p className="font-body text-grey-20 pt-6 leading-relaxed">
            I started out as a developer, so I still think like an engineer. I enjoy getting into the detail, understanding how things work, and solving problems — but these days I’m equally interested in helping people and teams do their best work. My focus is on creating an environment where engineers have the clarity, trust and autonomy to make good decisions and take ownership.
          </p>
          <p className="font-body text-grey-20 pt-6 leading-relaxed">
            I’m a pragmatic technologist. I care about good engineering practices, but I also believe technology exists to solve business and customer problems. Whether that’s improving delivery, modernising systems, introducing better ways of working, or simply making a complicated problem easier to understand, I’m happiest when technology and people come together to make something better.
          </p>
          <p className="font-body text-grey-20 pt-6 leading-relaxed">

            I’m particularly interested in how we can use AI to change the way software is built and maintained — not just to write code faster, but to help teams understand systems, ask better questions and make better decisions.
          </p>
          <p className="font-body text-grey-20 pt-6 leading-relaxed">
            Outside of work, I’m usually thinking about technology anyway, or finding an excuse to build something, play a game, watch a film or get out with the dog.
          </p>
          <div className="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start">
            <div className="flex items-center justify-center sm:justify-start">
              <p className="font-body text-grey-20 text-lg font-semibold uppercase">
                Connect with me
              </p>
              <div className="hidden sm:block">
                <i className="bx bx-chevron-right text-primary text-2xl"></i>
              </div>
            </div>
            <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
              {socialMedia
                && socialMedia.map(social => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pl-4"
                  >
                    <i
                      className={`bx text-primary hover:text-yellow text-2xl${social.icon}`}
                    >
                    </i>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full pt-10 pl-0 sm:w-3/4 lg:w-2/5 lg:pt-0 lg:pl-12">
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                Engineering Leadership
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">90%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "90%" }}
              >
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                Agile &amp; Continuous Improvement 
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">90%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "91%" }}
              >
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                {" "}
                HTML & CSS
                {" "}
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">85%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "85%" }}
              >
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                {" "}
                Javascript / React / Node / Typescript
                {" "}
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">80%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "80%" }}
              >
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                {" "}
                DevOps &amp; CI/CD
                {" "}
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">80%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "80%" }}
              >
              </div>
            </div>
          </div>          
            <div className="pt-6">
            <div className="flex items-end justify-between">
              <h4 className="font-body font-semibold text-black uppercase">
                {" "}
                AI / AI-assisted Development
                {" "}
              </h4>
              <h3 className="font-body text-primary text-3xl font-bold">75%</h3>
            </div>
            <div className="bg-lila mt-2 h-3 w-full rounded-full">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: "75%" }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
