import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import file from "../../constants/RH Journée d'accueil - HR Onthaaldag copy.pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';

export default function ReaderDocument() {
  const [selectedPages, setSelectedPages] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

  const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
  };

  useEffect(() => {
    renderingPage();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function changePage() {
    if (selectedPages <= numPages) {
      const test = selectedPages;
      setSelectedPages(test + 1);
    }
  }

  function renderingPage() {
    return (
      <Page
        key={`page_${selectedPages}`}
        pageNumber={selectedPages}
        width={800}
      />
    );
  }

  return (
    <div className="Example">
      <div className="Example__container__document">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          options={options}
        >
          <IconButton icon={icons?.arrowRight} onClick={changePage} />
          {renderingPage()}
        </Document>
      </div>
    </div>
  );
}
