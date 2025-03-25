import Head from "@/components/Head"
import { SignUp } from "@clerk/clerk-react"
function RegisterPage() {
  return (
    <>
        <Head title='Create Account - Saadhya AI'/>

        <section>
          <div className="container flex justify-center">
            <SignUp signInUrl="/login"></SignUp>
          </div>
        </section>
    </>
  )
}

export default RegisterPage