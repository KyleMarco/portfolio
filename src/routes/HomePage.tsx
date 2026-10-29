import { useCallback, useRef, useState } from 'react';
import { PopupDialog } from '../shared/ui/PopupDialog';
import {
  contactCards,
  education,
  educationTracks,
  experiences,
  interests,
  profile,
  skillGroups,
  strengths,
} from './homePageData';

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-900/15 pb-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[number] | null>(
    null,
  );
  const [activeSkillGroup, setActiveSkillGroup] = useState(skillGroups[0].label);
  const [activeEducationTrack, setActiveEducationTrack] = useState(educationTracks[0].label);
  const [activeInterest, setActiveInterest] = useState(interests[0].id);
  const experienceTriggerRef = useRef<HTMLButtonElement>(null);
  const experienceCloseRef = useRef<HTMLButtonElement>(null);
  const closeExperience = useCallback(() => {
    setSelectedExperience(null);
  }, []);

  const selectedSkillGroup =
    skillGroups.find((group) => group.label === activeSkillGroup) ?? skillGroups[0];
  const selectedEducationTrack =
    educationTracks.find((track) => track.label === activeEducationTrack) ?? educationTracks[0];
  const selectedInterest =
    interests.find((interest) => interest.id === activeInterest) ?? interests[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-white text-slate-900 shadow-2xl shadow-slate-900/10">
        <section className="relative isolate overflow-hidden bg-[#0f172a] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full border border-blue-300/15 sm:right-0 sm:top-[-16rem] sm:h-[42rem] sm:w-[42rem]"
          />
          <div
            aria-hidden="true"
            className="absolute right-10 top-10 -z-10 h-64 w-64 rounded-full border border-blue-300/10 sm:right-28 sm:top-20 sm:h-80 sm:w-80"
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 transition-colors duration-200 hover:border-blue-300/50 hover:bg-blue-300/15 motion-reduce:transition-none">
                <span className="h-2 w-2 rounded-full bg-blue-400 bg-[radial-gradient(circle,_#7dd3fc_0%,_#3b82f6_50%,_#1d4ed8_100%)]" />
                {profile.role}
              </p>
              <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                {profile.firstName}
                <br />
                <span className="text-blue-300">{profile.lastName}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {profile.summary}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200 motion-reduce:transition-none"
                >
                  Get in touch <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#experience"
                  className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200 motion-reduce:transition-none"
                >
                  Explore experience
                </a>
              </div>
            </div>

            <aside className="relative mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center sm:max-w-[300px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rotate-[-12deg] rounded-[2.5rem] border border-blue-300/30 transition-transform duration-500 hover:rotate-[0deg] motion-reduce:transition-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-5 rotate-[9deg] rounded-full border border-dashed border-white/25"
              />
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-blue-500 text-5xl font-semibold tracking-[-0.08em] text-white shadow-[0_0_90px_rgba(37,99,235,0.18)] transition-transform duration-500 hover:scale-105 sm:h-52 sm:w-52 sm:text-6xl motion-reduce:transition-none">
                {profile.monogramPrimary}
                <span className="text-blue-200">{profile.monogramAccent}</span>
              </div>
              <span className="absolute bottom-3 left-0 rounded-full border border-white/20 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 transition-colors duration-200 hover:border-blue-300/50 hover:text-white motion-reduce:transition-none">
                {profile.tagline}
              </span>
            </aside>
          </div>
        </section>

        <section
          aria-label="Contact details"
          className="grid gap-5 border-b border-slate-200 bg-slate-50 px-6 py-6 sm:grid-cols-3 sm:px-10 lg:px-16"
        >
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
              data-interactive-card
              className="group rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 motion-reduce:transition-none"
            >
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </span>
              <span className="break-all text-sm font-semibold text-slate-900 group-hover:underline sm:text-base">
                {card.value}
              </span>
            </a>
          ))}
        </section>

        <div className="grid gap-14 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:px-16">
          <div className="space-y-12">
            <section id="experience" className="scroll-mt-8">
              <SectionHeading eyebrow="The work" title="Experience" />
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="space-y-6">
                  {experiences.map((experience) => (
                    <article
                      key={experience.company}
                      className="relative border-l border-slate-900/15 pl-6 sm:pl-8"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-slate-50 ${experience.accent}`}
                      />
                      <button
                        ref={
                          selectedExperience?.company === experience.company
                            ? experienceTriggerRef
                            : undefined
                        }
                        type="button"
                        aria-haspopup="dialog"
                        aria-label={`View ${experience.company} experience highlights`}
                        onClick={(event) => {
                          experienceTriggerRef.current = event.currentTarget;
                          setSelectedExperience(experience);
                        }}
                        className="group w-full rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-slate-900/5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 motion-reduce:transition-none"
                      >
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                              {experience.dates}
                              {experience.location && ` · ${experience.location}`}
                            </p>
                            <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                              {experience.company}
                            </h3>
                            <p className="mt-1 font-medium text-slate-600">{experience.role}</p>
                            <span className="mt-3 inline-block text-sm font-semibold text-blue-700 group-hover:underline">
                              View experience highlights <span aria-hidden="true">↗</span>
                            </span>
                          </div>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="The foundation" title="Education" />
              <div
                data-interactive-card
                className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
              >
                <div className="space-y-5">
                  {education.map((item, index) => (
                    <article
                      key={item.institution}
                      className={index > 0 ? 'border-t border-slate-200 pt-5' : undefined}
                    >
                      <h3 className="font-bold text-slate-950">{item.institution}</h3>
                      {item.program && (
                        <p className="mt-1 text-sm text-slate-600">{item.program}</p>
                      )}
                      <p
                        className={`mt-1 text-xs leading-5 ${
                          item.program ? 'text-slate-500' : 'text-slate-600'
                        }`}
                      >
                        {item.details}
                      </p>
                    </article>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {educationTracks.map((track) => (
                      <button
                        key={track.label}
                        type="button"
                        aria-pressed={activeEducationTrack === track.label}
                        onClick={() => setActiveEducationTrack(track.label)}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none ${
                          activeEducationTrack === track.label
                            ? 'border-blue-200 bg-blue-100 text-blue-800 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {track.label}
                      </button>
                    ))}
                  </div>
                  <p
                    key={activeEducationTrack}
                    className="motion-enter mt-4 text-sm leading-7 text-slate-700"
                  >
                    {selectedEducationTrack.content}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-12">
            <section>
              <SectionHeading eyebrow="What I work with" title="Skills" />
              <div
                data-interactive-card
                className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
              >
                <div className="flex flex-wrap gap-2">
                  {skillGroups.map((group) => (
                    <button
                      key={group.label}
                      type="button"
                      aria-pressed={activeSkillGroup === group.label}
                      onClick={() => setActiveSkillGroup(group.label)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none ${
                        activeSkillGroup === group.label
                          ? 'border-blue-200 bg-blue-100 text-blue-800 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>

                <div
                  key={selectedSkillGroup.label}
                  className="motion-enter rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {selectedSkillGroup.label}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {selectedSkillGroup.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-sm motion-reduce:transition-none"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Strengths
                  </h3>
                  <p className="text-sm leading-7 text-slate-700">{strengths.join(' · ')}</p>
                </div>
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="Beyond work" title="Interests" />
              <div
                data-interactive-card
                className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
              >
                <p className="font-serif text-xl font-medium text-slate-900">Curious by nature.</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      aria-pressed={activeInterest === interest.id}
                      onClick={() => setActiveInterest(interest.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none ${
                        activeInterest === interest.id
                          ? 'border-blue-200 bg-blue-100 text-blue-800 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {interest.emoji} {interest.id}
                    </button>
                  ))}
                </div>
                <div
                  key={selectedInterest.id}
                  className="motion-enter rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="mb-2 text-2xl">{selectedInterest.emoji}</div>
                  <p className="text-sm leading-7 text-slate-700">{selectedInterest.note}</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-slate-900/10 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>
            {profile.firstName} {profile.lastName} · {profile.footerRole}
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="font-semibold text-slate-700 transition-colors hover:text-slate-950 hover:underline active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 motion-reduce:transition-none"
          >
            Let’s build something thoughtful <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
      {selectedExperience && (
        <PopupDialog
          labelledBy="experience-dialog-title"
          closeLabel="Close experience details"
          onClose={closeExperience}
          initialFocusRef={experienceCloseRef}
          returnFocusRef={experienceTriggerRef}
          overlayClassName="flex items-center justify-center p-4"
          backdropClassName="bg-slate-950/60"
          panelClassName="flex max-h-[min(90vh,48rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <header className="relative isolate flex shrink-0 items-start justify-between gap-4 overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-7">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-20 -z-10 h-56 w-56 rounded-full border border-blue-200/70 sm:-right-4 sm:-top-28 sm:h-72 sm:w-72"
            />
            <div className="min-w-0">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700">
                Professional experience
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {selectedExperience.dates}
                </span>
                {selectedExperience.location && (
                  <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {selectedExperience.location}
                  </span>
                )}
              </div>
              <h2
                id="experience-dialog-title"
                className="mt-4 break-words font-serif text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl"
              >
                {selectedExperience.company}
              </h2>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <span aria-hidden="true" className="h-px w-5 bg-blue-500" />
                {selectedExperience.role}
              </p>
            </div>
            <button
              ref={experienceCloseRef}
              type="button"
              onClick={closeExperience}
              aria-label="Close experience details"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-white hover:text-slate-900 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                <path
                  d="m5 5 10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.75"
                />
              </svg>
            </button>
          </header>
          <div className="flex flex-col gap-8 overflow-y-auto p-5 sm:p-7">
            <section aria-labelledby="experience-technologies-heading">
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                    <path
                      d="m7.25 5-4 5 4 5m5.5-10 4 5-4 5m-1.5-12-2.5 14"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <div>
                  <h3
                    id="experience-technologies-heading"
                    className="text-sm font-semibold text-slate-900"
                  >
                    Technologies
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">Tools and technologies used</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-3">
                {selectedExperience.technologies.split(',').map((technology) => (
                  <li
                    key={technology.trim()}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 motion-reduce:transition-none"
                  >
                    {technology.trim()}
                  </li>
                ))}
              </ul>
            </section>
            <section
              aria-labelledby="experience-highlights-heading"
              className="border-t border-slate-200 pt-6"
            >
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                    Selected work
                  </p>
                  <h3
                    id="experience-highlights-heading"
                    className="font-serif text-xl font-semibold tracking-tight text-slate-950"
                  >
                    Highlights
                  </h3>
                </div>
                <span className="pb-1 font-mono text-xs text-slate-400">
                  {String(selectedExperience.highlights.length).padStart(2, '0')} items
                </span>
              </div>
              <ul className="divide-y divide-slate-100">
                {selectedExperience.highlights.map((highlight, index) => (
                  <li
                    key={highlight}
                    className="flex gap-4 rounded-lg py-4 transition-colors hover:bg-slate-50 first:pt-0 last:pb-0 motion-reduce:transition-none"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-blue-600"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-6 text-slate-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </PopupDialog>
      )}
    </main>
  );
}
