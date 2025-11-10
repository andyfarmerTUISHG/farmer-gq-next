export default function Contact() {
  return (
    <>
      <div className="container py-16 md:py-20" id="contact">
        <h2 className="font-header text-primary text-center text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl">
          {" "}
          Here&apos;s a contact form
          {" "}
        </h2>
        <h4 className="font-header pt-6 text-center text-xl font-medium text-black sm:text-2xl lg:text-3xl">
          {" "}
          Have Any Questions?
          {" "}
        </h4>
        <div className="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
          <p className="font-body text-grey-10">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit
            condimentum turpis nisl sem, viverra habitasse urna ante lobortis
            fermentum accumsan. Viverra habitasse urna ante lobortis fermentum
            accumsan.
            {" "}
          </p>
        </div>
        <form className="mx-auto w-full pt-10 sm:w-3/4">
          <div className="flex flex-col md:flex-row">
            <input
              className="border-grey-50 font-body mr-3 w-full rounded px-4 py-3 text-black md:w-1/2 lg:mr-5"
              placeholder="Name"
              type="text"
              id="name"
            />
            <input
              className="border-grey-50 font-body mt-6 w-full rounded px-4 py-3 text-black md:mt-0 md:ml-3 md:w-1/2 lg:ml-5"
              placeholder="Email"
              type="text"
              id="email"
            />
          </div>
          <textarea
            className="border-grey-50 font-body mt-6 w-full rounded px-4 py-3 text-black md:mt-8"
            placeholder="Message"
            id="message"
            cols="30"
            rows="10"
          >
          </textarea>
          <button
            type="button"
            className="bg-primary font-header hover:bg-grey-20 mt-6 flex items-center justify-center rounded px-8 py-3 text-lg font-bold text-white uppercase"
          >
            {" "}
            Send
            {" "}
            <i className="bx bx-chevron-right relative -right-2 text-3xl"></i>
          </button>
        </form>
        <div className="flex flex-col pt-16 lg:flex-row">
          <div className="border-grey-60 w-full border-t-2 border-r-2 border-b-2 border-l-2 px-6 py-6 sm:py-8 lg:w-1/3">
            <div className="flex items-center">
              <i className="bx bx-phone text-grey-40 text-2xl"></i>
              <p className="font-body text-grey-40 pl-2 font-bold uppercase lg:text-lg">
                {" "}
                My Phone
                {" "}
              </p>
            </div>
            <p className="font-body text-primary pt-2 text-left font-bold lg:text-lg">
              {" "}
              (+881) 111 222 333
              {" "}
            </p>
          </div>
          <div className="border-grey-60 w-full border-t-0 border-r-2 border-b-2 border-l-2 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-t-2 lg:border-l-0">
            <div className="flex items-center">
              <i className="bx bx-envelope text-grey-40 text-2xl"></i>
              <p className="font-body text-grey-40 pl-2 font-bold uppercase lg:text-lg">
                {" "}
                My Email
                {" "}
              </p>
            </div>
            <p className="font-body text-primary pt-2 text-left font-bold lg:text-lg">
              {" "}
              name@mydomain.com
              {" "}
            </p>
          </div>
          <div className="border-grey-60 w-full border-t-0 border-r-2 border-b-2 border-l-2 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-t-2 lg:border-l-0">
            <div className="flex items-center">
              <i className="bx bx-map text-grey-40 text-2xl"></i>
              <p className="font-body text-grey-40 pl-2 font-bold uppercase lg:text-lg">
                {" "}
                My Address
                {" "}
              </p>
            </div>
            <p className="font-body text-primary pt-2 text-left font-bold lg:text-lg">
              {" "}
              123 New York D Block 1100, 2011 USA
              {" "}
            </p>
          </div>
        </div>
      </div>
      <div
        className="h-72 bg-cover bg-center bg-no-repeat sm:h-64 md:h-72 lg:h-96"
        style={{ backgroundImage: "url(/assets/img/map.png)" }}
      >
      </div>
      <div
        className="bg-primary relative bg-cover bg-center bg-no-repeat py-16 bg-blend-multiply lg:py-24"
        style={{ backgroundImage: "url(/assets/img/bg-cta.jpg)" }}
      >
        <div className="relative z-30 container">
          <h3 className="font-header text-center text-3xl leading-tight tracking-wide text-white uppercase sm:text-4xl lg:text-5xl">
            {" "}
            Keep
            {" "}
            <span className="font-bold">up-to-date</span>
            <br />
            {" "}
            with what I&apos;m up to
          </h3>
          <form className="mt-6 flex flex-col justify-center sm:flex-row">
            <input
              className="font-body w-full rounded px-4 py-3 text-black sm:w-2/5 sm:py-4 lg:w-1/3"
              type="text"
              id="email"
              placeholder="Give me your Email"
            />
            <button
              type="button"
              className="bg-yellow font-body text-primary hover:bg-primary focus:ring-yellow mt-2 rounded px-8 py-3 text-base font-bold uppercase transition-colors hover:text-white focus:border-transparent focus:ring focus:outline-none sm:mt-0 sm:ml-2 sm:py-4 md:text-lg"
            >
              {" "}
              Join the club
              {" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
