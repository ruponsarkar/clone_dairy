import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Application from "../register/application";
import { useLocation } from "react-router-dom";
import Nav2 from "../common/navbar";
import Footer from "../common/footer";

const Certificate = ({data}) => {
  const params = useLocation();

  console.log("=======>>>", data);

  const downloadCertificate = () => {
    const input = document.getElementById('certificate');
    const scale = 2; // Increase scale for higher resolution
    html2canvas(input, { scale, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.85); // JPEG quality
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width / scale;
      const imgHeight = canvas.height / scale;

      let pdfImgWidth = pdfWidth - 20; // 10mm padding
      let pdfImgHeight = pdfImgWidth * (imgHeight / imgWidth);

      if (pdfImgHeight > pdfHeight - 20) {
        pdfImgHeight = pdfHeight - 20;
        pdfImgWidth = pdfImgHeight * (imgWidth / imgHeight);
      }

      const posX = (pdfWidth - pdfImgWidth) / 2;
      const posY = (pdfHeight - pdfImgHeight) / 2;

      pdf.addImage(imgData, 'JPEG', posX, posY, pdfImgWidth, pdfImgHeight);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <>
    {/* <Nav2/> */}
    
    <div className="container-fluid">
      <div className="row">
    <div className="certificate-container p-4 d-flex justify-content-center align-items-center">
      <div className="certificate-content p-4" id="certificate">
        <div className="certificate-header">
          <img
            src="assets/govind.png"
            alt="Government Logo"
            className="govt-logo"
          />
          <h1>Government of Assam</h1>
        </div>
        <div className="certificate-body pt-2">
          <h2><u>Certificate of Approval</u></h2>
          <p>This is to certify that <strong> {data.name} </strong>is eligible for the Milk Subsidy Scheme provided by the Government of Assam.</p>
          <p>This certification is issued based on the fulfillment of all necessary criteria and requirements as stipulated under the scheme guidelines.</p>
        </div>
        <Application data={data} />
        
        <div className="certificate-footer p-4 text-left">
          <div >
          <u><b>Terms and conditions</b></u>
          </div>
          <div>
            <p className="p-0 m-0">
            1. As the payment will be made on quarterly basis of milk production by dairy farmers after proper DCS registration.
            </p>
            <p className="p-0 m-0">
            2. Payment is made on basis of proper account no and kYC documents by the beneficiaries.
            </p>
            <p className="p-0 m-0">
            3. ⁠payment is subject to availability of funds
            </p>
          </div>

        </div>
      </div>
    </div>
    </div>
    <div className="p-4 d-flex justify-content-center align-items-center">
    <button onClick={downloadCertificate} className="download-button">
    Download Certificate
  </button>
  </div>
  </div>

  {/* <Footer /> */}

  </>
  );
};

export default Certificate;
