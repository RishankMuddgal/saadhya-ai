import { SignIn } from "@clerk/clerk-react"
import Head from "../components/Head"
function LoginPage() {
  return (
    <>
        <Head title='Log In To - Saadhya AI'/>

        <section>
          <div className="container flex justify-center">
            <SignIn signUpUrl="/register"></SignIn>
          </div>
        </section>
    </>
  )
}

export default LoginPage