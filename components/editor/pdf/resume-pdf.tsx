import { Document, Font, Link, Page, Text, View } from "@react-pdf/renderer";
import { format, isValid, parseISO } from "date-fns";
import type { ReactNode } from "react";
import type { TResume } from "@/types/resume";
import { pdfStyles as styles } from "./pdf-styles";

if (typeof window !== "undefined") {
  Font.register({
    family: "Resume Carlito",
    src: new URL("/fonts/carlito-regular.ttf", window.location.origin).toString(),
    fontWeight: 400,
  });
  Font.register({
    family: "Resume Carlito",
    src: new URL("/fonts/carlito-bold.ttf", window.location.origin).toString(),
    fontWeight: 700,
  });
}

export function ResumePdf({ resume }: { resume: TResume }) {
  const info = resume.personalInfo;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const contact = [info.address, info.email, info.phone].filter(Boolean);
  const experiences = [...resume.experience, ...resume.internships].filter((item) =>
    [item.position, item.company, item.location, item.startDate, item.endDate, item.description, ...(item.achievements ?? [])].some((value) => value?.trim()),
  );
  const socials = info.socialLinks.filter((link) => link.url);

  return (
    <Document title={`${fullName || resume.name} Resume`} author={fullName || undefined}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {fullName && <Text style={styles.name}>{fullName.toUpperCase()}</Text>}
          {info.position && <Text style={styles.position}>{info.position.toUpperCase()}</Text>}
          {contact.length > 0 && (
            <Text style={styles.contact}>
              {contact.map((item, index) => (
                <Text key={`${item}-${index}`}>
                  {index > 0 ? " | " : ""}
                  {item === info.email ? <Link src={`mailto:${item}`} style={styles.link}>{item}</Link> : item}
                </Text>
              ))}
            </Text>
          )}
          {socials.length > 0 && (
            <Text style={styles.socials}>
              {socials.map((item, index) => (
                <Text key={item.id}>
                  {index > 0 ? " | " : ""}
                  <Link src={item.url} style={styles.link}>
                    {item.platform === "Other" ? item.customPlatform || item.url : item.platform}
                  </Link>
                </Text>
              ))}
            </Text>
          )}
        </View>

        {info.profileSummary.trim() && <Section title="Profile"><Text style={styles.sectionBody}>{info.profileSummary}</Text></Section>}

        {experiences.length > 0 && (
          <Section title="Experience">
            {experiences.map((item, index) => (
              <Entry key={item.id} last={index === experiences.length - 1}>
                <EntryHeading title={organizationTitle(item.position, item.company, item.location)} dates={dateRange(item.startDate, item.endDate, item.present)} />
                {item.description?.trim() && <Text style={styles.entryDescription}>{item.description}</Text>}
                <BulletList items={item.achievements ?? []} />
              </Entry>
            ))}
          </Section>
        )}

        {resume.skills.some((item) => item.category.trim() || item.description.trim()) && (
          <Section title="Skills">
            <View style={styles.skillList}>
              {resume.skills.filter((item) => item.category.trim() || item.description.trim()).map((item) => (
                <Text key={item.id}>
                  {item.category.trim() ? <Text style={{ fontWeight: 700 }}>{item.category}: </Text> : null}
                  {item.description}
                </Text>
              ))}
            </View>
          </Section>
        )}

        {resume.projects.some((item) => item.name || item.description || item.technologies || item.links?.length) && (
          <Section title="Projects">
            {resume.projects.filter((item) => item.name || item.description || item.technologies || item.links?.length).map((item, index, entries) => (
              <Entry key={item.id} last={index === entries.length - 1}>
                <EntryHeading
                  title={item.name}
                  dates={dateRange(item.startDate, item.endDate, item.present)}
                  links={item.links?.filter((link) => link.url).map((link) => ({ label: link.label || link.url, url: link.url }))}
                />
                {item.description.trim() && <Text style={styles.entryDescription}>{item.description}</Text>}
                <BulletList items={item.achievements ?? []} />
                {item.technologies.trim() && <Text style={styles.entryDescription}><Text style={{ fontWeight: 700 }}>Technologies: </Text>{item.technologies}</Text>}
              </Entry>
            ))}
          </Section>
        )}

        {resume.education.some((item) => [item.degree, item.institution, item.location, item.startDate, item.endDate, item.description, item.gpa, ...(item.achievements ?? [])].some((value) => value?.trim())) && (
          <Section title="Education">
            {resume.education.filter((item) => [item.degree, item.institution, item.location, item.startDate, item.endDate, item.description, item.gpa, ...(item.achievements ?? [])].some((value) => value?.trim())).map((item, index, entries) => (
              <Entry key={item.id} last={index === entries.length - 1}>
                <EntryHeading title={organizationTitle(item.degree, item.institution, item.location)} dates={dateRange(item.startDate, item.endDate, item.present)} />
                {item.description?.trim() && <Text style={styles.entryDescription}>{item.description}</Text>}
                {item.gpa.trim() && <Text style={styles.entryDescription}><Text style={{ fontWeight: 700 }}>GPA: </Text>{item.gpa}</Text>}
                <BulletList items={item.achievements ?? []} />
              </Entry>
            ))}
          </Section>
        )}

        {resume.certifications.some((item) => [item.title, item.issuer, item.issueDate, item.url, item.description].some((value) => value?.trim())) && (
          <Section title="Certificates">
            {resume.certifications.filter((item) => [item.title, item.issuer, item.issueDate, item.url, item.description].some((value) => value?.trim())).map((item, index, entries) => (
              <Entry key={item.id} last={index === entries.length - 1}>
                <EntryHeading title={certificationTitle(item.title, item.issuer)} dates={formatResumeDate(item.issueDate)} />
                {item.description?.trim() && <Text style={styles.entryDescription}>{item.description}</Text>}
                {item.url && <Text style={styles.entryDescription}><Link src={item.url} style={styles.link}>Certificate</Link></Text>}
              </Entry>
            ))}
          </Section>
        )}

        {resume.languages.some((item) => item.name.trim()) && (
          <Section title="Languages">
            <View style={styles.skillList}>
              {resume.languages.filter((item) => item.name.trim()).map((item) => (
                <Text key={item.id}><Text style={{ fontWeight: 700 }}>{item.name}</Text>{item.level && ` - ${item.level}`}</Text>
              ))}
            </View>
          </Section>
        )}

        {resume.volunteering.some((item) => [item.position, item.organization, item.location, item.startDate, item.endDate, item.description, ...(item.achievements ?? [])].some((value) => value?.trim())) && (
          <Section title="Volunteering">
            {resume.volunteering.filter((item) => [item.position, item.organization, item.location, item.startDate, item.endDate, item.description, ...(item.achievements ?? [])].some((value) => value?.trim())).map((item, index, entries) => (
              <Entry key={item.id} last={index === entries.length - 1}>
                <EntryHeading title={organizationTitle(item.position, item.organization, item.location)} dates={dateRange(item.startDate, item.endDate, item.present)} />
                {item.description?.trim() && <Text style={styles.entryDescription}>{item.description}</Text>}
                <BulletList items={item.achievements ?? []} />
              </Entry>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <View style={styles.section} wrap><Text style={styles.sectionHeading} minPresenceAhead={16}>{title.toUpperCase()}</Text>{children}</View>;
}

function Entry({ children, last }: { children: ReactNode; last: boolean }) {
  return <View style={[styles.entry, last ? { marginBottom: 0 } : undefined]} minPresenceAhead={24}>{children}</View>;
}

function EntryHeading({ title, dates, links }: { title: string; dates: string; links?: { label: string; url: string }[] }) {
  if (!title && !dates && !links?.length) return null;
  return (
    <View style={styles.entryHeading}>
      <Text style={styles.entryTitle}>
        {title && <Text style={{ fontWeight: 700 }}>{title}</Text>}
        {links?.map((link) => <Text key={link.url}> • <Link src={link.url} style={styles.link}>{link.label}</Link></Text>)}
      </Text>
      {dates && <Text style={styles.date}>{dates}</Text>}
    </View>
  );
}

function BulletList({ items }: { items: string[] }) {
  const content = items.map((item) => item.trim().replace(/^(?:[•*-]|\d+[.)])\s*/, "")).filter(Boolean);
  if (content.length === 0) return null;
  return <View style={styles.bulletList}>{content.map((item, index) => <View key={`${index}-${item}`} style={styles.bullet}><Text style={styles.bulletMarker}>•</Text><Text style={styles.bulletText}>{item}</Text></View>)}</View>;
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
