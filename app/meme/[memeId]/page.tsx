"use client"
import { getMeme } from "@/api/action";
import { useEffect, useState } from "react";

export default function MemePage({params}: {params: {memeId: number}}) {

    const [meme, setMeme] = useState()

    const getInfo = async () => {
        const response = await getMeme(params.memeId);
        if (response.error){
            alert(response.error)
        }
        setMeme(response)
    }

    useEffect(() => {
        getInfo();
    }, [])

    const handleForm = (formData: FormData) => {
        formData.append("memeId", params.memeId + "");

    }


    return <div className="text-white">
        {meme && <img class src={`data:${meme.contentType};base64,${meme.bytes}`}/>}
        {meme && <form action={handleForm}>
                <input type="text" name="usuario" />
                <input type="text" name="comentario" />
            </form>}
        {meme && meme.comentarioList.map((comentario) => (
            <div key={comentario.id}>
            <h1>{comentario.usuario}</h1>
            <p>{comentario.comentario}</p> 
            </div>
        ))}
        
    </div>
}