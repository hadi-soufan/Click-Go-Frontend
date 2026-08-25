import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-full lg:max-w-container-max flex-col items-center gap-4 px-margin-mobile py-24 text-center md:px-margin-desktop">
      <h1 className="text-headline-xl font-headline-xl text-on-background">404</h1>
      <p className="text-body-lg text-on-surface-variant">We couldn&apos;t find the page you were looking for.</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-6 py-3 text-label-bold font-label-bold text-on-primary hover:bg-surface-tint"
      >
        Back to home
      </Link>
    </div>
  );
}
