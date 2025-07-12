import Image from 'next/image';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Image
          src="/matrixlogo.svg"
          alt="Matrix Logo"
          width={70}
          height={70}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900">
          AI × Expertise Matrix
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore the four quadrants of AI adoption and domain expertise to understand
        the opportunities, risks, and optimal strategies for each combination.
      </p>
    </div>
  );
}