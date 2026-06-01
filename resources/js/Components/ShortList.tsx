import { Dispatch, SetStateAction, useState } from "react";
import { toggleLikeStatus } from '@/queries';
import { Puppy } from '@/types';
import { Heart, LoaderCircle, X } from "lucide-react";

export function Shortlist(
    {
        puppies,
        setPuppies
    }: {
        puppies: Puppy[];
        setPuppies: Dispatch<SetStateAction<Puppy[]>>
    }

) {
    return (
        <div>
            <h2 className="flex items-center gap-2 font-medium">
            <span>Your shortlist</span
            >
            <Heart className="fill-pink-500 stroke-pink-500"/>
            </h2>
            <ul className="mt-4 flex flex-wrap gap-4">
            {puppies
            .filter((pup) => pup.likedBy.includes(1))
            .map((puppy) => (
                <li key={puppy.id}
                    className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0"
                >
                    <img
                    height="32"
                    width="32"
                    alt={puppy.name}
                    className="aspect-square w-8 object-cover"
                    src={puppy.imageUrl}
                    />
                    <p className="px-3 text-sm text-slate-800">{puppy.name}</p>
                    <DeleteButton id={puppy.id} setPuppies={setPuppies}/>
                </li>
            ))}
            </ul>
        </div>
    )
}

function DeleteButton({id, setPuppies} : {id: Puppy["id"]; setPuppies: Dispatch<SetStateAction<Puppy[]>>}) {
    const [pending, setPending] = useState(false);
    return (
        <button onClick={async () => {
                setPending(true);
                const updatePuppy = await toggleLikeStatus(id);
                setPuppies((prevPups) => {
                    return prevPups.map((existingPuppy) => 
                        existingPuppy.id === updatePuppy.id ? updatePuppy : existingPuppy
                    )
                });
                setPending(false);
            }}
            className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
            >
            {pending ? (
                <LoaderCircle className="size-4 animate-spin stroke-slate-300"/>
            ):(

            <X className="size-4 stroke-slate-400 group-hover:stroke-red-400"/>
            )}
        </button>
    )
}