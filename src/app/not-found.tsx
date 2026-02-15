import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4 font-display">404: Lost in Space</h1>
        <p className="text-gray-400 mb-6">
          This cosmic coordinate doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-nebula-blue rounded-lg hover:bg-[#5A90FF] transition-all inline-block"
        >
          Return to Earth
        </Link>
      </div>
    </div>
  );
}
