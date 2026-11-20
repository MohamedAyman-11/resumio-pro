type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`lg:max-w-2xl  w-full text-center lg:text-left ${className} `}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary sm:text-sm text-center lg:text-left">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-px w-4 align-middle bg-primary/70"
        />
        {eyebrow}
      </p>
      <h2 className="mt-2.5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ">
        {title}
      </h2>
      <p className="mt-3 lg:max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 w-full ">
        {description}
      </p>
    </div>
  );
}
