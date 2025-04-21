import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import fs from 'fs/promises';
import path, { parse } from 'path';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

export default function index(props) {
    const[data,setdata]=useState([])
    const [data2,setdata2]=useState([])
    // const [temp,settemp]=useState('')
    const r=useRouter();
    const id=r.query.id
    useEffect(()=>{
        setdata(props.data)
        setdata2(props.data2)
    },[props.data, props.data2])

    console.log(data2)
    console.log(data);
    
     
  return (
    <>
     {data.map(val=>(
      <div key={val.id}>
      <li>{val.title}</li>
      <li>{val.description}</li>
     <Link href={`/Movies/${val.id}/Director`}> {data2.find((director) => director.id === val.directorId)?.name || "Director not found"}</Link>
      <li>{val.releaseYear}</li>
      <li>{val.rating}</li>
      </div>      
    ))}
    </>
  )
}

export async function getStaticProps(context){
    const id=context.params.id;
    const p=path.join(process.cwd(),'Data','Movies.json');
    const p2=await fs.readFile(p);
    const parsed_data=JSON.parse(p2);
    const data=parsed_data.movies;
    const data2=parsed_data.directors;


    const final_data=data.filter(val=>val.genreId===id)

    const final_data2 = data2.map(val => ({
        id:val.id,
        name:val.name,
        biography:val.biography
      }));
    

    return{
        props:{
            data:final_data,
            data2:final_data2,
            // link:id
        }
    }
    
    
}

export async function getStaticPaths(){
    const p = path.join(process.cwd(), 'Data', 'Movies.json');
    const p2 = await fs.readFile(p);
    const parsed_data = JSON.parse(p2);
    const genres = parsed_data.genres;

    const pathss = genres.map(genre => ({
        params: { id: genre.id } 
    }));

    return{
        paths:pathss,
        fallback:true
    }
}
