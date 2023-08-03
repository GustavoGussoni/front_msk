import { musicData } from "@/schemas/music.schema";
import Image from "next/image";
import { BsFillPlayCircleFill } from "react-icons/bs";
interface ICardProps {
  music: musicData;
}

const Card = ({ music }: ICardProps) => {
  return (
    <div className="flex flex-row justify-items-end bg-pink-800 w-72 h-64 rounded-r-lg">
      <div className="flex flex-col items-center min-w-56">
        <p className="m-3 text-xl">{music.name}</p>
        <Image
          className="m-4 mb-2 mt-2 w-52 h-48"
          width={209}
          height={186}
          src={music.cover_image}
          alt="Imagem da musica"
        />
      </div>
      <div className="min-w-16 bg-gray-100 flex justify-center rounded-e-lg">
        <button>
          <BsFillPlayCircleFill className="fill-pink-500 w-10 h-10 m-1" />
        </button>
      </div>
    </div>
  );
};

export default Card;