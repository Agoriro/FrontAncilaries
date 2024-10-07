import Image from "next/image";
import  HomeSearch  from './components/homeSearch/HomeSearch';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#D6D6D6]/[13%] text-[ubuntu]">
        <HomeSearch></HomeSearch>
    </main>
  );
}
