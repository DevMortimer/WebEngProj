import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, DraftingCompass, Cpu } from "lucide-react";
// 1. Updated Import
import CPEnavbar from "../../components/CPEnavbar";
import SectionTitle from "../../components/SectionTitle";
import Footer from "../../components/Footer";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { CPE } from "../../data/department/CPE";
import type { NavId } from "../../types/nav"; // Import your type for safety
import "../../styles/departments/CPE.css";

export default function CPEPage() {
  const [baseDept] = useState<typeof CPE>(CPE);

  const dept = useMemo(() => mergeDeptWithOverrides(baseDept), [baseDept]);
  const [activeSoIndex, setActiveSoIndex] = useState(0);

  const handleNextSo = () => {
    if (activeSoIndex < dept.so.outcomes.length - 1) {
      setActiveSoIndex((prev) => prev + 1);
    }
  };

  const handlePrevSo = () => {
    if (activeSoIndex > 0) {
      setActiveSoIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!dept) return;

    document.title = `${dept.code} | BULSU COE`;

    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);

    if (link) {
      link.href = `/icons/${dept.code.toLowerCase()}.svg`;
    }
  }, [dept]);

  // 2. The Scrolling Logic
  // This matches the "id" from the buttons in CPEnavbar to the "id" on your <section> tags
  const onNav = (id: NavId | string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white">
      {/* 3. Using the new Component */}
      <CPEnavbar onNav={onNav} />

      {/* --- HOME SECTION --- */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900">
            {dept.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{dept.subtitle}</p>
          <div className="mt-5">
            <Link
              to={`/dept/${dept.code}/admin`}
              className="inline-flex items-center rounded-full border border-[#a90000] px-5 py-2 text-sm font-semibold text-[#a90000] hover:bg-[#a90000] hover:text-white"
            >
              Open Department Admin
            </Link>
          </div>
        </div>

        <section className="p-4 md:p-8">
          <div className="mt-8 grid grid-cols-12 gap-5">
            {/* LEFT CONTENT CARD */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between p-8 bg-[#F9F6F0] rounded-[2rem] border border-stone-200 shadow-sm">
              <div>
                <header className="mb-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-red-900 uppercase mb-2">
                    {dept.hero.university}
                  </p>
                  <h1 className="text-5xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
                    {/* We use replace to handle the <br /> if needed, or just let it wrap */}
                    {dept.title.split(" ").map((word, i) => (
                      <span key={i}>
                        {word} {i === 0 && <br />}
                      </span>
                    ))}
                  </h1>
                </header>

                <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-md">
                  {dept.hero.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <a
                    href={dept.links.explore}
                    className="px-6 py-2.5 bg-[#7B1616] hover:bg-red-950 text-white rounded-full font-bold text-xs transition-colors text-center"
                  >
                    Explore the Program
                  </a>
                  <a
                    href={dept.links.performance}
                    className="px-6 py-2.5 border border-stone-300 bg-white text-[#7B1616] hover:bg-stone-50 rounded-full font-bold text-xs transition-colors text-center"
                  >
                    CpE Performance and Extension
                  </a>
                </div>
              </div>

              {/* DYNAMIC STATS SECTION */}
              <div className="grid grid-cols-3 gap-3">
                {dept.hero.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/60 rounded-2xl border border-stone-100"
                  >
                    <span
                      className={`block text-xl font-black ${stat.highlight ? "text-red-800" : "text-slate-900"}`}
                    >
                      {stat.value}
                    </span>
                    <p className="text-[9px] leading-tight font-bold text-stone-500 uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE CLUSTER - Now using the 'images' object from TS */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 h-64 rounded-[2rem] overflow-hidden bg-stone-200">
                <img
                  src={dept.images.heroBig}
                  alt="Hero Big"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="h-[400px] rounded-[2rem] overflow-hidden bg-stone-200">
                <img
                  src={dept.images.heroLeft}
                  alt="Hero Left"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-5 h-[400px]">
                <div className="flex-1 rounded-[2rem] overflow-hidden bg-stone-200">
                  <img
                    src={dept.images.heroSmall1}
                    alt="Hero Small 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 rounded-[2rem] overflow-hidden bg-stone-200">
                  <img
                    src={dept.images.heroSmall2}
                    alt="Hero Small 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section
        id="about"
        className="w-full bg-slate-950 py-24 my-10 border-y-4 border-yellow-400"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* 1. PRIMARY PROGRAM OVERVIEW (Large Format) */}
          <div className="mb-20">
            <div className="text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase mb-4">
              {dept.programOverview.heading}
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-8">
              The Future of <br />
              <span className="text-yellow-400">Computer Engineering</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl font-medium">
              {dept.programOverview.text}
            </p>
          </div>

          {/* 2. MISSION & VISION (Separate Section Holders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 border-t border-slate-800 pt-16">
            <div className="relative group">
              <div className="absolute -left-4 top-0 h-full w-1 bg-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                Our Mission
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {/* Ensure dept.mission is defined in your CPE.ts */}
                {dept.programOverview.mission ||
                  "To provide high-quality instruction and research-driven education in the field of Computer Engineering."}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -left-4 top-0 h-full w-1 bg-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                Our Vision
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {/* Ensure dept.vision is defined in your CPE.ts */}
                {dept.programOverview.vision ||
                  "A leading center of excellence recognized for producing innovative and globally competitive computer engineers."}
              </p>
            </div>
          </div>

          {/* 3. --- PROGRAM SIGNALS (Contextual Cards) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {/* Regulatory Context */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] hover:border-yellow-400/50 transition-colors">
              <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-4">
                Regulatory Basis
              </p>
              <h4 className="text-xl font-black text-white leading-tight mb-2 uppercase">
                CHED Compliant
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Fully aligned with <strong>CMO No. 87, s. 2017</strong>,
                ensuring a curriculum that meets international standards for
                21st-century engineering education.
              </p>
            </div>

            {/* Admission Standard */}
            <div className="bg-yellow-400 p-8 rounded-[2rem] text-slate-950 shadow-xl shadow-yellow-400/10">
              <p className="text-[10px] font-black uppercase tracking-widest mb-4">
                Admission Signal
              </p>
              <h4 className="text-xl font-black leading-tight mb-2 uppercase">
                Academic Rigor
              </h4>
              <p className="text-sm font-medium leading-relaxed">
                Entry requires a high-tier scholastic standing, prioritizing{" "}
                <strong>STEM track</strong> graduates with specialized
                performance in advanced mathematics and physics.
              </p>
            </div>

            {/* Industry Linkage */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] hover:border-yellow-400/50 transition-colors">
              <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-4">
                Industry Signal
              </p>
              <h4 className="text-xl font-black text-white leading-tight mb-2 uppercase">
                Career Readiness
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Facilitated through the <strong>BulSU CarDSI Office</strong>,
                bridging students to internships in high-tech firms across the
                region and Metro Manila.
              </p>
            </div>
          </div>

          {/* 4. DYNAMIC STATS GRID (Mapped from the array in CPE.ts) */}
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-cols-fr border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-400/5">
            {dept.programOverview.stats.map((stat: any, idx: number) => (
              <Stat
                key={idx}
                value={stat.value}
                label={stat.label}
                accentHex={stat.highlight ? "#facc15" : "#94a3b8"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- PEO SECTION (Sticky Sidebar Layout) --- */}
      <section
        id="peo"
        className="w-full bg-slate-950 py-24 border-y-4 border-yellow-400 border-slate-900"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT COLUMN: Sticky Header & Image */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-yellow-400 uppercase mb-4">
                  {dept.title}
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
                  {dept.peo.title}
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  {dept.peo.subtitle}
                </p>
              </div>

              {/* Image Holder with Yellow Accent Blend */}
              <div className="rounded-[2rem] overflow-hidden bg-slate-900 border-2 border-slate-800 relative group">
                <div className="absolute inset-0 bg-yellow-400/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={dept.images.peo}
                  alt="PEO Representation"
                  className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Scrolling PEO Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {dept.peo.items.map((peo, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  {/* Huge Watermark Number in the Background */}
                  <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-800/30 group-hover:text-yellow-400/5 transition-colors select-none">
                    0{idx + 1}
                  </div>

                  {/* Content (Z-10 to stay above the watermark) */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-1 bg-yellow-400 rounded-full" />
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                        {peo.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed pr-8">
                      {peo.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SO SECTION (Interactive Tech Flashcards) --- */}
      <section
        id="so"
        className="relative w-full bg-slate-950 py-24 overflow-hidden border-y border-slate-900"
      >
        {/* BACKGROUND IMAGE HOLDER (Neural Network / Blueprint) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10" />
          <img
            src="/images/cpe/neural-bg.jpg" /* Replace with your actual background image path */
            alt="Neural Network Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* HEADER */}
          <div className="text-center mb-16">
            <p className="text-[10px] font-black tracking-[0.3em] text-yellow-400 uppercase mb-4">
              {dept.title}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
              {dept.so.title}
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
              {dept.so.subtitle}
            </p>
          </div>

          {/* FLASHCARD CAROUSEL CONTAINER */}
          <div className="relative h-[350px] md:h-[400px] w-full max-w-4xl mx-auto flex items-center justify-center perspective-1000">
            {dept.so.outcomes.map((outcome, index) => {
              // Calculate the distance of this card from the active card
              const offset = index - activeSoIndex;

              // Hide cards that are behind the current one, or more than 4 steps ahead
              if (offset < 0 || offset > 4) return null;

              const isActive = offset === 0;

              return (
                <div
                  key={index}
                  className={`absolute top-0 transition-all duration-500 ease-out border-2 rounded-2xl ${
                    isActive
                      ? "bg-slate-900 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.15)] z-50 cursor-default"
                      : "bg-slate-800/90 border-slate-700 cursor-pointer hover:border-slate-500"
                  }`}
                  style={{
                    // CSS Math to create the 3D stacking effect pushing cards to the right
                    transform: isActive
                      ? "translateX(-50%) scale(1)"
                      : `translateX(calc(-50% + ${offset * 60}px)) scale(${1 - offset * 0.05})`,
                    zIndex: 50 - offset,
                    opacity: 1 - offset * 0.2,
                    width: "100%",
                    maxWidth: "600px",
                    left: "50%",
                  }}
                  onClick={() => {
                    // Allow users to click a background card to jump directly to it
                    if (!isActive) setActiveSoIndex(index);
                  }}
                >
                  {/* CARD INNER CONTENT */}
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-yellow-400 font-bold tracking-widest text-xs mb-1 uppercase">
                          Student Outcomes
                        </h4>
                        <h3
                          className={`font-black ${isActive ? "text-4xl text-yellow-400" : "text-3xl text-slate-500"} transition-colors`}
                        >
                          SO {index + 1}
                        </h3>
                      </div>
                      <div
                        className={`p-3 rounded-lg border ${isActive ? "bg-slate-950 border-yellow-400/30" : "bg-transparent border-transparent"}`}
                      >
                        {isActive ? (
                          <DraftingCompass className="w-8 h-8 text-slate-400" />
                        ) : (
                          <Cpu className="w-6 h-6 text-slate-600" />
                        )}
                      </div>
                    </div>

                    {/* Card Body (Circuit Board Styling) */}
                    <div
                      className={`flex-grow border ${isActive ? "border-yellow-400/50" : "border-slate-700"} rounded-lg p-6 relative flex items-center justify-center text-center`}
                    >
                      {/* Circuit corner accents for active card */}
                      {isActive && (
                        <>
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400 -mt-[1px] -ml-[1px] rounded-tl-lg" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400 -mb-[1px] -mr-[1px] rounded-br-lg" />
                        </>
                      )}

                      <p
                        className={`${isActive ? "text-white text-lg md:text-xl font-medium" : "text-slate-500 text-sm"} leading-relaxed`}
                      >
                        {isActive
                          ? outcome.text
                          : "Click to expand outcome details..."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NAVIGATION CONTROLS */}
          <div className="flex flex-col items-center justify-center mt-12 gap-4 relative z-20">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevSo}
                disabled={activeSoIndex === 0}
                className="p-3 rounded-lg border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-yellow-400 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextSo}
                disabled={activeSoIndex === dept.so.outcomes.length - 1}
                className="p-3 rounded-lg border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-yellow-400 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-xl font-black text-slate-500 tracking-widest">
              <span className="text-yellow-400">
                {String(activeSoIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-700 mx-2">/</span>
              {dept.so.outcomes.length}
            </div>
          </div>
        </div>
      </section>

      {/* --- CURRICULUM SECTION --- */}
      <section id="curriculum" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-6">
            <div className="text-xs font-semibold text-gray-400 tracking-wide">
              TAKE A TOUR
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              {dept.curriculum.title}
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              {dept.curriculum.text}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              {dept.curriculum.bullets.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dept.theme.accentHex }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="h-[360px] md:h-[420px] rounded-2xl bg-gray-50 border flex items-center justify-center overflow-hidden">
              <img
                src={dept.images.watermark}
                alt=""
                className="w-[420px] md:w-[520px] opacity-20 select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- LABORATORIES SECTION --- */}
      <section id="laboratories" className="max-w-6xl mx-auto px-6 pt-16">
        <SectionTitle
          center
          eyebrow={dept.title}
          title={dept.laboratories.title}
          subtitle="Department laboratories and learning spaces"
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {dept.laboratories.items.map((lab, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-6">
              <div className="text-xs font-semibold text-gray-400">
                LAB {idx + 1}
              </div>
              <h3 className="mt-2 text-base font-bold text-gray-900">{lab}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --- FACULTY SECTION --- */}
      <section id="faculty" className="max-w-6xl mx-auto px-6 pt-16">
        <SectionTitle center eyebrow={dept.title} title={dept.faculty.title} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {dept.faculty.members.map((member, idx) => (
            <div
              key={`${member.name}-${idx}`}
              className="rounded-2xl border bg-white p-6"
            >
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CAREERS SECTION --- */}
      <section id="careers" className="max-w-6xl mx-auto px-6 pt-16">
        <SectionTitle
          center
          eyebrow={dept.title}
          title={dept.careers.title}
          subtitle={dept.careers.subtitle}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {dept.careers.cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl border bg-white p-6 text-center"
            >
              <div className="text-3xl" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="mt-4 font-bold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="rounded-2xl border bg-gray-50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Department Contact
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add contact details for {dept.title} in this section.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Sub-components (Stat, Bullet, OutcomeCard) stay the same as your original file
function Stat({
  value,
  label,
  accentHex,
}: {
  value: number | string;
  label: string;
  accentHex: string;
}) {
  return (
    <div className="bg-slate-900/50 p-10 border-slate-800 border-r last:border-r-0 hover:bg-slate-900 transition-colors group">
      <div
        className="text-5xl font-black tracking-tighter transition-transform group-hover:scale-110 duration-300"
        style={{ color: accentHex }}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

// function Bullet({ title, text }: { title: string; text: string }) {
//   return (
//     <div>
//       <div className="font-semibold text-gray-900">{title}</div>
//       <div className="mt-1 text-sm text-gray-500">{text}</div>
//     </div>
//   );
// }

// function OutcomeCard({ title, text }: { title: string; text: string }) {
//   return (
//     <div className="rounded-2xl border bg-white p-6 text-center">
//       <div className="mx-auto w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-[#A90000]">
//         ✓
//       </div>
//       <div className="mt-4 font-semibold text-gray-900">{title}</div>
//       <div className="mt-2 text-sm text-gray-500">{text}</div>
//     </div>
//   );
// }
