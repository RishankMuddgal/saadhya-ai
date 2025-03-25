import { Separator } from "@/components/ui/separator"
import { SOCIAL_LINKS } from "@/constants"
function Footer() {
  return (
    <footer className="p-4 pb-0">
        <div className="container min-h-16 py-4 bg-background border-t rounded-t-xl flex items-center justify-between flex-col gap-3 lg:flex-row">
            <p className="text-sm text-muted-foreground">
                &copy; 2025 Saadhyai
            </p>
            <ul className="flex flex-wrap items-center">
                {SOCIAL_LINKS.map(({href, label },index) => (
                    <li key={index}
                        className="flex items-center">
                        <a href={href} target="_blank"
                        className="text-sm text-muted-foreground hover:text-primary"
                        >{label}</a>
                        {index != SOCIAL_LINKS.length - 1 && <Separator orientation="vertical" 
                        className="h-3 mx-3"/>}
                    </li>
                ))
                }
            </ul>
        </div>
    </footer>
  )
}

export default Footer