import { isRouteErrorResponse, useRouteError,Link } from "react-router" 
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
// import Footer from "@/components/Footer"
import { pageNotFound } from "@/assets"
function RootErrorBoundary() {
    const error = useRouteError();
    
  return (
    <div className="min-h-[100dvh] flex flex-col">
        <Header>
        </Header>
        <div className="grow container flex flex-col items-center justify-center pt-32 pb-12">
            <h1 className="text-2xl font-semibold text-center sm:text-4xl">
                {isRouteErrorResponse(error) ? 'Oops! Page Doesn\'t exist' : 'Oops! Something went wrong'}
            </h1>
            <p className="text-muted-foreground text-center mx-w-[55ch] mt-4 mb-6 sm:text-lg">
                {isRouteErrorResponse(error) ? 'The page you are looking for doesn\'t exist' : 'Something went wrong. Please try again later'}
            </p>
            <div className="flex gap-4">
                <Button asChild >
                    <Link to = '/'>Go to Home</Link>
                </Button>
                <Button asChild variant='ghost'>
                    <Link to='/app/inbox'>View Inbox</Link>
                </Button>
            </div>
            <figure>
                <img src={pageNotFound} width={560} height = {373} alt="404 error image" />
            </figure>
        </div>




    </div>
  )
}

export default RootErrorBoundary
