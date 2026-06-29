import Image from "next/image";
import Link from "next/link";
import { RiTicket2Fill } from "react-icons/ri";


const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div>
                 {/* <RiTicket2Fill className="text-xl" /> */}
    <Image
        src="/TricketBus.png"
        alt="TricketVerce Logo"
        width={90}
        height={60}
        className="w-50% rounded-full"
      />
            
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-pink-500 bg-clip-text text-transparent">
               TricketVerce
            </span>
        </Link>
    );
};

export default Logo;