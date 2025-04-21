import { useRouter } from 'next/router'
import React from 'react'

export default function index() {
  const r=useRouter();
  const {slug}=r.query
  console.log(slug)
  const last=slug?.[slug.length-1] || "loading..."
  return (
    <div>
     this is {last} page
    </div>
  )
}
