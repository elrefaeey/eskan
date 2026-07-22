import HeroCurrentImage from "./HeroCurrentImage";
import HeroImageOverlay from "./HeroImageOverlay";
import HeroLoadingOverlay from "./HeroLoadingOverlay";
import HeroNextImage from "./HeroNextImage";
import HeroTileGrid from "./HeroTileGrid";

interface HeroImagePanelProps {
  heroImages: string[];
  currentImageIndex: number;
  nextImageIndex: number;
  animationKey: number;
  isLoading: boolean;
  isMobileIntro: boolean;
  tileOffsets: number[];
}

export default function HeroImagePanel({
  heroImages,
  currentImageIndex,
  nextImageIndex,
  animationKey,
  isLoading,
  isMobileIntro,
  tileOffsets,
}: HeroImagePanelProps) {
  return (
    <div
      className="relative order-0 lg:order-0 lg:self-auto self-end
        lg:absolute lg:inset-y-0 lg:left-0 w-full lg:w-[50%] xl:w-[57%] 2xl:w-[55%]
         3xl:w-[48%]
        h-104 lg:h-auto md:mt-6 lg:mt-0 overflow-hidden
         shadow-[16px_21px_30px_0px_#00000040_inset]
        lg:rounded-br-[12px] lg:rounded-tr-[180px]"
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-50
        lg:rounded-tr-[180px] shadow-[1px_2px_20px_4px_#00000080_inset]"
      />

      {isLoading && <HeroLoadingOverlay />}

      <div className="absolute inset-0">
        {currentImageIndex >= 0 && (
          <HeroCurrentImage
            src={heroImages[currentImageIndex]}
            index={currentImageIndex}
          />
        )}
      </div>

      <div className="absolute inset-0 z-10">
        <HeroNextImage
          src={heroImages[nextImageIndex]}
          index={nextImageIndex}
          isMobileIntro={isMobileIntro}
        />
      </div>

      <HeroTileGrid animationKey={animationKey} tileOffsets={tileOffsets} />
      <HeroImageOverlay />
    </div>
  );
}
