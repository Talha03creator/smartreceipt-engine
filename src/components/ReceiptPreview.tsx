import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTemplate } from '../context/TemplateContext';
import { DarkTemplate } from './templates/DarkTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { GlassTemplate } from './templates/GlassTemplate';
import { FutureTemplate } from './templates/FutureTemplate';

interface ReceiptPreviewProps {
  data: any;
  items: any[];
  company: any;
  signature: string | null;
}

export function ReceiptPreview({ data, items, company, signature }: ReceiptPreviewProps) {
  const { selectedTemplate } = useTemplate();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'dark':
        return <DarkTemplate data={data} items={items} company={company} signature={signature} />;
      case 'modern':
        return <ModernTemplate data={data} items={items} company={company} signature={signature} />;
      case 'minimal':
        return <MinimalTemplate data={data} items={items} company={company} signature={signature} />;
      case 'glass':
        return <GlassTemplate data={data} items={items} company={company} signature={signature} />;
      case 'future':
        return <FutureTemplate data={data} items={items} company={company} signature={signature} />;
      default:
        return <DarkTemplate data={data} items={items} company={company} signature={signature} />;
    }
  };

  return (
    <div className="sticky top-6 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTemplate}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTemplate()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
