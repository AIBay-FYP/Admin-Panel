import { useClerk, useUser } from "@clerk/nextjs";

export default function Settings(){

    const onClick = ()=>{
        if(user){
            openUserMenu();
        }
        else{
            alert("Please sign in first!");
        }
    }
}