import { useState } from 'react';
import { Container } from '@/Components/Container';
import { Header } from '@/Components/Header';
import { NewPuppyForm } from '@/Components/NewPuppyForm';
import { PageWraper } from '@/Components/PageWraper';
import { PuppiesList } from '@/Components/PuppiesList';
import { Search } from '@/Components/Search';
import { Shortlist } from '@/Components/ShortList';
import { Puppy } from '@/types';

export default function Welcome({ puppies }: { puppies: Puppy[] }) {
    return (
        <PageWraper>
            <Container>
                <Header />
                <Main pups={puppies} />
            </Container>
        </PageWraper>
    );
}

function Main({ pups }: { pups: Puppy[] }) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [puppies, setPuppies] = useState<Puppy[]>(pups);

    return (
        <main>
            <div className="mt-24 grid gap-8 sm:grid-cols-2">
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <Shortlist puppies={puppies} setPuppies={setPuppies} />
            </div>
            <PuppiesList
                searchQuery={searchQuery}
                puppies={puppies}
                setPuppies={setPuppies}
            />
            <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
        </main>
    );
}
