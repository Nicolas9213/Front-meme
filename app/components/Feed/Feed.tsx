import { createMeme, getAllMemes } from "@/api/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { RiWhatsappFill } from "react-icons/ri";


const Feed = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [formState, createMemeAction] = useFormState(createMeme, {});
    const [memes, setMemes] = useState<Array<any>>();
    useEffect(() => {
      getInfo();
    }, [])

    useEffect(() => {
        if (formState.error) {
            alert(formState.error)
            return;
        }
        formRef.current?.reset();
        getInfo();
    }, [formState])
  
    const getInfo = async () => {
      const response = await getAllMemes();
      if (response.error) {
        alert(response.error);
        return;
      }
      if (response.page) {
        setMemes(response.page.content);
      }
    }
    return (
      <div style={styles.feedContainer}>
        <h1 className="font-bold text-[4rem] w-full">MEMEPAGE!</h1>
        <form className="flex flex-col gap-2" ref={formRef} action={createMemeAction}>
            <input type="file" multiple name="multipartFiles" required />
            <button className="bg-[#E83C95] p-2 shadow-sm shadow-[#E83C95] rounded-sm">Enviar</button>
        </form>
        {memes && memes.map((meme, index) => (
          <div>
            <Link key={meme.id} href={`/meme/${meme.id}`}>
                <img src={"data:" + meme.contentType + ";base64," + meme.bytes} alt={`Imagem ${meme.id}`} style={styles.image} />
            </Link>
            <a href={`https://wa.me?text=Confira%20este%20meme:%20localhost:3000/meme/${meme.id}`}><RiWhatsappFill /></a>
            </div>
        ))}
      </div>
    );
  };
  
  const styles = {
    feedContainer: {
        color: "white",
      backgroundColor: "#151A20",
      borderRadius: "16px",
      display: 'flex',
      flexDirection: "column",
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: "20px",
      padding: '20px',
    },
    imageWrapper: {
      margin: '10px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    image: {
      width: '300px',
      height: '300px',
    },
  };
  
  export default Feed;
