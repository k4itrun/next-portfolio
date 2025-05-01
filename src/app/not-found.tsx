import { Button } from "@/components/Button";

export default function NotFound() {
 return (
  <div className="flex flex-col items-center justify-center py-56 space-y-6">
   <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-color-layout to-white">404</h1>
   <p className="text-2xl text-gray-500 dark:text-gray-500">Page not found.</p>
   <Button variant="secondary" href="/">
    Back to top
   </Button>
  </div>
 );
}
