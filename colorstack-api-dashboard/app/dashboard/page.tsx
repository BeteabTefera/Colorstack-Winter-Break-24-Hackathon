import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  return <Dashboard />
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

