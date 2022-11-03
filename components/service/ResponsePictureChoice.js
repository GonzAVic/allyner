import Image from "next/image";

const ResponsePictureChoice = ({ options }) => {
  return (
    <div>
      <Image
        src={
          "https://allyner-1.sfo3.digitaloceanspaces.com/1667493043298_Screen%20Shot%202022-10-27%20at%2016.33.35.png"
        }
        alt="Picture of the author"
        width={500}
        height={500}
      />
      {options.map((imageSrc, index) => {
        return (
          <Image
            key={index}
            src={
              "https://allyner-1.sfo3.digitaloceanspaces.com/1667493043298_Screen%20Shot%202022-10-27%20at%2016.33.35.png"
            }
            alt="Picture of the author"
            width={500}
            height={500}
          />
        );
      })}
    </div>
  );
};

export default ResponsePictureChoice;
