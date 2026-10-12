
export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section-x section-y flex min-h-[60vh] flex-col items-start justify-center gap-6">
      <p className="eyebrow m-0">404</p>
      <h1 className="m-0 font-serif text-[clamp(40px,6vw,80px)] font-light leading-none">This page has moved.</h1>
      <p className="m-0 max-w-[48ch] text-olive-muted">The listing may have sold. Browse current landowner share projects instead.</p>
      <div className="flex flex-wrap gap-3">
        <a href="/#projects" className="btn-olive">View projects</a>
        <a href="/" className="btn-outline">Home</a>
      </div>
    </section>
  );
}
