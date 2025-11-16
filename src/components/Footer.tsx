import { Link } from 'react-router-dom';
import { Facebook, Linkedin } from 'lucide-react';
import logo from 'figma:asset/0060126a687649727c47565e908d44fe39a5e3a5.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo and Social */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="Business Evolution AI" className="h-10 brightness-0 invert" />
            </Link>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/business-evolution-ai-be-ai/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link to="/team" className="text-gray-400 hover:text-white transition-colors">
                Team
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>info@businessevolutionai.com</p>
              <p>561-542-0047</p>
              <p>
                30 N Gould Street<br />
                Suite R<br />
                Sheridan, WY 82801
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© Copyright Business Evolution AI. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
