import React from 'react'
import fs from 'fs/promises';
import path, { parse } from 'path';
import useSWR from 'swr';

export default function index(props) {
  return (
    <div>
      director {props.temp}
    </div>
  )
}
/// use SWR, learn it first
export async function getStaticProps(context){
   const id=context.params.id
       const p=path.join(process.cwd(),'Data','Movies.json');
       const p2=await fs.readFile(p);
       const parsed_data=JSON.parse(p2);
       const data=parsed_data.movies;

   return{
    props:{
        temp:id
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
