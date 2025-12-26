import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { LogIn, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export function Login() {
  const { signInWithGoogle, isAuthorized, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  const [, setUnauthorizedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthorized) {
      navigate(from, { replace: true });
    }
  }, [isAuthorized, authLoading, navigate, from]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setUnauthorizedEmail(null);
    try {
      const user = await signInWithGoogle();
      const allowedEmails = ["deudajm@gmail.com", "skmonbie@gmail.com"];

      if (!user.email || !allowedEmails.includes(user.email)) {
        setUnauthorizedEmail(user.email);
        toast.error(
          "Unauthorized email. Only authorized email can access the admin panel."
        );
        return;
      }
    } catch (error: any) {
      console.error("Sign-in error:", error);
      toast.error(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }
  if (isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">SkMobie</h1>
          <p className="text-white/60">Admin Panel</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <LogIn className="size-8 text-white" />
            </div>
            <h2 className="text-white mb-2">Welcome Back</h2>
            <p className="text-white/60">Sign in to access the admin panel</p>
          </div>

          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-white/90 h-12"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="size-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </div>
            )}
          </Button>

          {/* Info Message */}
          <div className="mt-6 flex items-start gap-2 p-4 bg-white/5 border border-white/10 rounded">
            <AlertCircle className="size-5 text-white/60 flex-shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm">
              Only authorized email addresses can access the admin panel.
            </p>
          </div>
        </div>

        {/* Show notifs */}
        <Toaster />

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white hover:bg-white/5"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
