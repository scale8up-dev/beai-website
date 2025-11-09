import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ScrollReveal } from '../components/ScrollReveal';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@businessevolutionai.com',
      description: 'Send us an email anytime',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '561-542-0047',
      description: 'Mon-Fri from 8am to 6pm',
      gradient: 'from-cyan-600 to-blue-600',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '30 N Gould Street, Suite R',
      description: 'Sheridan, WY 82801',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Monday - Friday',
      description: '8:00 AM - 6:00 PM EST',
      gradient: 'from-indigo-600 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <MessageSquare className="w-3 h-3 mr-1" />
                Let's Talk
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h1 className="text-4xl lg:text-5xl mb-6">
                Get in Touch With Us
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have a project in mind or questions about our services? We'd love to hear from you. Our team is ready to help bring your ideas to life.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <ScrollReveal key={index} variant="fadeUp" delay={index * 0.05}>
                  <div className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-gray-900">{info.title}</h3>
                      <p className="text-gray-900 mb-1">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl mb-4">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2"
                      placeholder="Tell us more about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map/Office Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fadeUp">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl mb-4">
                  Visit Our Office
                </h2>
                <p className="text-lg text-gray-600">
                  We'd love to meet you in person. Stop by our office during business hours.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8 lg:p-12 border border-gray-100">
                <div className="aspect-video bg-white rounded-xl flex items-center justify-center shadow-inner border border-gray-200">
                  <div className="text-center text-gray-500 space-y-3">
                    <MapPin className="w-12 h-12 mx-auto text-blue-700" />
                    <div>
                      <p className="text-gray-900 mb-1">30 N Gould Street, Suite R</p>
                      <p className="text-gray-600">Sheridan, WY 82801</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
