export default function Blog() {
  return (
    <div className="bg-grey-50" id="blog">
      <div className="container py-16 md:py-20">
        <h2 className="font-header text-primary text-center text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl">
          {" "}
          I also like to write
          {" "}
        </h2>
        <h4 className="font-header pt-6 text-center text-xl font-medium text-black sm:text-2xl lg:text-3xl">
          {" "}
          Check out my latest posts!
          {" "}
        </h4>
        <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
          <a href="/post" className="shadow">
            <div
              style={{ backgroundImage: "url(/assets/img/post-01.png)" }}
              className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
            >
              <span className="from-blog-gradient-from to-blog-gradient-to absolute inset-0 block bg-gradient-to-b bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
              <span className="font-body absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center text-sm font-bold text-white uppercase md:text-base">
                Read More
              </span>
            </div>
            <div className="bg-white px-5 py-6 xl:py-8">
              <span className="font-body block text-lg font-semibold text-black">
                How to become a frontend developer
              </span>
              <span className="font-body text-grey-20 block pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </div>
          </a>
          <a href="/post" className="shadow">
            <div
              style={{ backgroundImage: "url(/assets/img/post-02.png)" }}
              className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
            >
              <span className="from-blog-gradient-from to-blog-gradient-to absolute inset-0 block bg-gradient-to-b bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
              <span className="font-body absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center text-sm font-bold text-white uppercase md:text-base">
                Read More
              </span>
            </div>
            <div className="bg-white px-5 py-6 xl:py-8">
              <span className="font-body block text-lg font-semibold text-black">
                My personal productivity system
              </span>
              <span className="font-body text-grey-20 block pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </div>
          </a>
          <a href="/post" className="shadow">
            <div
              style={{ backgroundImage: "url(/assets/img/post-03.png)" }}
              className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
            >
              <span className="from-blog-gradient-from to-blog-gradient-to absolute inset-0 block bg-gradient-to-b bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
              <span className="font-body absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center text-sm font-bold text-white uppercase md:text-base">
                Read More
              </span>
            </div>
            <div className="bg-white px-5 py-6 xl:py-8">
              <span className="font-body block text-lg font-semibold text-black">
                My year in review 2020
              </span>
              <span className="font-body text-grey-20 block pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
