import AuthLayout from "@/components/features/auth/AuthLayout"
import LoginForm from "@/components/features/auth/LoginForm"

export const metadata = {
  title: "Sign In — CannaClear",
}

export default function LoginPage() {
  return (
    <div id="main-content">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  )
}
