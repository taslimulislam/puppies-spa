import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createPuppy } from '@/queries';
import { Puppy } from '@/types';

export function NewPuppyForm({
    puppies,
    setPuppies,
}: {
    puppies: Puppy[];
    setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}) {
    const [pending, setPending] = useState(false);
    const [puppyName, setPuppyName] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setPending(true);
        try {
            const response = await createPuppy(formData);

            if ('id' in response) {
                setPuppies([...puppies, response]);
                event.currentTarget.reset();
                setPuppyName('');
            }
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
            <ErrorBoundary
                fallbackRender={({ error }) => (
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                )}
            >
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex w-full flex-col items-start gap-4"
                >
                    <div className="grid w-full gap-6 md:grid-cols-3">
                        <fieldset className="flex w-full flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <input
                                required
                                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                id="name"
                                type="text"
                                name="name"
                                onChange={(e) => setPuppyName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex w-full flex-col gap-1">
                            <label htmlFor="trait">Personality trait</label>
                            <input
                                required
                                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                id="trait"
                                type="text"
                                name="trait"
                            />
                        </fieldset>
                        <fieldset className="col-span-2 flex w-full flex-col gap-1">
                            <label htmlFor="image_url">Profile pic</label>
                            <input
                                required
                                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                id="image_url"
                                type="file"
                                name="image_url"
                                accept="image/jpeg,image/png,image/jpg"
                            />
                        </fieldset>
                    </div>
                    <button
                        className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-200"
                        type="submit"
                        disabled={pending}
                    >
                        {pending
                            ? `Adding ${puppyName || 'puppy'}...`
                            : 'Add puppy'}
                    </button>
                </form>
            </ErrorBoundary>
        </div>
    );
}
