'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import defaultTeam from '@/data/teamList.json';

interface TeamMemberDisplay {
  id?: string;
  _id?: string;
  name: string;
  role?: string;
  title?: string;
  department?: string;
  bio?: string;
  description?: string;
  image: string;
  index?: string;
  stat?: {
    value: string;
    label: string;
  };
}

function StaggeredTeamTitle({ mounted }: { mounted: boolean }) {
  const text = 'TEAM';
  return (
    <h1 className="font-bebas text-7xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[170px] leading-[0.80] tracking-tight uppercase text-dark select-none inline-flex overflow-hidden py-1">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden h-[0.85em] leading-none"
        >
          <span
            className={`block transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: `${150 + index * 45}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </h1>
  );
}

function StaggeredTeamTagline({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#555555] font-semibold leading-relaxed flex flex-wrap gap-x-[0.25em] gap-y-0 text-left">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden py-0.5 -my-0.5 select-none"
        >
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 8;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className={`inline-block transition-all duration-500 ease-out transform-gpu ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{ transitionDelay: `${350 + charDelay}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}

export default function TeamPage() {
  const [mounted, setMounted] = useState(false);
  const [team, setTeam] = useState<TeamMemberDisplay[]>(defaultTeam);

  useEffect(() => {
    setMounted(true);

    async function loadTeam() {
      try {
        const res = await fetch('/api/team');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setTeam(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch team from backend:', err);
      }
    }

    loadTeam();
  }, []);

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light">
      <Navbar />

      {/* Main Team Section - Matching Navbar px-4 padding */}
      <section
        id="team-page"
        data-theme="light"
        className="w-full min-h-screen flex flex-col justify-start items-start bg-light text-dark pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4"
      >
        {/* Header: TEAM on the left, description next to it */}
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 max-w-7xl">
          {/* Left: TEAM Title with Staggered Kinetic Character Animation */}
          <div>
            <StaggeredTeamTitle mounted={mounted} />
          </div>

          {/* Right: Description next to it with Kinetic Staggered Reveal */}
          <div className="max-w-md lg:max-w-lg pt-0.5 md:pt-0.5 lg:pt-1">
            <StaggeredTeamTagline
              text="The visionary founders, AI engineers, and seasoned operators driving enterprise evolution through technical supremacy."
              mounted={mounted}
            />
          </div>
        </div>

        {/* Team Members Grid */}
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16 md:pt-20 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {team.map((member, idx) => {
            const memberKey = member._id || member.id || member.name;
            const memberTitle = member.title || member.role || 'Team Member';
            const memberBio = member.description || member.bio || '';
            const memberIndex = member.index || String(idx + 1).padStart(2, '0');
            const memberDept = member.department || memberTitle;

            return (
              <div
                key={memberKey}
                className="relative flex flex-col bg-dark/[0.02] border border-dark/10 rounded-2xl p-4 sm:p-5"
              >
                {/* Square Image Container */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-dark shadow-inner">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover select-none"
                    sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 33vw"
                  />



                  {/* Bottom Overlay Highlight Pill (if stat exists) */}
                  {member.stat ? (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-center bg-dark/85 backdrop-blur-md px-3 py-2 rounded-lg border border-light/10">
                      <span className="font-ibm-mono text-[11px] text-light/70 font-medium">
                        {member.stat.label}
                      </span>
                      <span className="font-ibm-mono text-xs font-bold text-accent">
                        {member.stat.value}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Text Meta Content */}
                <div className="flex flex-col text-left pt-5 pb-1 flex-grow justify-start">
                  {/* Name */}
                  <h3 className="font-bebas text-3xl sm:text-4xl text-dark tracking-wide uppercase">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <div className="flex items-center gap-2 mt-1 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-jakarta text-sm sm:text-base font-bold text-dark">
                      {memberTitle}
                    </span>
                  </div>

                  {/* Bio Description */}
                  <p className="font-jakarta text-sm sm:text-[15px] text-[#555555] font-semibold leading-relaxed">
                    {memberBio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* We're Hiring Section */}
        <div
          className={`w-full mt-16 sm:mt-20 md:mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '850ms' }}
        >
          <div className="flex flex-col text-left max-w-2xl">
            <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-dark leading-[0.9] tracking-wide uppercase mb-3">
              BUILD THE FUTURE OF AI WITH US
            </h3>
            <p className="font-jakarta text-sm sm:text-base text-[#555555] font-semibold leading-relaxed">
              We&apos;re constantly looking for exceptional AI engineers, full-stack builders, and systems thinkers passionate about pushing the boundaries of what&apos;s possible.
            </p>
          </div>
          <div className="shrink-0">
            <Button text="Join The Team" link="/contact" variant="default" size="lg" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
