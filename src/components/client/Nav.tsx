"use client";

import { meta } from "@9ll-fun/config";
import { globalConfig } from "@9ll-fun/config";
import { useState } from "react";
import { Settings } from "./Settings";
import { randomColor } from "@9ll-fun/utils";
import Link from "next/link";

export const Nav = () => {
 const [heartColor, setHeartColor] = useState<string>(globalConfig.defaultColor);

 return (
  <>
   <div className="max-w-7xl mx-auto py-12 w-full px-6 lg:px-0">
    <div className="flex items-center justify-between">
     <div className="flex items-center gap-4">
      <Link href="/" className="text-2xl font-bold transition-all duration-200">
       {meta.title}
       <i
        onClick={() => {
         setHeartColor(randomColor());
        }}
        style={{ fontSize: "1.5rem", cursor: "pointer", color: heartColor }}
       >
        .
       </i>
      </Link>
     </div>
     <Settings />
    </div>
   </div>
  </>
 );
};
