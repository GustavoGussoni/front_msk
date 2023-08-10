import Card from "@/components/card";
import Header from "@/components/header";
import { usePlayer } from "@/contexts/playerContext";
import { musicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface HomeProps {
  musics: musicData[];
}

const Home: NextPage<HomeProps> = ({ musics }) => {
  const { setPlaylist } = usePlayer();
  const router = useRouter();
  useEffect(() => {
    setPlaylist(musics);
  }, []);
  return (
    <main className={`body  min-h-screen p-6 `}>
      <div className="flex justify-between content-center">
        <Header />
        <button
          className="btn-primary mb-6"
          onClick={() => {
            router.push("/upload");
          }}>
          Nova música
        </button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center">
        {musics.map((music) => {
          return <Card key={music.id} music={music} />;
        })}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<musicData[]>("/musics");

  return {
    props: { musics: response.data }
  };
};

export default Home;
