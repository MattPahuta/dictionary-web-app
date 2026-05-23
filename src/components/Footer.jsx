function Footer() {
  return (
    <footer className="py-4 text-sm text-center text-neutral-500 dark:text-neutral-400">
      <div className="">
        <p className="">
          Coded by{" "}
          <a
            href="https://www.mattpahuta.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-purple-500 dark:hover:text-purple-400">
            Matt Pahuta
          </a>{" "}
          | Design by{" "}
          <a
            href="https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-purple-500 dark:hover:text-purple-400">
            Frontend Mentor
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;