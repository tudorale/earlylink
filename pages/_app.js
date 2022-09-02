import '../styles/globals.css'
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
        <title>EarlyLink</title>
        <meta name="description" content="Discover The Most Hyped NFT Projects" />
        <meta name="author" content="Tudor Alexandru @exampleSOL"></meta>
        <link rel="icon" href="/logo.png" />
    </Head>
    <Component {...pageProps}/>
  
  </>
}

export default MyApp
