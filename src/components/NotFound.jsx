function NotFound({ error }) {
  const { title, message, resolution } = error;

  return (
    <div className="py-10 flex flex-col gap-6 text-center items-center">
      <span className="text-3xl sm:text-5xl" aria-label="Confused face emoji" role="img">🫤</span>
      <div className="space-y-3 sm:px-4">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {message}
          {" "}
          {resolution}
        </p>
      </div>
    </div>
  );
}

export default NotFound;