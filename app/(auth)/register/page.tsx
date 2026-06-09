import AuthLayout from "@/components/features/auth/AuthLayout"
import RegisterForm from "@/components/features/auth/RegisterForm"

export const metadata = {
  title: "Create Account — CannaClear",
}

export default function RegisterPage() {
  return (
    <div id="main-content">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  )
}
