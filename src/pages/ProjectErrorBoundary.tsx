import TopAppBar from "@/components/TopAppBar"
import { pageNotFound } from "@/assets"
import Head from "@/components/Head"

const ProjectErrorBoundary = () => {
  return (
    <>
        <Head title="Project not found"></Head>
        <TopAppBar title="Project not found"></TopAppBar>

        <div className="grow container flex flex-col justify-center items-center">
            <figure className="mt-10">
                <img src={pageNotFound} alt="404 page not found " width={360}/>
            </figure>
            <h1 className="text-2xl font-semibold text-center mt-4 mb-2">Project not found </h1>
            <p className="text-muted-foreground max-w-[40ch] text-center">
                Uh-oh ! No project matches thid ID !
            </p>
        </div>
    </>
  )
}

export default ProjectErrorBoundary