import Link from "next/link";
import EnableId from "../../public/images/enable_id_logo.svg"
import Image from "next/image";


export default function NaviBar() {
    return (
    <div className="flex justify-between items-center mt-2">
        <div className="flex items-center ml-20">
            <Image src={EnableId} alt="Logo" className="h-10 w-10 mr-2 inline-block" />
            <span className="font-bold md:text-2xl text-[#405DB5]">Enable ID</span>
        </div>
        <div className="flex space-x-4 mr-10">
            {[
                ['Home', '/'],
                ['Documents Manager', '/documents'],
                ['Family Tree', '/family-tree'],
                ['Community', ''],
                ['Resources', '/resources'],
                // ['Credits', 'credits']
            ].map(([title, url]) => (
                // eslint-disable-next-line react/jsx-key
                <Link href={url} className="md:px-5 mx-0 py-4 font-bold">{title}</Link>
            ))}
        </div>
    </div>
    )
}