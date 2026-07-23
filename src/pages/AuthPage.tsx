import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Mail, Lock, UserPlus } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | null>(null);
  const [isLogin, setIsLogin] = useState(true);

 const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: ''
});

  const { login, signup, role } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedRole === 'admin') {
        const { error } = await login(formData.email, formData.password);
        if (error) {
          alert(error.message);
          return;
        }
      } else {
        if (isLogin) {
          const { error } = await login(formData.email, formData.password);
          if (error) {
            alert(error.message);
            return;
          }
        } else {
          const { error } = await signup(formData.email, formData.password, formData.username);
          if (error) {
            alert(error.message);
            return;
          }
          alert("Signup successful! Please log in.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Spot & Solve
            </h1>
            <p className="text-gray-600">
              Choose your role to continue
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedRole('user')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200">
                  <User className="text-blue-600" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">
                    User
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Report issues and track progress
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('admin')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200">
                  <Shield className="text-green-600" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Administrator
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Manage reports and users
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              ←
            </button>

            <h1 className="text-3xl font-bold text-gray-800">
              {selectedRole === 'admin'
                ? 'Admin Login'
                : isLogin
                ? 'Sign In'
                : 'Sign Up'}
            </h1>
          </div>

          <p className="text-gray-600">
            {selectedRole === 'admin'
              ? 'Enter your admin credentials'
              : isLogin
              ? 'Welcome back!'
              : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedRole === 'admin' ? (
            <>
              <div className="relative">
                <Shield
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {!isLogin && (
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              selectedRole === 'admin'
                ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
            }`}
          >
            {selectedRole === 'admin'
              ? 'Sign In as Admin'
              : isLogin
              ? 'Sign In'
              : 'Sign Up'}
          </button>

          {selectedRole === 'user' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center space-x-1 mx-auto"
              >
                <UserPlus size={16} />
                <span>
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </span>
              </button>
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Demo Credentials:</p>
          <p>Admin: ID=admin123, Password=admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;