import React, { use, useEffect, useState } from 'react'
import fs from 'fs/promises';
import path, { parse } from 'path';
import { useRouter } from 'next/router';

export default function index(props) {
    const[data,setdata]=useState([]);
    const [data2,setdata2]=useState([]);
    const [selectedGenre,setSelectedGenre]=useState('');
    const [flag,setflag]=useState(false);
    const [filtereddata,setfiltereddata]=useState([]);
    useEffect(()=>{
        setdata(props.data)
    },[props.data])

    useEffect(()=>{
        setdata2(props.data2)
    },[props.data2])

    const r=useRouter();
    const handleclick=(id)=>{
        r.push(`/Movies/g${id}`)
    }

    const handleGenreChange = (e) => {
        const selectedGenreId = e.target.value;
        setSelectedGenre(selectedGenreId);
        setflag(true);

        const temp = data.filter((movie) => movie.genreId === selectedGenreId);
        setfiltereddata(temp);
    };
return (
  <>
    <select 
      onChange={(e) => handleGenreChange(e)} 
      name="genre" 
      id="genre" 
      value={selectedGenre} 
      style={{ marginBottom: '20px' }}
    >
      {data2.map((val) => (
        <option key={val.genre_id} value={val.genre_id}>
          {val.genre_name}
        </option>
      ))}
    </select>

    {!flag ? (
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {data.map((val) => (
          <div key={val.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd' }}>
            <li>Title: {val.title}</li>
            <li>Release Year: {val.releaseYear}</li>
            <li>Rating: {val.rating}</li>
            <button 
              onClick={() => handleclick(val.id)} 
              style={{cursor:'pointer'}}
            >
              Explore
            </button>
          </div>
        ))}
      </ul>
    ) : (
      filtereddata.map((val) => (
        <div key={val.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd' }}>
          <li>Title: {val.title}</li>
          <li>Release Year: {val.releaseYear}</li>
          <li>Rating: {val.rating}</li>
          <button 
            onClick={() => handleclick(val.id)}
            style={{cursor:'pointer'}}
          >
            Explore
          </button>
        </div>
      ))
    )}
  </>
);
}

export async function getStaticProps() {
    const p=path.join(process.cwd(),'Data','Movies.json');
    const p2=await fs.readFile(p);
    const parsed_data=JSON.parse(p2);
    const data=parsed_data.movies;
    const data2=parsed_data.genres;

    const final_data = data.map(movie => ({
        id: movie.id,
        title: movie.title,
        directorId: movie.directorId,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genreId: movie.genreId,
        rating: movie.rating,
      }));

      const final_data2=data2.map(genre=>(
        {
            genre_id:genre.id,
            genre_name:genre.name
        }
      ))

      return{
        props:{
            data:final_data,
            data2:final_data2
        },
        revalidate:30
      }
}
