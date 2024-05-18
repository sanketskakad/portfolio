import React, { Suspense } from 'react';
import { Loader } from '@/components/Loader.jsx';

{
  /* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
  Popup
</div> */
}
function Home() {
  return (
    <section className='h-screen w-full relative'>
      <Suspense fallback={<Loader />}></Suspense>
    </section>
  );
}

export default Home;
