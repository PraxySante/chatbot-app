import { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import icons from '../../../constants/icons';
import IconButton from '../../../components/Buttons/IconButton';
import { ReaderDocumentType } from '../../../types/panel/panel.type';
import { getDocumentFromApi } from '../../../services/ChatBot/getDocumentFromApi.service';
import { useLanguage } from '../../../hooks/UseLanguage';
import '../Procedure.css';

export default function ReaderDocument({ fileDocument }: ReaderDocumentType) {
  const [selectedPages, setSelectedPages] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  const { userLanguage, selectedLanguage } = useLanguage();

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

  const options = useMemo(
    () => ({
      cMapUrl: '/cmaps/',
      standardFontDataUrl: '/standard_fonts/',
    }),
    []
  );

  useEffect(() => {
    async function launchBlobDocument() {
      const urlDocument = await getDocumentFromApi(
        fileDocument,
        selectedLanguage
      );
      setPdfData(urlDocument.details);
    }
    launchBlobDocument();
  }, [fileDocument]);

  useEffect(() => {
    renderingDocument();
  }, [pdfData]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function changePage() {
    if (selectedPages <= numPages) {
      const test = selectedPages;
      setSelectedPages(test + 1);
    }
  }

  function renderingDocument() {
    return (
      <div className="reader-document">
        <Document
          file={pdfData || undefined}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          options={options}
        >
          <Page
            key={`page_${selectedPages}`}
            pageNumber={selectedPages}
            width={800}
          />
          ;
        </Document>
      </div>
    );
  }

  return (
    <div className="reader-document_main">
      <section className="reader-document_section">
        <IconButton
          icon={icons.arrowLeft}
          onClick={changePage}
          className="reader-document-icons contained"
          content={userLanguage?.btn_chat_previous}
        />
        <IconButton
          icon={icons.arrowRight}
          onClick={changePage}
          className="reader-document-icons contained"
          content={userLanguage?.btn_chat_next}
        />
      </section>
      {renderingDocument()}
    </div>
  );
}
