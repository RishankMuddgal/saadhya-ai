import {Link, useLocation} from 'react-router'

import Logo from '@/components/Logo'
import {Button} from '@/components/ui/button'
// import { Ghost } from 'lucide-react'
function Header() {
    const location = useLocation();
  return (
    <header className="fixed  top-0 left-0 w-full p-4 ">
        <div className="container h-16  backdrop-blur-3xl rounded-xl  flex items-center justify-between gap-10">
            <Link to = '/' >
                <Logo/>
            </Link>
            <div className="flex items-center gap-2 flex-wrap justify-end">
                {location.pathname !== '/login' && (
                    <Button asChild 
                        variant='ghost'
                        >
                            <Link to = '/login'>Sign In !</Link>
                            
                    </Button>
                )}
                {
                    location.pathname !== '/register' &&(
                        <Button asChild>
                            <Link to = '/register'>Let's start for free !</Link>
                        </Button>
                    )
                }
                
            </div>
        </div>
    </header>
  )
}

export default Header