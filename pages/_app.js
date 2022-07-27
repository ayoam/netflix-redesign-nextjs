import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <NextNProgress color="#e50914"/>
      <Component {...pageProps} />
    </RecoilRoot>
    )
}

export default MyApp
