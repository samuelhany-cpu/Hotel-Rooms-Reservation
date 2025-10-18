'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add login logic here
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p className="text-gray-600 text-center mb-6">
              Welcome back! Please sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-btn">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="auth-switch-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-image">
          <Image
            src="/images/room-1.png"
            alt="Hotel Room"
            width={600}
            height={800}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="auth-image-overlay">
            <h2>Experience Luxury</h2>
            <p>Your perfect getaway awaits at Crowny Hotel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
