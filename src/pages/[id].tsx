import MusicContainer from "@/components/musicContainer";
import { musicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface MusicProps {
  music: musicData;
}

const Music: NextPage<MusicProps> = ({ music }: MusicProps) => {
  const router = useRouter();
  return (
    <main className="body min-h-screen">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="btn-primary m-6">
        Voltar
      </button>
      <div className="flex items-center justify-center">
        <MusicContainer music={music} />
      </div>
    </main>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "7088eb85-e5d6-44b7-871e-e09fa7768416" } }],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<MusicProps> = async (ctx) => {
  const id = ctx.params!.id;
  const response = await api.get<musicData>(`/musics/${id}`);

  return { props: { music: response.data }, revalidate: 60 };
};

export default Music;
