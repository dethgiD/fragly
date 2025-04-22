"use client";

export default function SteamLoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/steam`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-[#171A21] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
    >
      Sign in with Steam
    </button>
  );
}
