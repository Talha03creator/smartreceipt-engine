import React, { createContext, useContext, useState, useEffect } from 'react';

export type TemplateId = 'modern' | 'dark' | 'minimal' | 'glass' | 'future';

interface TemplateContextType {
  selectedTemplate: TemplateId;
  setSelectedTemplate: (id: TemplateId) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
    const saved = localStorage.getItem('selectedTemplate');
    return (saved as TemplateId) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}
