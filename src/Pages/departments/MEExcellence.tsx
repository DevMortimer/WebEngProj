import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { ME } from "../../data/department/ME";
import {
  MEFooter,
  MENavbar,
  MESectionHeading,
} from "../../components/MEChrome";
import "../../styles/departments/ME.css";

export default function MEExcellencePage() {
  const [baseDept] = useState<typeof ME>(ME);

  const dept = useMemo(() => mergeDeptWithOverrides(baseDept), [baseDept]);

  useEffect(() => {
    document.title = `${dept.code} Performance | BULSU COE`;

    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);

    if (link) {
      link.href = `/icons/${dept.code.toLowerCase()}.svg`;
    }
  }, [dept]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="me-page">
      <MENavbar
        dept={dept}
        onNav={onNav}
        items={[
          { label: "Program", kind: "route", to: `/dept/${dept.code}` },
          { label: "Licensure", kind: "scroll", target: "licensure" },
          { label: "Research", kind: "scroll", target: "research" },
          { label: "Community", kind: "scroll", target: "community" },
          { label: "Alumni", kind: "scroll", target: "alumni" },
        ]}
        cta={{ label: "Back to Program", to: `/dept/${dept.code}` }}
      />

      <main className="me-shell">
        <section className="me-hero">
          <div className="me-hero__copy">
            <p className="me-eyebrow">ME Performance, Research, and Service</p>
            <h1 className="me-display-title">{dept.excellencePage.title}</h1>
            <p className="me-hero__kicker">
              Where board performance, research productivity, and public service become visible.
            </p>
            <p className="me-hero__copy-text">
              The Mechanical Engineering evidence file is not only about curriculum and
              accreditation. It also documents licensure performance above national rates, a
              research profile with published and awarded outputs, and community extension
              initiatives that turn technical work into public value.
            </p>

            <div className="me-action-row">
              <button
                type="button"
                className="me-button me-button--primary"
                onClick={() => onNav("licensure")}
              >
                Jump to licensure
              </button>
              <Link to={`/dept/${dept.code}`} className="me-button me-button--secondary">
                Return to main page
              </Link>
            </div>

            <div className="me-metric-grid">
              <article className="me-metric-card">
                <p className="me-metric-card__value">81.25%</p>
                <p className="me-metric-card__label">August 2018 passing rate</p>
                <p className="me-metric-card__detail">
                  Recorded with an 8th-place national finish among 167 schools.
                </p>
              </article>

              <article className="me-metric-card">
                <p className="me-metric-card__value">12</p>
                <p className="me-metric-card__label">Published and indexed outputs</p>
                <p className="me-metric-card__detail">
                  Research disseminated in journals and indexed conference venues.
                </p>
              </article>

              <article className="me-metric-card">
                <p className="me-metric-card__value">2024</p>
                <p className="me-metric-card__label">CapDev recognition year</p>
                <p className="me-metric-card__detail">
                  University-level community empowerment award linked to extension work.
                </p>
              </article>
            </div>
          </div>

          <article className="me-panel me-panel--feature">
            <p className="me-panel__tag">What This Page Covers</p>
            <h2 className="me-panel__title">An evidence-backed view of ME beyond the overview</h2>
            <p className="me-panel__body">
              This page concentrates the measurable parts of the department narrative so that the
              main ME page stays readable while the performance story stays accessible.
            </p>

            <div className="me-credential-list">
              <div className="me-credential-list__item">
                <p className="me-credential-list__label">Licensure</p>
                <h3 className="me-credential-list__value">
                  Above-national performance from 2018 to 2024
                </h3>
                <p className="me-credential-list__detail">
                  Benchmarks from August 2018, August 2022, and February 2024 are included below.
                </p>
              </div>

              <div className="me-credential-list__item">
                <p className="me-credential-list__label">Research</p>
                <h3 className="me-credential-list__value">
                  Faculty engagement, output, and recognized work
                </h3>
                <p className="me-credential-list__detail">
                  The evidence names research-active faculty, completed work, published output, and
                  utilized knowledge products.
                </p>
              </div>

              <div className="me-credential-list__item">
                <p className="me-credential-list__label">Community</p>
                <h3 className="me-credential-list__value">
                  Technical training, relief, and extension machinery
                </h3>
                <p className="me-credential-list__detail">
                  Sambalaran, safety training, relief operations, and equipment turnover appear in
                  the extension narrative.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section id="licensure" className="me-section">
          <MESectionHeading
            eyebrow="Board Exam Performance"
            title={dept.licensure.title}
            text={dept.licensure.intro}
          />

          <div className="me-card-grid">
            {dept.licensure.benchmarks.map((benchmark) => (
              <article key={benchmark.exam} className="me-panel">
                <p className="me-panel__tag">{benchmark.exam}</p>
                <h3 className="me-panel__title">{benchmark.schoolRate} school passing rate</h3>
                <p className="me-panel__body">
                  National average: {benchmark.nationalRate}
                </p>
                <p className="me-panel__body">{benchmark.note}</p>
              </article>
            ))}
          </div>

          <div className="me-outcome-grid">
            {dept.licensure.topnotchers.map((topnotcher) => (
              <article key={`${topnotcher.name}-${topnotcher.year}`} className="me-outcome-card">
                <span className="me-outcome-card__number">{topnotcher.rank}</span>
                <h3 className="me-outcome-card__title">{topnotcher.name}</h3>
                <p className="me-outcome-card__text">
                  {topnotcher.year} licensure result with a recorded score of {topnotcher.score}.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="me-section">
          <MESectionHeading
            eyebrow="Research Culture"
            title={dept.research.title}
            text={dept.research.intro}
          />

          <div className="me-card-grid">
            {dept.research.metrics.map((metric) => (
              <article key={metric.label} className="me-panel">
                <p className="me-panel__tag">Research Metric</p>
                <h3 className="me-panel__title">{metric.value}</h3>
                <p className="me-panel__body">{metric.label}</p>
                <p className="me-panel__body">{metric.detail}</p>
              </article>
            ))}
          </div>

          <article className="me-panel me-panel--wide">
            <p className="me-panel__tag">Named Contributors</p>
            <h3 className="me-panel__title">Faculty and utilization notes from the evidence</h3>

            <div className="me-bullet-list">
              {dept.research.people.map((item) => (
                <div key={item} className="me-bullet-list__item">
                  <span className="me-bullet-list__dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="community" className="me-section">
          <MESectionHeading
            eyebrow="Extension and Service"
            title={dept.extension.title}
            text={dept.extension.intro}
          />

          <div className="me-detail-grid">
            {dept.extension.projects.map((project) => (
              <article key={`${project.year}-${project.title}`} className="me-list-card">
                <p className="me-list-card__index">{project.year}</p>
                <h3 className="me-panel__title">{project.title}</h3>
                <p className="me-list-card__text">{project.text}</p>
              </article>
            ))}
          </div>

          <article className="me-panel me-panel--wide">
            <p className="me-panel__tag">Recognition and Institutional Support</p>
            <h3 className="me-panel__title">Awards connected to service-oriented engineering</h3>

            <div className="me-bullet-list">
              {dept.extension.awards.map((award) => (
                <div key={award} className="me-bullet-list__item">
                  <span className="me-bullet-list__dot" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="alumni" className="me-section">
          <MESectionHeading
            eyebrow="Alumni Recognition"
            title={dept.alumni.title}
            text="The evidence file also points to graduates recognized for international excellence, science, and technology leadership."
          />

          <div className="me-card-grid">
            {dept.alumni.members.map((member) => (
              <article key={member.name} className="me-career-card">
                <span className="me-career-card__code">ALUM</span>
                <h3 className="me-career-card__title">{member.name}</h3>
                <p className="me-panel__body">{member.role}</p>
                <p className="me-career-card__text">{member.text}</p>
              </article>
            ))}
          </div>

          <article className="me-cta-panel">
            <div>
              <p className="me-panel__tag">Keep The Main Page Clean</p>
              <h3 className="me-cta-panel__title">Use this route for deep-dive ME content</h3>
              <p className="me-cta-panel__text">
                The main ME page stays focused on program identity, while this page can continue to
                grow with board exam history, research wins, extension projects, and alumni stories.
              </p>
            </div>

            <Link to={`/dept/${dept.code}`} className="me-button me-button--primary">
              Back to main page
            </Link>
          </article>
        </section>
      </main>

      <MEFooter dept={dept} />
    </div>
  );
}
