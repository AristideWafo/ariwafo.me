// import Image from "next/image";

import { Spacing } from "./_components/Spacing";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Slide } from "./Slide";

export default function Home() {
  return (
<main> 
  <Header />
  <Spacing size='lg' />
  <Hero />
  <Spacing size='xl' />
  <Slide />
</main>
  );
}
