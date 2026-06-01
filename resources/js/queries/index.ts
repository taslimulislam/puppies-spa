import { Puppy } from '@/types';

async function parseJson<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }

    return response.json() as Promise<T>;
}

export async function toggleLikeStatus(id: Puppy['id']): Promise<Puppy> {
    const response = await fetch(`/api/puppies/${id}/like`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
        },
    });

    return parseJson<Puppy>(response);
}

export async function createPuppy(
    formData: FormData,
): Promise<Puppy | Record<string, unknown>> {
    const response = await fetch('/api/puppies', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: formData,
    });

    if (!response.ok) {
        return response.json();
    }

    return parseJson<Puppy>(response);
}
