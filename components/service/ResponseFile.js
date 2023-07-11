// COMPONENTS
import Uploader from "components/Uploader";

const ResponseFile = ({ onResponse, questionIndex }) => {
  const handleFileUploaded = (fileUrl) => {
    onResponse(questionIndex, fileUrl);
  };

  return <Uploader onUploadedFinished={handleFileUploaded} />;
};

export default ResponseFile;
