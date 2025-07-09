import Image from "next/image";
import PrintStatus from "@/components/common/product-item/print-status";
import Link from "next/link";
import { formatPrice } from "@/utils/consts";

interface IThisProps {
  project: IProjectMerged;
}

function ProductItem({ project }: IThisProps) {
  return (
    <Link
      href={project?.page_url || "#"}
      className="w-full bg-white rounded-[16px] p-[15px] cursor-pointer group flex-jsb-c flex-col"
    >
      <div className="w-full p-[15px]">
        <h2 className="text-[22px] md:text-[28px] lg:text-[35px] font-medium">
          {project.title}
        </h2>
        <h3 className="text-[18px] md:text-[23px] text-[#353535]">
          {project?.address}
        </h3>
        <h3 className="text-[18px] md:text-[23px] text-[#353535] opacity-40">
          от {formatPrice(project?.min_price || 0)}
        </h3>
      </div>
      <div className="w-full h-[250px] md:h-[383px] bg-[#E0E0E0] rounded-[7px] overflow-hidden flex-jc-c relative">
        {project.position ? (
          <PrintStatus
            position={project.position}
            className="absolute top-4 left-4 z-10 text-white px-4 rounded-[4px]"
          />
        ) : null}
        <Image
          src={project.images[0]?.url || "/img/def-proj.svg"}
          className="!rounded-[8px] w-full h-full object-cover object-center transition transform group-hover:scale-[1.05]"
          alt={project.title}
          width={700}
          height={500}
        />
      </div>
    </Link>
  );
}

export default ProductItem;
