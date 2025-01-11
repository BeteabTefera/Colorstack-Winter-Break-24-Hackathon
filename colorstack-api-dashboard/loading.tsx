import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-xl mb-4">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
        Return Home
      </Link>
    </div>
  )
}