import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="bg-gray-200 py-10 min-h-screen lg:bg-home bg-no-repeat bg-right-top lg:bg-home-xl">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-5">
            <h1 className="text-6xl font-black text-balance">
              Todas tus <span className="text-cyan-500">Redes sociales </span>
              en un enlace
            </h1>

            <p className="text-slate-800 text-xl">
              Únete y comparte tus redes sociales con solo un enlace, comparte
              tu perfil de Tiktok, Facebook, Instagram, Github, Twitter y más.
            </p>

            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
}
