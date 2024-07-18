import Head from 'next/head';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 | Error</title>
      </Head>
      <div className="flex flex-col items-center text-center mt-12 md:mt-24 gap-8 px-6 md:px-32">
        <h1 className="text-5xl sm:text-7xl font-bold">404</h1>
        <p className="flex flex-col gap-8 md:gap-4 md:text-xl">
          <span></span>Ой
          <span>Ух</span>
        </p>
        <Link
          href="/"
          className={`p-4 bg-h-blue-500 rounded-xl text-black mt-5 md:mt-12 md:text-xl w-fit`}
        >
          Index
        </Link>
      </div>
    </>
  );
};

export default NotFound;
