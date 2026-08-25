import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <Link className="brand" href="/"><span>SUVANÉ</span><small>RESEARCH</small></Link>
        <nav aria-label="Primary navigation">
          <Link href="/evidence">Evidence Library</Link><Link href="/ask">Ask SUVANÉ</Link><Link href="/case-study">Case Study</Link>
        </nav>
        <span className="status"><i /> Research prototype</span>
      </div>
    </header>
  );
}
