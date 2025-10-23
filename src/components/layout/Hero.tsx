import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Professional Resume Builder
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume in Minutes
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create professional resumes with our AI-powered tools. Upload your existing resume for instant optimization, or start fresh with our step-by-step wizard and beautiful templates.
          </p>


          {/* CV Preview Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
            {/* CV Preview 1 */}
            <div className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">AH</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900">Alice Hart</h3>
                  <p className="text-sm text-gray-600">Math Teacher</p>
                </div>
                <div className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  81% Score
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-3">
                Enthusiastic math teacher with over 8 years experience in designing engaging lesson plans...
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Management</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Analytical</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Leadership</span>
              </div>
            </div>

            {/* CV Preview 2 */}
            <div className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold text-lg">JS</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900">John Smith</h3>
                  <p className="text-sm text-gray-600">Software Developer</p>
                </div>
                <div className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  92% Score
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-3">
                Experienced software developer with expertise in React, Node.js, and cloud technologies...
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">React</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Node.js</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">AWS</span>
              </div>
            </div>

            {/* CV Preview 3 */}
            <div className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold text-lg">MJ</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900">Maria Johnson</h3>
                  <p className="text-sm text-gray-600">Marketing Manager</p>
                </div>
                <div className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  88% Score
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-3">
                Creative marketing professional with 5+ years experience in digital marketing and brand management...
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Digital Marketing</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Brand Strategy</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
