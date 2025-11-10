import {
  TiSocialFacebook,
  TiSocialGithub,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
} from "react-icons/ti";

import { loadProfile } from "@/sanity/loader/load-query";

import ProfileImage from "./profile-image";

type SocialMediaItem = {
  id: string;
  name: string;
  url: string;
};
// TODO: Extract or move to sanity
const socialMedia: SocialMediaItem[] = [
  {
    id: "linkedIN",
    name: "TiSocialLinkedin",
    url: "https://www.linkedin.com/in/andyfarmer0676/",
  },
  {
    id: "github",
    name: "TiSocialGithub",
    url: "https://github.com/andyfarmerTUISHG",
  },
  { id: "facebook", name: "TiSocialFacebook", url: "https://www.facebook.com/andyfarmer76/" },
  { id: "twitter", name: "TiSocialTwitter", url: "https://x.com/andyfarmer0676" },
  { id: "instagram", name: "TiSocialInstagram", url: "https://www.instagram.com/akf0676/" },
];

const iconComponents = {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialGithub,
};

export default async function ProfileComponent() {
  const { data: profile } = await loadProfile();

  if (!profile)
    return null;

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
              <ProfileImage
                src="/static/gravatar/DSC02400sml.jpg"
                className="rounded-full"
                alt="author"
                width={224}
                height={224}
              />
            </div>
            <div className="pt-8 sm:pt-10 lg:pt-0 lg:pl-8">
              <h1 className="font-header text-center text-4xl text-white sm:text-left sm:text-5xl md:text-6xl">
                Hey I am
                {" "}
                {profile?.[0]?.fullName}
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
                <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
