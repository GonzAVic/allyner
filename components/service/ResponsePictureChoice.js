import Image from "next/image";

const ResponsePictureChoice = ({ options }) => {
  return (
    <div>
      {options.map((imageSrc, index) => {
        return (
          <Image
            key={index}
            src={imageSrc}
            alt="image choice"
            width={500}
            height={500}
          />
        );
      })}
    </div>
  );
};

export default ResponsePictureChoice;
