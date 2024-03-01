import { useSession } from "next-auth/react";
import Link from "next/link";

const TreasureHunt = () => {
    const { data: session, status } = useSession();

    return (
        <div className="container text-center">
            <h3>Treasure Hunt Hints</h3>
            <div className="my-4">
                <p className="my-3">Hi, hunter! Welcome to the Treasure Hunt. </p>
                <p className="my-3">Check out for the hints posted in the below link frequently for finding the hints of treasure. </p>
                <p className="mt-3 mb-4">Find the QR and upload it in the space provided here.</p>
            </div>
            <div className="my-4 p-2">
                <Link className='button my-3 me-3' href='https://google.com' target="_blank">Check for Hints</Link>
                <Link className='button my-3 me-3' href='/code'>Enter the code</Link>
                {session && session.user && session.user.admin && <Link className='button my-3' href='/admin/hunt'>Edit Hints</Link>}
            </div>
        </div>
    );
};

export default TreasureHunt;
