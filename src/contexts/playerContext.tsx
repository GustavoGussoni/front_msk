import Player from "@/components/player";
import { CurrentMusicType, musicData } from "@/schemas/music.schema";

import { MutableRefObject, ReactNode, createContext, useContext, useRef, useState } from "react";

interface Props {
  children: ReactNode;
}

interface PlayerProviderData {
  currentMusic: CurrentMusicType;
  setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
  playList: musicData[];
  setPlaylist: (data: musicData[]) => void;
  audioRef: MutableRefObject<HTMLAudioElement | undefined>;
}

const defaultMusic: CurrentMusicType = {
  id: "kenzie",
  cover_image: "",
  name: "",
  artist: "",
  album: "",
  genre: "",
  music_url: "",
  year: "",
  isPlaying: false
};

const PlayerContext = createContext<PlayerProviderData>({} as PlayerProviderData);

export const PlayerProvider = ({ children }: Props) => {
  const [musics, setMusics] = useState<musicData[]>([]);
  const [current, setCurrent] = useState<CurrentMusicType>(defaultMusic);
  const audioRef = useRef<HTMLAudioElement>();
  const setCurrentMusic = (music: Partial<CurrentMusicType>, replace = false) => {
    if (replace && music.music_url !== current.music_url) {
      setCurrent(music as CurrentMusicType);
    } else {
      setCurrent((prev) => ({ ...prev, ...music }));
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentMusic: current,
        setCurrentMusic,
        playList: musics,
        setPlaylist: setMusics
      }}>
      {children}
      {current.music_url && <Player />}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
