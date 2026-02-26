import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

const ExportPDF = () => {
  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("zenithcv-resume.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
};

export default ExportPDF;
