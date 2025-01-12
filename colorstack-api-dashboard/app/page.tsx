import LandingPage from '@/components/LandingPage'

export default function Home() {
  return <LandingPage />
}

// This function gets called at build time
export async function getStaticProps() {
  // You can fetch data here if needed for the landing page
  return {
    props: {}, // will be passed to the page component as props
  }
}

