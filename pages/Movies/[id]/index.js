import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

export default function index() {
    const r=useRouter();
    const id=r.query.id
  return (
    <div>
      detailed movies page {id}
    </div>
  )
}
