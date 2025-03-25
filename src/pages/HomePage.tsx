
import {Link} from 'react-router'

import { Button } from '@/components/ui/button'
import Head from '../components/Head'


import { heroBannerSm, heroBannerLg } from '@/assets'
function HomePage() {
  return (
    <>
      <Head title = 'Saadhy AI - AI Powered Task Management'/>
      <section>
          <div className="container !px-8 grid grid-cols-1 gap-8 items-center xl:gap-12 xl:grid-cols-[1fr_1.5fr]">
            <div className="flex flex-col items-center gap-4 text-center space-y-4 lg:text-6xl lg:items-start lg:space-y-6">
              <h1 className="text-4xl  font-semibold max-w-[22ch] md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl">
                
                Focus on what matters—<span className='inline-flex bg-gradient-to-t from-primary/50 to-primary/30 rounded-full px-2 overflow-hidden'>AI</span> handles the rest!
              </h1>
              <p className='max-w-[48ch] text-foreground/80 md:text-lg lg:text-xl'>
              Turn chaos into clarity—auto-sort tasks, manage projects, and boost your focus with    <span className=''>
                          AI-driven
                        </span> 
                insights!
              </p>

              <Button asChild size='lg'>
                <Link to = '/register'>Get Started !</Link>
              </Button>
            </div>
            <figure className='bg-secondary rounded-2xl overflow-hidden aspect-square max-md:max-w-[480px] max-md:mx-auto md:aspect-video ' >
              <img src={heroBannerSm} width={480} height={480} alt="Saadhya web" 
              className='md:hidden '/>
              <img src={
                heroBannerLg
              } width={960} height={540} className="max-md:hidden" 
             
               alt="Saadhya web" />
            </figure>
          </div>
      </section>
    </>
  )
}

export default HomePage