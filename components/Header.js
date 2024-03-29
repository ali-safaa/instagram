import { useState, useContext } from 'react';
import PostPhoto from '../components/PostPhoto';
import { useSession, signIn, signOut } from 'next-auth/react';
import ModalProfile from './ModalProfile';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from '../providerSlice';
function Header() {
  const [postPhoto, setPostPhoto] = useState(false);
  const { data: session } = useSession();
  const [profile, setProfile] = useState(false);
  const user = useSelector(selectUser);

  return (
    <header className="flex items-center w-full py-3 justify-around shadow-md">
      <Link href={'/'}>
        <img
          className="sm:w-[120px] w-[80px] cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="bg-gray-200 w-max rounded-md px-5 py-1">
        <input className="bg-transparent" type="text" placeholder="Search" />
        <i className="fas fa-search text-gray-400 outline-none"></i>
      </div>
      {!session && !user ? (
        <>
          <nav className="space-x-5 sm:text-xl flex">
            <i className="fas fa-home hover:text-blue-500 duration-300 cursor-pointer"></i>
            <h3 onClick={() => signIn()} className="cursor-pointer text-sm">
              Signin
            </h3>
          </nav>
        </>
      ) : (
        <nav className="space-x-5 sm:text-xl">
          <i className="fas fa-home hover:text-blue-500 duration-300 cursor-pointer"></i>
          <i className="far fa-heart hidden sm:inline-flex hover:text-blue-500 duration-300 cursor-pointer"></i>
          <i
            onClick={() => setPostPhoto(true)}
            className="far fa-plus text-2xl sm:text-3xl hover:text-blue-500 duration-300 cursor-pointer"
          ></i>
          <i className="far fa-comment hidden sm:inline-flex hover:text-blue-500 duration-300 cursor-pointer"></i>
          <i
            onClick={profile ? () => setProfile(false) : () => setProfile(true)}
            className="far fa-user hover:text-blue-500 duration-300 cursor-pointer"
          ></i>
          {profile && <ModalProfile signOut={signOut} />}
        </nav>
      )}
      {postPhoto && <PostPhoto setPostPhoto={setPostPhoto} />}
    </header>
  );
}

export default Header;
