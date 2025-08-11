import Image from "next/image";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type TeamMember = {
  id: string;
  name: string;
  qualifications: string;
  image?: string; // optional for now; will be provided later
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({ member }: { member: TeamMember }) {
  const size = 160; // px
  if (member.image) {
    return (
      <div className="relative h-40 w-40 rounded-full border border-black/10 overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.name} headshot`}
          width={size}
          height={size}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="relative h-40 w-40 rounded-full border border-black/10 overflow-hidden">
      <div
        className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-500 flex items-center justify-center font-semibold transition-transform duration-300 ease-out group-hover:scale-105"
        aria-label={`${member.name} placeholder headshot`}
      >
        {getInitials(member.name) || ""}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const members: TeamMember[] = [
    {
      id: "1",
      name: "Angelica Iacovelli, Msc",
      qualifications: "CEO. Ex Stanford, Polimi",
      image: `${basePath}/media/team/angelica.jpeg`,
    },
    {
      id: "2",
      name: "Luca Pegolotti, Phd",
      qualifications: "CTO. Ex Stanford, Apple, EPFL",
      image: `${basePath}/media/team/luca.png`,
    },
    {
      id: "3",
      name: "Michele Ghidini, MD, PhD",
      qualifications: "CSO. General Hospital Milan, The Royal Marsden",
      image: `${basePath}/media/team/michele.jpg`,
    },
    { id: "4", name: "Alessio Pigazzi, MD, PhD", qualifications: "Advisor. Cedars Sinai, City of Hope", image: `${basePath}/media/team/alessio.png` },
  ];

  return (
    <section id="team" className="relative isolate pt-12 sm:pt-16 pb-24 sm:pb-28 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-center text-4xl sm:text-5xl text-slate-700">Team</h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {members.map((member) => (
            <div key={member.id} className="group flex flex-col items-center text-center">
              <Avatar member={member} />
              <h3 className="mt-5 font-display text-xl text-slate-700">{member.name}</h3>
              <p className="mt-1 text-slate-600">{member.qualifications}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
