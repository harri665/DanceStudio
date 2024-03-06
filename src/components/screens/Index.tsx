import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import MainLanding from '../Landing/MainLanding';
import Upcoming from '../Landing/Upcoming';
import ClassCalander from '../Class/ClassCalander';
import AboutLanding from '../Landing/AboutLanding';













function Index() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);

  return (
    <>
      <Head title="TOP PAGE" />
      <MainLanding/>
      <Upcoming/>
      <div className='h-[10vh]'></div>
      <AboutLanding/>

    </>
  );
}

export default Index;
//MAIN





