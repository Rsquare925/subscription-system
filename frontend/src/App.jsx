import { Outlet, NavLink } from 'react-router-dom';

function App() {
  return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Subscription Manager</span>
              </div>
              <nav className="flex space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                      isActive ? 'text-blue-600 font-semibold' : ''
                    }`
                  }
                >
                  Subscriptions
                </NavLink>
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                      isActive ? 'text-blue-600 font-semibold' : ''
                    }`
                  }
                >
                  Add Subscription
                </NavLink>
                <NavLink
                  to="/report"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                      isActive ? 'text-blue-600 font-semibold' : ''
                    }`
                  }
                >
                  Revenue Report
                </NavLink>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
          <Outlet></Outlet>

        </main>

        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-gray-500">
              &copy; 2023 Subscription Manager. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
  );
}

export default App;
