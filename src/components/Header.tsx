import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Facebook, Linkedin, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import logo from 'figma:asset/0060126a687649727c47565e908d44fe39a5e3a5.png';

const services = [
  {
    title: 'AI Development',
    description: 'Machine Learning, NLP, Computer Vision, Predictive Analytics',
    href: '/services#ai-development',
  },
  {
    title: 'Web Development',
    description: 'Custom Web Applications, E-commerce, CMS Development',
    href: '/services#web-development',
  },
  {
    title: 'Mobile App Development',
    description: 'iOS & Android Apps, React Native, Flutter Development',
    href: '/services#mobile-development',
  },
  {
    title: 'UI/UX Design',
    description: 'User Research, Prototyping, Visual Design, Usability Testing',
    href: '/services#ui-ux-design',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Cloud Migration, Infrastructure as Code, CI/CD Pipelines',
    href: '/services#cloud-devops',
  },
  {
    title: 'Machine Learning',
    description: 'Data Analysis, Pattern Recognition, Recommendation Systems',
    href: '/services#machine-learning',
  },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/team', label: 'Team' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Business Evolution AI" className="h-14" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-700'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/services">
                    <NavigationMenuTrigger
                      className={`font-semibold bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent ${
                        isActive('/services')
                          ? 'text-blue-700'
                          : 'text-gray-600 hover:text-blue-700'
                      }`}
                    >
                      Services
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      {services.map((service) => (
                        <Link
                          key={service.title}
                          to={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700"
                        >
                          <div className="text-sm font-medium leading-none mb-2">
                            {service.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            {service.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/business-evolution-ai-be-ai/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Button */}
            <Link to="/contact" className="hidden md:block">
              <Button className="bg-blue-700 hover:bg-blue-800 font-bold">
                Contact Us
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-blue-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center justify-between w-full py-2 font-semibold text-gray-600 hover:text-blue-700 transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      servicesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {servicesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        className="block py-2 text-sm text-gray-600 hover:text-blue-700 transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setServicesDropdownOpen(false);
                        }}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/business-evolution-ai-be-ai/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <Link to="/contact" className="pt-2">
                <Button className="w-full bg-blue-700 hover:bg-blue-800 font-bold">
                  Contact Us
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
