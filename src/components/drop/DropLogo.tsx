import logoWhite from "@/assets/drop-logo-negativo.webp";
import logoBlack from "@/assets/drop-logo-oficial.webp";

/** Logo de DROP: blanco sobre fondos oscuros y negro en los drops de fondo claro (ver styles.css). */
export function DropLogo({ className = "" }: { className?: string }) {
  return (
    <>
      <img decoding="async" src={logoWhite} alt="DROP" className={`drop-logo-white ${className}`} />
      <img decoding="async" src={logoBlack} alt="DROP" className={`drop-logo-black ${className}`} />
    </>
  );
}
