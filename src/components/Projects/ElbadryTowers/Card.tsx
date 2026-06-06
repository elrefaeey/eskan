import Image from "next/image";

interface CardProps {
  src: string;
  alt: string;
  title: string;
}

const Card = ({ src, alt, title }: CardProps) => {
  console.log(src);
  return (
    <div className="flex flex-col justify-center items-center h-full px-1 py-4 sm:px-2 rounded-xl bg-[#f0f0f0]">
      <Image
        src={src}
        alt={alt}
        width={44}
        height={44}
        className="w-[34px] h-[34px] md:w-11 md:h-11"
      />

      <h3 className="text-[#444] text-center text-sm md:text-xl my-auto font-medium">
        {title}
      </h3>
    </div>
  );
};

export default Card;
