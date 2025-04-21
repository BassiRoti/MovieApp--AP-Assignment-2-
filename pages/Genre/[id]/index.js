import React from 'react'
import fs from 'fs/promises';
import path, { parse } from 'path';
import { useState,useEffect } from 'react';

export default function index(props) {
    const[data,setdata]=useState([]);
    const [data2,setdata2]=useState([])
    console.log(data)
    useEffect(()=>{
        setdata(props.data)
        setdata2(props.data2)
    },[props.data,props,data2])
    
    return (
        <>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {data.map((val) => (
              <div key={val.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                <li>Title:{val.title}</li>
                <li>Description: {val.description}</li>
                <li>Director:{data2.find((director) => director.id === val.directorId)?.name || "Director not found"}</li>
                <li>Release Year:{val.releaseYear}</li>
                <li>Rating:{val.rating}</li>
              </div>
            ))}
          </ul>
        </>
      );
}

export async function getServerSideProps(context) {
    const p=path.join(process.cwd(),'Data','Movies.json');
    const p2=await fs.readFile(p);
    const parsed_data=JSON.parse(p2);
    const data=parsed_data.movies;
    const data2=parsed_data.directors;
    const linkedid=context.params.id;

    const final_data = data.map(movie => ({
        id: movie.id,
        title: movie.title,
        directorId: movie.directorId,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genreId: movie.genreId,
        rating: movie.rating,
      }));


      const final_data2=final_data.filter(val=>val.genreId===linkedid)
      const final_data3 = data2.map(val => ({
        id:val.id,
        name:val.name,
      }));

      return{
        props:{
            data:final_data2,
            data2:final_data3
        }
      }
}

