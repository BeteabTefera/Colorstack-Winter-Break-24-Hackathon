import { Suspense } from 'react'
import VerifyForm from './verify-form'
import Loading from '../loading'

export default function VerifyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyForm />
    </Suspense>
  )
}

