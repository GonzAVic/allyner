// COMPONENTS
import Uploader from "components/Uploader";
import FileCard from "components/FileCard";

const ResponseFile = ({
  onResponse,
  questionIndex,
  nextQuestion,
  question,
}) => {
  const handleFileUploaded = (fileUrl) => {
    onResponse(questionIndex, fileUrl);
    nextQuestion();
  };

  if (question.answer)
    return (
      <FileCard
        fileUrl={question.answer}
        onDelete={() => handleProfilePictureChange("")}
      />
    );
  return <Uploader onUploadedFinished={handleFileUploaded} />;
};

export default ResponseFile;
