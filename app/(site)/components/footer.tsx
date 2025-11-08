import {
  TiSocialFacebook,
  TiSocialGithub,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
} from "react-icons/ti";

export default function Footer() {
  type SocialMediaItem = {
    id: string;
    name: string;
    url: string;
  };

  // TODO: Move to sanity or static file as shared in about component
  const socialMedia: SocialMediaItem[] = [
    {
      id: "linkedIn",
      name: "TiSocialLinkedin",
      url: "https://www.linkedin.com/in/andyfarmer0676/",
    },
    {
      id: "github",
      name: "TiSocialGithub",
      url: "https://github.com/andyfarmerTUISHG",
    },
    {
      id: "facebook",
      name: "TiSocialFacebook",
      url: "https://www.facebook.com/andyfarmer76/",
    },
    {
      id: "twitter",
      name: "TiSocialTwitter",
      url: "https://x.com/andyfarmer0676",
    },
    {
      id: "instagram",
      name: "TiSocialInstagram",
      url: "https://www.instagram.com/akf0676/",
    },
  ];

  const iconComponents = {
    TiSocialFacebook,
    TiSocialTwitter,
    TiSocialInstagram,
    TiSocialLinkedin,
    TiSocialGithub,
  };

  return (
    <footer className="bg-primary">
      <div className="container flex flex-col justify-between py-6 sm:flex-row">
        <p className="font-body text-center text-white md:text-left">
          {" "}
          © Copyright
          {" "}
          {new Date().getFullYear()}
          {" "}
          Built with
          {" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.Js
          </a>
          . All right reserved, Andy Farmer.
          {" "}
        </p>
        <div className="flex items-center justify-center pt-5 sm:justify-start sm:pt-0">
          {socialMedia?.map((social) => {
            const Icon = iconComponents[social.name];
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-4"
              >
                <Icon className="hover:text-yellow text-2xl" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
