import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (
  elementId: string,
  filename = 'cv.pdf'
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const templateWrapper = element.querySelector('.resume-template-wrapper') as HTMLElement ?? element;

    // Wait for fonts
    await document.fonts.ready;

    // ensure page is at top
    window.scrollTo(0, 0);

    // backup original styles
    const originalTransform = templateWrapper.style.transform;
    const originalOrigin = templateWrapper.style.transformOrigin;
    templateWrapper.style.transform = 'none';
    templateWrapper.style.transformOrigin = '0 0';

    const canvas = await html2canvas(templateWrapper, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
      foreignObjectRendering: false,
      scrollX: 0,
      scrollY: 0,
    });

    // Restore styles
    templateWrapper.style.transform = originalTransform;
    templateWrapper.style.transformOrigin = originalOrigin;

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Export to PDF error:', error);
    throw error;
  }
};
