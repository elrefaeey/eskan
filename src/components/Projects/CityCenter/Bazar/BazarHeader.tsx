import { motion } from "framer-motion";
import Image from "next/image";

const BazarHeader = () => {
  return (
    <div className="sec-padding">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-primary h2 text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-bold"
      >
        دور البازار {" > "} سيتي سنتر
      </motion.h2>

      <motion.div
        className="level-image rounded-xl mt-3 shadow-lg overflow-hidden relative"
      >
        <Image
          src="https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/km1aV1odUntitled-2.jpg"
          alt="bazar image"
          width={1200}
          height={300}
          className="rounded-xl w-full h-[300px] lg:h-[500px] object-cover"
          priority
        />
      </motion.div>
    </div>
  );
};

export default BazarHeader;
