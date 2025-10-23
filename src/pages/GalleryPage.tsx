import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateCarousel from '../components/TemplateCarousel';
import { Layout, Hero, Features } from '../components/layout';

const GalleryPage: FC = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    // Save selected template to localStorage
    localStorage.setItem('selectedTemplate', templateId);
    
    // Navigate to wizard
    navigate('/wizard');
  };

  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* Templates Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TemplateCarousel onTemplateSelect={handleTemplateSelect} />
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;
