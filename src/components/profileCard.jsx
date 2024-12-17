import StarDisplay from "./StarDisplay"
import Image from "next/image"

const ProfileCard = ({name, role, rating}) =>{

    return (
        <div className="bg-white flex flex-col justify-center items-center p-7 rounded-lg gap-2 hover:bg-greenbg">
            <Image

                    src="/assets/no-pfp.jpg"
                    alt="Profile Picture"
                    width={64}
                    height={64}
                    className="object-cover rounded-[50%]"
            />
            <h1 className="text-black text-md font-semibold">{name}</h1>
            <h4 className="text-black text-sm">{role}</h4>
            <StarDisplay rating={rating}/>

            <button className="bg-transparent border border-black text-black text-sm px-3 py-1 rounded-md hover: bg-white text-black">
                View Profile
            </button>
        </div>
    )
}

export default ProfileCard