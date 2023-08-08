import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { musicData, musicRequest } from "@/schemas/music.schema";
import { parseCookies } from "nookies";
import Toast from "@/components/toast";

interface Props {
  children: ReactNode;
}

interface MusicProviderData {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  musicInfo: musicRequest;
  setMusicInfo: Dispatch<SetStateAction<musicRequest>>;
  coverImage: File | null;
  setCoverImage: Dispatch<SetStateAction<File | null>>;
  music: File | null;
  setMusic: Dispatch<SetStateAction<File | null>>;
  createMusic: () => void;
}

const MusicContext = createContext<MusicProviderData>({} as MusicProviderData);

export function MusicProvider({ children }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const cookies = parseCookies();

  if (cookies["musicApp.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["musicApp.token"]}`;
  }
  const [musicInfo, setMusicInfo] = useState({
    name: "",
    artist: "",
    album: "",
    genre: "",
    year: ""
  });
  const [music, setMusic] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const uploadFiles = async (musicId: string, music: File, coverImage: File) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const fd = new FormData();
    if (music.name.includes("mp3") && coverImage.name.includes("jpg")) {
      fd.append("music", music);
      fd.append("cover_image", coverImage);
      const status = await api
        .patch(`musics/upload/${musicId}`, fd, config)
        .then((res) => res.status);
      return { status };
    }
    return { status: 400 };
  };

  const createMusic = () => {
    api
      .post<musicData>("/musics", musicInfo)
      .then((res) => uploadFiles(res.data.id, music!, coverImage!))
      .then((res) => {
        res.status === 200
          ? Toast({ message: "Música cadastrada com sucesso!", isSucess: true })
          : "deletar a musica"; //fazer endpoint delete no backend e arrumar aqui
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao cadastrar a musica!" });
      });
  };
  return (
    <MusicContext.Provider
      value={{
        music,
        setMusic,
        page,
        setPage,
        coverImage,
        setCoverImage,
        musicInfo,
        setMusicInfo,
        createMusic
      }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
