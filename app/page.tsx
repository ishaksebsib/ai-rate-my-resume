import { Toaster } from "react-hot-toast";
import HeroContainer from "./_components/HeroContainer";

export default function Home() {
	return (
		<main className="w-screen flex justify-center h-[100vh] bg-background bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_98%)]">
			{/* toast notification */}
			<Toaster />
			{/* hero section */}
			<HeroContainer />
		</main>
	);
}
