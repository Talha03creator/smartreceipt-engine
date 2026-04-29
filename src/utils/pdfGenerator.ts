import { jsPDF } from "jspdf";
import { toPng } from 'html-to-image';

/**
 * Generates a PDF by capturing the current UI state of the receipt.
 * This ensures 100% visual fidelity with the selected template.
 */
export const generateReceiptPDF = async (receiptId: string, companyName: string) => {
    // Find the preview element
    const element = document.querySelector('.receipt-preview-content') as HTMLElement;
    
    if (!element) {
        console.error("Receipt preview element not found for PDF export");
        return;
    }

    try {
        // Wait a small moment for any animations/renders to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        // High quality scale for crisp PDF
        // Remove backgroundColor: 'transparent' to allow the template's own background to be captured correctly
        const dataUrl = await toPng(element, { 
            quality: 1, 
            pixelRatio: 4, // Higher ratio for professional print quality
            cacheBust: true,
            style: {
                // Force transformations to be captured correctly
                transform: 'scale(1)',
                transformOrigin: 'top left'
            }
        });

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Center vertically if it's shorter than A4
        const yOffset = pdfHeight < pdf.internal.pageSize.getHeight() 
            ? (pdf.internal.pageSize.getHeight() - pdfHeight) / 2 
            : 0;

        pdf.addImage(dataUrl, 'PNG', 0, yOffset, pdfWidth, pdfHeight);
        pdf.save(`Receipt_${companyName || 'SR'}_${receiptId || 'DRAFT'}.pdf`);
        
    } catch (error) {
        console.error("Error generating PDF from template:", error);
    }
};
