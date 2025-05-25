import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center p-10 bg-white rounded-2xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
          Explore the World with Ease ✈️
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover, Customize, and Book Your Dream Travel Packages. Whether it's
          for leisure or adventure, we make travel planning simple and
          personalized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100 rounded-xl transition">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          <p>Powered by MERN Stack · Secure Auth · User-Friendly Interface</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
