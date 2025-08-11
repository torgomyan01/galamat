import Image from "next/image";

function ViewTop() {
  return (
    <div className="w-full overflow-hidden rounded-[27px] shadow-inset">
      <Image
        src="/img/gala-one/top-view-max.png"
        alt="view top"
        width={2000}
        height={1500}
      />
    </div>
  );
}

export default ViewTop;
