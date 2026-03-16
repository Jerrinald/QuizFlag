function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col items-center gap-2">
        <p className="text-gray-400">✉️ Email: k.jerrinald@gmail.com</p>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} FlagQuiz</p>
      </div>
    </footer>
  );
}

export default Footer;
