import VideoSection from "@/features/eskan-wallet/components/VideoSection";
import InvestRoad from "@/features/eskan-wallet/components/InvestRoad";
import WalletProjects from "@/features/eskan-wallet/components/WalletProjects";

const EskanWallet = () => {
  return (
    <div className='page'>
      <h3 className=" bg-[#5FAC23] center white bold  text-xl lg:text-2xl">
        <div className="bg-top h-[20px] bg-[#FEFEFE] rounded-b-[70%]"></div>
        <div className="py-3 text-white text-center">
          اهلا بكم في المحفظة العقارية
        </div>
        <div className="bg-top h-[20px] bg-[#FEFEFE] rounded-t-[70%]"></div>
      </h3>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 place-items-center gap-5 container ">
        <VideoSection />

        <InvestRoad />
      </div>
      <div className="container">
        {" "}
        <WalletProjects />
      </div>
    </div>
  );
};

export default EskanWallet;
