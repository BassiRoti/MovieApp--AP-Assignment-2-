import { Geist, Geist_Mono } from "next/font/google";
import fs from 'fs/promises';
import path, { parse } from 'path';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home(props) {
  console.log(props.data)
  const [data,setdata]=useState([]);
  useEffect(()=>{
    const temp=props.data.filter(val=>val.rating>=8.5);
    setdata(temp);
  },[props.data])
  const r=useRouter();

  const handleclick=()=>{
    r.push('/Genre')
  }

  return (
    <>
      <h2>Top Rated Movies</h2>
      <ul>
        {data.map(val => (
          <li key={val.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}>
            <div><strong>{val.title}</strong></div>
            <div>Release Year: {val.releaseYear}</div>
            <div>Rating: {val.rating}</div>
          </li>
        ))}
      </ul>
  
      <div style={{ marginTop: '20px' }}>
        <button style={{cursor:'pointer'}} onClick={handleclick}>Browse Genres</button>
      </div>
  
      <div style={{ marginTop: '10px' }}>
        <Link href='/Movies'>
          <button style={{cursor:'pointer'}}> Explore Movies</button>
        </Link>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const p = path.join(process.cwd(), "Data", "Movies.json");
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);

  const movies = parsed_data.movies;

  const filtered_data = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    directorId: movie.directorId,
    description: movie.description,
    releaseYear: movie.releaseYear,
    genreId: movie.genreId,
    rating: movie.rating,
  }));

  return {
    props: {
      data: filtered_data,
    },
    revalidate:30
  };
}

