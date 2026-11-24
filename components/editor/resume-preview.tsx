import type { ReactNode } from "react";
import { format, isValid, parseISO } from "date-fns";
import type { TResume } from "@/types/resume";

export function ResumePreview({ resume }: { resume: TResume }) {
  const info = resume.personalInfo;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const contact = [info.address, info.email, info.phone].filter(Boolean);
  const experiences = [...resume.experience, ...resume.internships].filter((item) =>
    [item.position, item.company, item.location, item.startDate, item.endDate, item.description, ...(item.achievements ?? [])].some((value) => value?.trim()),
  );

  return (
    <article className="resume-paper" aria-label="Resume preview">
      <header className="resume-header">
        {fullName && <h1>{fullName.toUpperCase()}</h1>}
        {info.position && <p className="resume-position">{info.position.toUpperCase()}</p>}
        {contact.length > 0 && (
          <p className="resume-contact">
            {contact.map((item, index) => (
              <span key={`${item}-${index}`}>
                {index > 0 && <span aria-hidden="true"> | </span>}
                {item === info.email ? (
                  <a href={`mailto:${item}`}>{item}</a>
                ) : item}
              </span>
            ))}
          </p>
        )}
        {info.socialLinks.some((link) => link.url) && (
          <p className="resume-socials">
            {info.socialLinks.filter((link) => link.url).map((link, index) => (
              <span key={link.id}>
                {index > 0 && <span aria-hidden="true"> | </span>}
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.platform === "Other" ? link.customPlatform || link.url : link.platform}
                </a>
              </span>
            ))}
          </p>
        )}
      </header>

      {info.profileSummary.trim() && (
        <PreviewSection title="Profile">
          <p>{info.profileSummary}</p>
        </PreviewSection>
      )}

      {experiences.length > 0 && (
        <PreviewSection title="Experience">
          {experiences.map((item) => (
            <Entry key={item.id}>
              <EntryHeading
                title={organizationTitle(item.position, item.company, item.location)}
                dates={dateRange(item.startDate, item.endDate, item.present)}
              />
              {item.description?.trim() && <p className="resume-entry-description">{item.description}</p>}
              <BulletList items={item.achievements ?? []} />
            </Entry>
          ))}
        </PreviewSection>
      )}

      {resume.skills.some((skill) => skill.category.trim() || skill.description.trim()) && (
        <PreviewSection title="Skills">
          <div className="resume-skill-list">
            {resume.skills.filter((skill) => skill.category.trim() || skill.description.trim()).map((skill) => (
              <p key={skill.id}>
                {skill.category.trim() && <strong>{skill.category}: </strong>}
                {skill.description}
              </p>
            ))}
          </div>
        </PreviewSection>
      )}

      {resume.projects.some((project) => project.name || project.description || project.technologies || project.links?.length) && (
        <PreviewSection title="Projects">
          {resume.projects.filter((project) => project.name || project.description || project.technologies || project.links?.length).map((project) => (
            <Entry key={project.id}>
              <EntryHeading
                title={project.name}
                dates={dateRange(project.startDate, project.endDate, project.present)}
                links={project.links?.filter((link) => link.url).map((link) => ({ label: link.label || link.url, url: link.url }))}
              />
              {project.description.trim() && <p className="resume-entry-description">{project.description}</p>}
              <BulletList items={project.achievements ?? []} />
              {project.technologies.trim() && <p className="resume-entry-description"><strong>Technologies: </strong>{project.technologies}</p>}
            </Entry>
          ))}
        </PreviewSection>
      )}

      {resume.education.some((item) => [item.degree, item.institution, item.location, item.startDate, item.endDate, item.description, item.gpa, ...(item.achievements ?? [])].some((value) => value?.trim())) && (
        <PreviewSection title="Education">
          {resume.education.filter((item) => [item.degree, item.institution, item.location, item.startDate, item.endDate, item.description, item.gpa, ...(item.achievements ?? [])].some((value) => value?.trim())).map((item) => (
            <Entry key={item.id}>
              <EntryHeading title={organizationTitle(item.degree, item.institution, item.location)} dates={dateRange(item.startDate, item.endDate, item.present)} />
              {item.description?.trim() && <p className="resume-entry-description">{item.description}</p>}
              {item.gpa.trim() && <p className="resume-entry-description"><strong>GPA: </strong>{item.gpa}</p>}
              <BulletList items={item.achievements ?? []} />
            </Entry>
          ))}
        </PreviewSection>
      )}

      {resume.certifications.some((item) => [item.title, item.issuer, item.issueDate, item.url, item.description].some((value) => value?.trim())) && (
        <PreviewSection title="Certificates">
          {resume.certifications.filter((item) => [item.title, item.issuer, item.issueDate, item.url, item.description].some((value) => value?.trim())).map((item) => (
            <Entry key={item.id}>
              <EntryHeading title={certificationTitle(item.title, item.issuer)} dates={formatResumeDate(item.issueDate)} />
              {item.description?.trim() && <p className="resume-entry-description">{item.description}</p>}
              {item.url && <a className="resume-inline-link" href={item.url} target="_blank" rel="noreferrer">Certificate</a>}
            </Entry>
          ))}
        </PreviewSection>
      )}

      {resume.languages.some((item) => item.name.trim()) && (
        <PreviewSection title="Languages">
          <div className="resume-skill-list">
            {resume.languages.filter((item) => item.name.trim()).map((item) => <p key={item.id}><strong>{item.name}</strong>{item.level && ` - ${item.level}`}</p>)}
          </div>
        </PreviewSection>
      )}

      {resume.volunteering.some((item) => [item.position, item.organization, item.location, item.startDate, item.endDate, item.description, ...item.achievements].some((value) => value?.trim())) && (
        <PreviewSection title="Volunteering">
          {resume.volunteering.filter((item) => [item.position, item.organization, item.location, item.startDate, item.endDate, item.description, ...item.achievements].some((value) => value?.trim())).map((item) => (
            <Entry key={item.id}>
              <EntryHeading title={organizationTitle(item.position, item.organization, item.location)} dates={dateRange(item.startDate, item.endDate, item.present)} />
              {item.description?.trim() && <p className="resume-entry-description">{item.description}</p>}
              <BulletList items={item.achievements} />
            </Entry>
          ))}
        </PreviewSection>
      )}
    </article>
  );
}

function PreviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <div className="resume-section-content">{children}</div>
    </section>
  );
}

function Entry({ children }: { children: ReactNode }) {
  return <div className="resume-entry">{children}</div>;
}

function EntryHeading({ title, dates, links }: { title: string; dates: string; links?: { label: string; url: string }[] }) {
  if (!title && !dates && !links?.length) return null;
  return (
    <div className="resume-entry-heading">
      <p className="resume-entry-title">
        {title && <strong>{title}</strong>}
        {links?.map((link) => <span key={link.url}> • <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></span>)}
      </p>
      {dates && <p className="resume-date">{dates}</p>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  const content = items
    .map((item) => item.trim().replace(/^(?:[•*-]|\d+[.)])\s*/, ""))
    .filter(Boolean);
  if (content.length === 0) return null;
  return <ul className="resume-bullets">{content.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>;
}

function dateRange(start: string, end: string | null, present: boolean) {
  return [formatResumeDate(start), present ? "Present" : formatResumeDate(end)].filter(Boolean).join(" - ");
}

function certificationTitle(title: string, issuer: string) {
  if (!title) return issuer;
  if (!issuer) return title;
  return `${title} from ${issuer}`;
}

function organizationTitle(position: string, organization: string, location: string) {
  const role = [position, organization].filter(Boolean).join(" at ");
  return [role, location].filter(Boolean).join(", ");
}

function formatResumeDate(value?: string | null) {
  if (!value) return "";
  const normalized = /^\d{4}$/.test(value) ? `${value}-01-01` : /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
  const parsed = parseISO(normalized);
  return isValid(parsed) ? format(parsed, "MMMM yyyy") : value;
}
