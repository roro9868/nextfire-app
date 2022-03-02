import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function Home() {
  return (
      <div>
        <Link prefetch={false} href={{
            pathname: '/[username]',
            query:{username:'roro2021'},
        }}>
          <a>
            Roro profile
          </a>
        </Link>

        <Loader show />

        <button onClick={() => toast.success('hello toastlol')}>
          Toast me
        </button>

        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc9AUjqeyOSbHHg0YXRyFnehQdtC2Rut6XEUdSNa4rl_Vkadw/viewform?embedded=true" width="640" height="1992" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        
      </div>
  )
}
