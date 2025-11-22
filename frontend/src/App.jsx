import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './routes/Auth/Login.jsx'
import Signup from './routes/Auth/Signup.jsx'
import ForgotPassword from './routes/Auth/ForgotPassword.jsx'
import ResetPassword from './routes/Auth/ResetPassword.jsx'
import Dashboard from './routes/Dashboard.jsx'
import './App.css'

function LandingPageContent() {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const testimonials = [
    { 
      name: 'CA Rajesh Kumar', 
      role: 'Chartered Accountant', 
      text: 'With StockMaster, we were able to streamline our inventory management without any hassle. The GST compliance features are exceptional!',
      image: '👨‍💼'
    },
    { 
      name: 'Priya Sharma', 
      role: 'Fashion Boutique Owner', 
      text: 'StockMaster has transformed how we manage our retail operations. The real-time stock alerts have saved us from stockouts multiple times.',
      image: '👩‍💼'
    },
    { 
      name: 'Amit Patel', 
      role: 'Manufacturing Business', 
      text: 'The automated accounting and invoicing features have reduced our manual work by 70%. Highly recommended for any business!',
      image: '👨‍💼'
    }
  ]

  const styles = {
    root: {
      '--bg': '#ffffff',
      '--surface': '#F5F8FB',
      '--primary': '#2B86FF',
      '--primary-600': '#1f6fe6',
      '--accent': '#F6C84C',
      '--text': '#0E2433',
      '--muted': '#8FA0AC',
      '--success': '#2FB76B',
      '--danger': '#E04545',
      '--warning': '#E8B500',
      '--gray': '#C3CBD2',
      '--radius': '10px',
      '--shadow': '0 6px 14px rgba(0, 0, 0, 0.06)'
    }
  }

  return (
    <div style={{ ...styles.root, background: 'var(--bg)', minHeight: '100vh', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 80px',
        background: '#0B6BA8',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'white',
              fontStyle: 'italic',
              letterSpacing: '-0.5px'
            }}>StockMaster</div>
          </div>

          <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            <a href="#product" style={{ color: 'white', fontWeight: '400', fontSize: '15px', transition: '0.2s', cursor: 'pointer' }} 
               onMouseEnter={(e) => e.target.style.opacity = '0.8'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>Product</a>
            <a href="#pricing" style={{ color: 'white', fontWeight: '400', fontSize: '15px', transition: '0.2s', cursor: 'pointer' }}
               onMouseEnter={(e) => e.target.style.opacity = '0.8'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>Pricing</a>
            <a href="#about" style={{ color: 'white', fontWeight: '400', fontSize: '15px', transition: '0.2s', cursor: 'pointer' }}
               onMouseEnter={(e) => e.target.style.opacity = '0.8'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>About</a>
            <a href="#contact" style={{ color: 'white', fontWeight: '400', fontSize: '15px', transition: '0.2s', cursor: 'pointer' }}
               onMouseEnter={(e) => e.target.style.opacity = '0.8'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>Contact Us</a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button style={{
            padding: '10px 24px',
            background: 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            fontSize: '15px',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onClick={handleLogin}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}>
            Log In
          </button>
          <button 
            onClick={handleSignup}
            style={{
              padding: '10px 28px',
              background: '#F6C84C',
              color: '#0E2433',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.3s',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#e8b500'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#F6C84C'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Sign Up <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '80px 80px 60px',
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        maxWidth: '1600px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, #E8F4FF 0%, #F5F8FB 100%)'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: '700',
            color: 'var(--text)',
            lineHeight: '1.2',
            marginBottom: '24px'
          }}>
            Complete Business Management for <span style={{ color: '#0B6BA8' }}>Modern India</span>
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'var(--muted)',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            Get started in minutes, with no prior training required. StockMaster adapts to your way of working, making invoicing, accounting, and business management simple and intuitive.
          </p>
          
          <div style={{ 
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', cursor: 'pointer' }}>
              <span style={{ fontSize: '24px' }}>📊</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>Insights that drive decisions</h3>
              <span style={{ marginLeft: 'auto', fontSize: '20px', color: 'var(--primary)' }}>+</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <span style={{ fontSize: '24px' }}>🔒</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>Access anytime, securely everywhere</h3>
              <span style={{ marginLeft: 'auto', fontSize: '20px', color: 'var(--primary)' }}>+</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={handleSignup}
              style={{
                padding: '16px 36px',
                background: '#F6C84C',
                color: '#0E2433',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(246, 200, 76, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(246, 200, 76, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 16px rgba(246, 200, 76, 0.4)'
              }}
            >
              Start Free Trial
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #E8F4FF 0%, #D4E8FF 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '0',
                width: '80%',
                height: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '200px',
                  height: '140px',
                  background: '#2B86FF',
                  borderRadius: '8px 8px 0 0',
                  position: 'relative',
                  marginTop: '80px'
                }}>
                  <div style={{
                    width: '180px',
                    height: '110px',
                    background: 'white',
                    margin: '10px auto',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                  }}>📈</div>
                </div>
                <div style={{
                  width: '240px',
                  height: '10px',
                  background: '#1f6fe6',
                  borderRadius: '0 0 4px 4px'
                }}></div>
                
                <div style={{
                  position: 'absolute',
                  top: '0',
                  fontSize: '120px'
                }}>🧑‍💻</div>
              </div>

              <div style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                animation: 'float 3s ease-in-out infinite'
              }}>
                <div style={{ fontSize: '32px' }}>📊</div>
              </div>
              
              <div style={{
                position: 'absolute',
                top: '120px',
                left: '30px',
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '1s'
              }}>
                <div style={{ fontSize: '32px' }}>📝</div>
              </div>
            </div>
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{
        padding: '80px 80px',
        background: '#E8F4FF',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '700',
          color: 'var(--text)',
          marginBottom: '60px',
          position: 'relative',
          display: 'inline-block'
        }}>
          Trusted by millions globally
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '4px',
            background: '#F6C84C'
          }}></div>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '52px', fontWeight: '700', color: '#0B6BA8', marginBottom: '12px', borderLeft: '4px solid #0B6BA8', paddingLeft: '20px', textAlign: 'left' }}>2.5M+</div>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(11, 107, 168, 0.1)',
              borderRadius: '20px',
              color: '#0B6BA8',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Businesses Trust StockMaster</div>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6', textAlign: 'left', paddingLeft: '20px' }}>
              StockMaster simplifies business management for millions across India.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '52px', fontWeight: '700', color: '#0B6BA8', marginBottom: '12px', borderLeft: '4px solid #0B6BA8', paddingLeft: '20px', textAlign: 'left' }}>#1</div>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(11, 107, 168, 0.1)',
              borderRadius: '20px',
              color: '#0B6BA8',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>e-Invoicing Software in India</div>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6', textAlign: 'left', paddingLeft: '20px' }}>
              StockMaster powers the most e-invoices in India, trusted for compliance and growth.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '52px', fontWeight: '700', color: '#0B6BA8', marginBottom: '12px', borderLeft: '4px solid #0B6BA8', paddingLeft: '20px', textAlign: 'left' }}>3 Decades</div>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(11, 107, 168, 0.1)',
              borderRadius: '20px',
              color: '#0B6BA8',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Simplifying Business Growth</div>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6', textAlign: 'left', paddingLeft: '20px' }}>
              Over 36 years, StockMaster has been helping businesses thrive with smarter solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Built for businesses */}
      <section id="product" style={{
        padding: '80px 80px',
        background: '#0B6BA8'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            Built for businesses of all sizes
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}>
            {[
              { icon: '🏪', title: 'Retail' },
              { icon: '🏭', title: 'Manufacturing' },
              { icon: '📱', title: 'E-Commerce' },
              { icon: '🍽', title: 'Restaurant' },
              { icon: '💊', title: 'Pharmacy' },
              { icon: '👕', title: 'Fashion' },
              { icon: '🏗', title: 'Construction' },
              { icon: '📚', title: 'Education' }
            ].map((industry, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '32px 20px',
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'pointer',
                border: '2px solid transparent',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{industry.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{industry.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: '80px 80px',
        background: '#0B6BA8',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '60px'
          }}>
            <div style={{ flex: '0 0 400px' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  width: '100%',
                  height: '400px',
                  background: 'linear-gradient(135deg, #E8F4FF 0%, #D4E8FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '120px'
                }}>
                  {testimonials[currentTestimonial].image}
                </div>
                <div style={{ padding: '24px', background: 'white' }}>
                  <div style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div style={{ fontSize: '16px', color: 'var(--muted)' }}>
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, paddingTop: '40px' }}>
              <div style={{ fontSize: '80px', color: 'white', opacity: 0.3, lineHeight: '1', marginBottom: '20px' }}>
                "
              </div>
              <p style={{
                fontSize: '28px',
                color: 'white',
                lineHeight: '1.6',
                fontWeight: '400',
                marginBottom: '40px'
              }}>
                {testimonials[currentTestimonial].text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                >
                  ←
                </button>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>
                  {currentTestimonial + 1}/{testimonials.length}
                </div>
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section id="pricing" style={{
        padding: '60px 80px',
        background: 'linear-gradient(135deg, #0B6BA8 0%, #084b73 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div style={{
            background: 'white',
            padding: '48px',
            borderRadius: '16px'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--text)',
              marginBottom: '16px'
            }}>
              Already an existing customer?
            </h3>
            <p style={{
              fontSize: '16px',
              color: 'var(--muted)',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              Explore advanced solutions, manage and renew StockMaster subscription and unlock more possibilities.
            </p>
            <button 
              onClick={handleLogin}
              style={{
                padding: '14px 32px',
                background: '#F6C84C',
                color: '#0E2433',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            >
              Visit Customer Hub →
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #2B86FF 0%, #1f6fe6 100%)',
            padding: '48px',
            borderRadius: '16px',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              Ready to fall in love with StockMaster?
            </h3>
            <p style={{
              fontSize: '16px',
              opacity: 0.95,
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              Get the full StockMaster experience!
            </p>
            <button 
              onClick={handleSignup}
              style={{
                padding: '14px 32px',
                background: '#F6C84C',
                color: '#0E2433',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            >
              Create Account →
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '80px 80px',
        background: 'var(--surface)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: 'var(--text)',
            marginBottom: '24px'
          }}>
            About StockMaster
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--muted)',
            lineHeight: '1.8',
            maxWidth: '900px',
            margin: '0 auto 40px'
          }}>
            StockMaster is India's leading business management software, trusted by millions of businesses for over 30 years. We provide comprehensive solutions for inventory management, accounting, GST compliance, and business operations.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '80px 80px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: 'var(--text)',
            marginBottom: '24px'
          }}>
            Get in Touch
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--muted)',
            marginBottom: '40px'
          }}>
            Have questions? We're here to help you succeed.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginTop: '60px'
          }}>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>Email Us</h4>
              <p style={{ fontSize: '15px', color: 'var(--muted)' }}>support@stockmaster.com</p>
            </div>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📞</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>Call Us</h4>
              <p style={{ fontSize: '15px', color: 'var(--muted)' }}>1800-123-4567</p>
            </div>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>Live Chat</h4>
              <p style={{ fontSize: '15px', color: 'var(--muted)' }}>Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 80px 30px',
        background: '#0E2433',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <h4 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', fontStyle: 'italic' }}>StockMaster</h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              Complete business management solution for modern Indian businesses.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#product" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Features</a>
              <a href="#pricing" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Pricing</a>
              <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Demo</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#about" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>About</a>
              <a href="#contact" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Contact</a>
              <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Careers</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Terms of Service</a>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '30px',
          textAlign: 'center',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)'
        }}>
          © 2024 StockMaster. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App