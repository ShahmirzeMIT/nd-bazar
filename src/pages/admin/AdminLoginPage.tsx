import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Navigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login, resetPassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/admin");
      } else {
        setError("İstifadəçi adı və ya şifrə yanlışdır.");
      }
    } catch (err) {
      setError("Giriş zamanı xəta baş verdi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (!email || !email.includes("@")) {
        setError("Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.");
        setIsLoading(false);
        return;
      }
      const success = await resetPassword(email);
      if (success) {
        setSuccessMessage("Şifrə sıfırlama linki e-poçt ünvanınıza göndərildi.");
      } else {
        setError("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
      }
    } catch (err) {
      setError("Şifrə sıfırlanması zamanı xəta baş verdi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isForgotPassword ? "Şifrənin bərpası" : "Admin Panel - Giriş"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isForgotPassword ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm">
                  {successMessage}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-poçt ünvanı
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-poçt ünvanınızı daxil edin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-farm-green hover:bg-farm-green/80"
                disabled={isLoading}
              >
                {isLoading ? "Yüklənir..." : "Sıfırlama linki göndər"}
              </Button>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="text-sm text-farm-green hover:underline focus:outline-none"
                >
                  Girişə qayıt
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  İstifadəçi adı
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="İstifadəçi adını daxil edin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Şifrə
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className="text-xs text-farm-green hover:underline focus:outline-none"
                  >
                    Şifrəni unutmusunuz?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrəni daxil edin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-farm-green hover:bg-farm-green/80"
                disabled={isLoading}
              >
                {isLoading ? "Yüklənir..." : "Daxil ol"}
              </Button>
            </form>
          )}

          {!isForgotPassword && (
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Test hesabı: admin / admin123</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
