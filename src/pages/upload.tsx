import UploadImageForm from "@/components/uploadImageForm";
import UploadMusicForm from "@/components/uploadMusicForm";
import { useMusic } from "@/contexts/musicContext";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";

const UploadMusic: NextPage = () => {
  const { page } = useMusic();
  const router = useRouter();
  const pageDisplay = () => {
    if (page === 0) {
      return <UploadMusicForm />;
    } else {
      return <UploadImageForm />;
    }
  };

  return (
    <main className="body  min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="btn-primary m-6">
        Sair
      </button>
      <form className="">
        <div>{pageDisplay()}</div>
      </form>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies["musicApp.token"]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default UploadMusic;
