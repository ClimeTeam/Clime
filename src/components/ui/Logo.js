import Image from 'next/image';

export default function Logo() {
  return (
    <div className="absolute top-4 left-4 z-[1000] hidden md:block">
      <Image
        src="/clime-logo.png"
        alt="CLIME"
        width={60}
        height={30}
        className="object-contain rounded-4xl shadow-md"
      />
    </div>
  );
}