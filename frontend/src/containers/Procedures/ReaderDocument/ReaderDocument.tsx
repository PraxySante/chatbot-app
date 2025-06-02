import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import icons from '../../../constants/icons';
import IconButton from '../../../components/Buttons/IconButton';
import { ReaderDocumentType } from '../../../types/panel/panel.type';
import { NEXT_PAGE, PREVIOUS_PAGE } from '../../../constants/chat.constants';

export default function ReaderDocument({ fileDocument }: ReaderDocumentType) {
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
      />
    );
  }

  return (
    <>
      <section className="w-full flex justify-between items-center">
        <IconButton
          icon={icons?.arrowLeft}
          onClick={changePage}
          className="border border-primary text-primary contained rounded-lg p-2 hover:bg-primary hover:text-white"
          content={PREVIOUS_PAGE}
        />
        <IconButton
          icon={icons?.arrowRight}
          onClick={changePage}
          className="border border-primary text-primary contained rounded-lg p-2 hover:bg-primary hover:text-white"
          content={NEXT_PAGE}
        />
      </section>
      <Document
        file={fileDocument}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
        options={options}
      >
        {renderingPage()}
      </Document>
    </>
  );
}
