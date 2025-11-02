import Image from "next/image";

export default function Work() {
  return (
    <div className="container py-16 md:py-20" id="work">
      <h2 className="font-header text-primary text-center text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl">
        {" "}
        My work experience
        {" "}
      </h2>
      <h3 className="font-header pt-6 text-center text-xl font-medium text-black sm:text-2xl lg:text-3xl">
        {" "}
        Here&apos;s what I did before freelancing
        {" "}
      </h3>
      <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
        <span className="bg-grey-40 absolute inset-y-0 left-2/5 ml-10 hidden w-0.5 md:block"></span>
        <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
          <div className="md:w-2/5">
            <div className="flex justify-center md:justify-start">
              <span className="shrink-0">
                <Image
                  src="/assets/img/logo-spotify.svg"
                  className="h-auto w-32"
                  alt="company logo"
                  width={224}
                  height={224}
                />
              </span>
              <div className="relative ml-3 hidden w-full md:block">
                <span className="bg-grey-70 absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform"></span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="relative flex md:pl-18">
              <span className="border-grey-40 absolute top-1 left-8 hidden h-4 w-4 rounded-full border-2 bg-white md:block"></span>
              <div className="mt-1 flex">
                <i className="bx bxs-right-arrow text-primary hidden md:block"></i>
                <div className="md:-mt-1 md:pl-8">
                  <span className="font-body text-grey-40 block font-bold">
                    Apr 2015 - Mar 2018
                  </span>
                  <span className="font-header text-primary block pt-2 text-xl font-bold uppercase">
                    Frontend Developer
                  </span>
                  <div className="pt-2">
                    <span className="font-body block text-black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum mattis felis vitae risus pulvinar tincidunt.
                      Nam ac venenatis enim.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
          <div className="md:w-2/5">
            <div className="flex justify-center md:justify-start">
              <span className="shrink-0">
                <Image
                  src="/assets/img/logo-microsoft.svg"
                  className="h-auto w-32"
                  alt="company logo"
                  width={224}
                  height={224}
                />
              </span>
              <div className="relative ml-3 hidden w-full md:block">
                <span className="bg-grey-70 absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform"></span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="relative flex md:pl-18">
              <span className="border-grey-40 absolute top-1 left-8 hidden h-4 w-4 rounded-full border-2 bg-white md:block"></span>
              <div className="mt-1 flex">
                <i className="bx bxs-right-arrow text-primary hidden md:block"></i>
                <div className="md:-mt-1 md:pl-8">
                  <span className="font-body text-grey-40 block font-bold">
                    Mar 2018 - September 2019
                  </span>
                  <span className="font-header text-primary block pt-2 text-xl font-bold uppercase">
                    Software Engineer
                  </span>
                  <div className="pt-2">
                    <span className="font-body block text-black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum mattis felis vitae risus pulvinar tincidunt.
                      Nam ac venenatis enim.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
          <div className="md:w-2/5">
            <div className="flex justify-center md:justify-start">
              <span className="shrink-0">
                <Image
                  src="/assets/img/logo-fedex.svg"
                  className="h-auto w-32"
                  alt="company logo"
                  width={224}
                  height={224}
                />
              </span>
              <div className="relative ml-3 hidden w-full md:block">
                <span className="bg-grey-70 absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform"></span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="relative flex md:pl-18">
              <span className="border-grey-40 absolute top-1 left-8 hidden h-4 w-4 rounded-full border-2 bg-white md:block"></span>
              <div className="mt-1 flex">
                <i className="bx bxs-right-arrow text-primary hidden md:block"></i>
                <div className="md:-mt-1 md:pl-8">
                  <span className="font-body text-grey-40 block font-bold">
                    October 2019 - Feb 2021
                  </span>
                  <span className="font-header text-primary block pt-2 text-xl font-bold uppercase">
                    DevOps Engineer
                  </span>
                  <div className="pt-2">
                    <span className="font-body block text-black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum mattis felis vitae risus pulvinar tincidunt.
                      Nam ac venenatis enim.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
