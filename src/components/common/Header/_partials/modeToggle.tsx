// "use client";

// import * as React from "react";
// // import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider
// } from "@/components/ui/tooltip";
// import { useTheme } from "@/hooks/use-theme";

// export function ModeToggle() {
  
//   const { toggleTheme, theme } = useTheme();


//   return (
//     <TooltipProvider disableHoverableContent>
//       <Tooltip delayDuration={100}>
//         <TooltipTrigger asChild>
//           <Button
//             className="rounded-full w-8 h-8 bg-background mr-2"
//             variant="outline"
//             size="icon"
//             onClick={() => toggleTheme()}
//           >
//             {
//               theme == 'dark' ? 
//               <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
//               :
//               <MoonIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
//             }

//             <span className="sr-only">Switch Theme</span>
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent side="bottom">Switch Theme</TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }