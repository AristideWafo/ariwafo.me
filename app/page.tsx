// import Image from "next/image";

import { Spacing } from "./_components/Spacing";
import { Header } from "./Header";
import { Hero } from "./Hero";

export default function Home() {
  return (
<main> 
  <Header />
  <Spacing size='md' />
  <Hero />
  <Spacing size='xl' />
</main>
  );
}
