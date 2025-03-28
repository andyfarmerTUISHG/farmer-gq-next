// TODO: Convert to TS

// import type { ProfileType } from "@/types";
import { loadProfile } from "@/sanity/loader/load-query";

export default async function ProfileComponent() {
    // const profile: ProfileType[] = await getProfile();
    const {data: profile} = await loadProfile();
    return (<main className="max-w-7xl mx-auto lg:px-16 px-6">
        <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
            
            {profile && profile.map((data) => (
                <div key={data._id}>
                    <h1>{data.headline} </h1>
                    <h2>{data.fullName}</h2>
                </div>
            )
            )}
        </section>
        </main>
    );
}
