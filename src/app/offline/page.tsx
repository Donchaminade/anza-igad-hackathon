import Link from "next/link";

export const metadata = {
  title: "Offline — ANZA",
};

export default function OfflinePage() {
  return (
    <div className="page">
      <h1 style={{ fontFamily: "var(--font-display)" }}>You are offline</h1>
      <p>
        ANZA cached the shell. Open a previously viewed alert — fallback explains work without a
        network or LLM key.
      </p>
      <Link href="/alerts" className="btn btn-primary">
        Try alerts
      </Link>
    </div>
  );
}
