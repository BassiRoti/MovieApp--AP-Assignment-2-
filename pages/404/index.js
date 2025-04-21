import React from 'react'
import Link from 'next/link'

export default function index() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Ahhh snap page not found</h2>
      <br />
      <Link href='/'><button style={{ padding: '10px 20px', fontSize: '16px' }}>Go Home</button></Link>
    </div>
  );
}
