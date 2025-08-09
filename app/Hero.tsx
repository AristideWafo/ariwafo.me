// import React, { ComponentPropsWithoutRef } from "react";
import { Section } from "./_components/Section";
// import { cn } from "../lib/utils";


// const Code = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
//   return (
//     <span
//       className={cn(
//         "text-primary text-sm p-1  mx-1 bg-accent/30 font-mono border border-accent rounded-sm border-primary-background ",
//         className
//       )}
//       {...props}
//     />
//   );
// };

export const Hero = () => {
  return (
    <Section className="flex flex-row gap-10 justify-between h-auto ">
      <div className="flex-[1] flex-col justify-center space-y-4 max-w-2xl h-full">
        <h1 className="text-5xl py-3 font-bold text-foreground text-wrap">
          {" "}
          Cloud Engineer and Community Builder...{" "}
        </h1>
        <p className="text-md text-left  text-slate-600">
          👋🏾 Hi, I&apos;m{" "}
          <span className="text-foreground text-xl font-bold">
            {" "}
            Aristide WAFO,
          </span>{" "}
          a Cloud Engineer{" "}
          {/* <Link href={"https://www.astree-software.fr/"}>
            {" "}
            <Code className="inline-flex items-center gap-2 font-bold">
              {" "}
              @Astree Software.
            </Code>
          </Link> */}
        </p>
        <p className="text-md text-left text-slate-600">
          I thrive in collaborative environments where teamwork and innovation come first.
          <br />
        </p>{" "}
        <p className="text-md text-left text-slate-600">
        For me, cloud and DevOps is about connecting people and technology — sharing knowledge, solving problems, and growing together.
        </p>{" "}
        <p className="text-md text-left text-slate-800">
        Let’s connect and create something impactful! 🚀
        </p>
      </div>
      {/* <div className='flex-[1]  ' >
            <img 
            className='rounded-full w-full h-auto'
            src="https://media.licdn.com/dms/image/v2/D4E35AQFPmrEvfEpo7w/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1718717783573?e=1738144800&v=beta&t=xHRmN2rDkNB18CfddY-GB3iWFL2IPViBUajrivbBMgQ" alt="" />
        </div> */}
    </Section>
  );
};
