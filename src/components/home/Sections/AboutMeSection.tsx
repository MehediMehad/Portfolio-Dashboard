const AboutMeSection = () => {
  return (
    <div className="bg-[#120b20] rounded-lg p-6 ">
      <div className="flex items-center mb-4">
        <h2 className="text-textPrimary text-2xl font-bold">About Me</h2>
        {/* TODO */}
        {/* <svg
          className="w-6 h-6 ml-2 text-textPrimary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
          />
        </svg> */}
      </div>
      <p className="text-gray-300 leading-relaxed">
        I'm a full-stack JavaScript developer. I work with React.js, Next.js,
        Node.js, Express.js, and databases like MongoDB, MySQL, and PostgreSQL.
        I'm also experienced with Mongoose and Prisma as ORMs. I enjoy building
        scalable web applications with clean architecture and efficient API
        integrations.
      </p>
    </div>
  );
};

export default AboutMeSection;
