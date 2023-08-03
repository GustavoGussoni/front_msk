import Card from "@/components/card";
import { musicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";

interface HomeProps {
  musics: musicData[];
}

const Home: NextPage<HomeProps> = ({ musics }) => {
  console.log(musics);
  return (
    <main
      className={`body grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 min-h-screen justify-items-center p-24`}>
      {musics.map((music) => {
        return <Card key={music.id} music={music}></Card>;
      })}
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
