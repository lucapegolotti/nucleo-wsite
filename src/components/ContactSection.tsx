export default function ContactSection() {
  return (
    <section id="contact" className="relative isolate py-20 sm:py-24" style={{ backgroundColor: "var(--sage)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl">Get in touch</h2>
            <p className="mt-4 text-base sm:text-lg">
              Interested in joining our pilot program or learning more about Nucleo? Reach out to us today.
            </p>
          </div>
          <form className="grid grid-cols-1 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/20"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/20"
            />
            <input
              name="org"
              type="text"
              placeholder="Organization"
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/20"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/20"
            />
            <div className="pt-2">
              <button type="button" className="button-outline-peach px-6 py-3 font-semibold">
                Send Message
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}


