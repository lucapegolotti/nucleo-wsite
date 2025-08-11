import Image from "next/image";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export default function UseCasesSection() {
  const items = [
    {
      id: "01",
      title: "Body composition and sarcopenia assessment",
      description:
        "Automatic detection and quantification of muscle mass in CT scans, providing crucial nutritional metrics for cancer patients and improving treatment efficacy.",
      image: `${basePath}/media/sarcopenia.png`,
    },
    {
      id: "02",
      title: "Tumor Lesion Sizing",
      description:
        "Precise and consistent measurement of tumor lesions in CT scans, enabling accurate tracking of disease progression and treatment response.",
      image: `${basePath}/media/lesion_measure.png`,
    },
    {
      id: "03",
      title: "Target vs Non-Target Lesion Classification",
      description:
        "Automated classification of lesions according to RECIST criteria, streamlining the evaluation process and enhancing reporting consistency.",
      image: `${basePath}/media/target_vs_nontarget.png`,
    },
  ];

  return (
    <section id="use-cases" className="relative isolate pt-12 sm:pt-16 pb-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl text-slate-700">Our use cases</h2>
        <p className="mt-4 text-slate-700">
          Nucleo&#39;s advanced AI technology streamlines clinical workflows across three
        critical areas for oncology care.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {items.map((item) => (
            <div key={item.id} className="group relative h-full">
              <article
                className="relative h-full rounded-2xl border border-black/10 bg-white p-8 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col"
              >
                <div className="text-sm tracking-wider text-slate-500">{item.id}</div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-slate-700">{item.description}</p>
                {item.image ? (
                  <div className="mt-6 flex-1 flex items-center">
                    <div className="w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={`${item.title} example`}
                        width={1200}
                        height={800}
                        className="block w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1" />
                )}
                
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


